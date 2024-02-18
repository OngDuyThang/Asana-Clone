import { type FC } from "react"
import { ConfigProvider as AntdConfigProvider } from "antd"
import { AntdPassword, InputProps } from ".."
import { useValueByTheme } from "hooks"
import { darkTheme, lightTheme } from "../theme"
import clsx from "clsx"
import styles from '../index.module.less'

interface PasswordProps extends InputProps {
    visibilityToggle?: boolean
}

const Password: FC<PasswordProps> = ({
    visibilityToggle = true,
    className,
    ...props
}) => {
    const theme = useValueByTheme(lightTheme, darkTheme)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdPassword
                visibilityToggle={visibilityToggle}
                className={clsx(styles.root, className)}
                {...props}
            />
        </AntdConfigProvider>
    )
}

export default Password