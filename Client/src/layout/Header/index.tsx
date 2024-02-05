import { type FC } from "react"
import styles from './index.module.less'
import { ThemeSelect, Workspace, Recent, Starred, Templates, User } from "layout/Components"
import { Image, Div, Button, Search, Container } from "components"
import clsx from "clsx"
import { AntdHeader } from "layout"
import { capitalize } from "lodash"
import { useAppSelector, useValueByTheme } from "hooks"
import { DarkColor, LightColor } from "types/theme"
import { MdAddToPhotos } from "react-icons/md";
import Signin from "layout/Components/Signin"

interface HeaderProps {
    className?: string
}

const Header: FC<HeaderProps> = ({
    className
}) => {
    const bgColor = useValueByTheme(LightColor.background, DarkColor.background)
    const logoSrc = useValueByTheme('/light-logo.png', '/dark-logo.png')
    const { isSession } = useAppSelector(state => state.user)

    const Left = (
        <Container width="50" height="100" flex align="center" gap='16'
            className={styles.left}>
            <Div className={styles.logo}>
                <Image
                    src={logoSrc}
                    alt='logo'
                />
            </Div>
            <Container height="100" flex align="center" gap='16'
                className={styles.menus}>
                <Workspace />
                <Recent />
                <Starred />
                <Templates />
                <Button fontSize='12px' fontWeight='600'
                    onClick={() => {}}
                    icon={<MdAddToPhotos />}
                    className={styles.create}
                    isHeaderButton
                >
                    {capitalize('create')}
                </Button>
            </Container>
        </Container>
    )

    const Right = (
        <Container width="50" height="100" flex direct="row-reverse" gap='16' align="center"
            className={styles.right}>
            {isSession ? <User /> : <Signin />}
            <ThemeSelect className={styles.themeSelect} />
            <Search
                placeholder="Search"
                onChange={() => {}}
                onSearch={() => {}}
                className={styles.search}
                isHeaderInput
            />
        </Container>
    )

    return (
        <AntdHeader className={styles.header} style={{ background: bgColor }}>
            <Container className={clsx(styles.root, className)} flex gap='16'>
                {Left}
                {Right}
            </Container>
        </AntdHeader>
    )
}

export default Header