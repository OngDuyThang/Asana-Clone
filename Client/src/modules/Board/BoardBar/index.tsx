import { type FC } from "react"
import styles from './index.module.less'
import { Container, Button } from "components"
import { IoFilter } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDashboard, MdPublic, MdPublicOff } from "react-icons/md";
import { Avatar } from "antd";
import { capitalize } from "lodash";
import { useValueByTheme } from "hooks";
import { DarkColor, LightColor } from "types/theme";
import { TBoardAccess } from "types/board";

interface BoardBarProps {
    title: string;
    description: string;
    type: TBoardAccess;
}

const BoardBar: FC<BoardBarProps> = ({
    title,
    description,
    type,
}) => {
    const bgColor = useValueByTheme(LightColor.boardbar, DarkColor.boardbar)
    const iconCss: string = 'w-4 h-4'
    const accessIcon = type === 'public'
        ? <MdPublic className={iconCss} />
        : <MdPublicOff className={iconCss} />

    const Left = (
        <Container width="50" height="100" flex align="center" gap='16'>
            <Button
                type="text"
                icon={<MdDashboard className={iconCss} />}
                fontWeight='600'
                isBoardbarButton
            >
                {capitalize(title)}
            </Button>
            <Button
                type="text"
                icon={accessIcon}
                fontWeight='600'
                isBoardbarButton
            >
                {capitalize(type)}
            </Button>
            <Button
                type="text"
                icon={<IoFilter className={iconCss} />}
                fontWeight='600'
                isBoardbarButton
            >
                {capitalize('filter')}
            </Button>
        </Container>
    )

    const Right = (
        <Container width="50" height="100" flex direct="row-reverse" align="center" gap='16'>
            <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                <Avatar src="/images/user.png" />
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                <Avatar style={{ backgroundColor: '#1677ff' }} icon={<>A</>} />
                <Avatar style={{ backgroundColor: '#1677ff' }} icon={<>A</>} />
                <Avatar style={{ backgroundColor: '#1677ff' }} icon={<>A</>} />
                <Avatar style={{ backgroundColor: '#1677ff' }} icon={<>A</>} />
            </Avatar.Group>
            <Button
                icon={<IoMdPersonAdd className={iconCss} />}
                fontWeight='600'
                isBoardbarButton
            >
                {capitalize('invite')}
            </Button>
        </Container>
    )

    return (
        <Container flex gap='16' className={styles.root} background={bgColor}>
            {Left}
            {Right}
        </Container>
    )
}

export default BoardBar
