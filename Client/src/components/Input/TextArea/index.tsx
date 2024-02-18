import { type FC } from "react"
import { ConfigProvider as AntdConfigProvider } from "antd"
import { TextAreaProps as AntdTextAreaProps } from "antd/es/input"
import { AntdTextArea } from ".."
import { useValueByTheme } from "hooks"
import { darkTheme, lightTheme } from "../theme"
import clsx from "clsx"
import styles from '../index.module.less'
import { TTextAreaProps } from "types/input"

interface TextAreaProps extends
    Pick<Required<AntdTextAreaProps>, TTextAreaProps>,
    Omit<AntdTextAreaProps, TTextAreaProps> {}

const TextArea: FC<TextAreaProps> = ({
    className,
    ...props
}) => {
    const theme = useValueByTheme(lightTheme, darkTheme)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdTextArea
                className={clsx(styles.root, className)}
                {...props}
            />
        </AntdConfigProvider>
    )
}

export default TextArea