import type { FC } from "react"
import styles from './index.module.less'
import clsx from "clsx"
import {
    Select as AntdSelect,
    SelectProps as AntdSelectProps,
    ConfigProvider as AntdConfigProvider
} from "antd"
import { OptionProps as AntdOptionProps } from "antd/es/select"
import { TSelectProps, TOptionProps } from "types/select"
import { lightTheme, darkTheme } from './theme'
import { useValueByTheme } from "hooks"

const { Option: AntdOption } = AntdSelect

interface OptionProps extends
    Pick<Required<AntdOptionProps>, TOptionProps>,
    Omit<AntdOptionProps, TOptionProps> { }

export const Option: FC<OptionProps> = ({
    children,
    value
}) => {
    return (
        <AntdOption value={value}>
            {children}
        </AntdOption>
    )
}

interface SelectProps extends
    Pick<Required<AntdSelectProps>, TSelectProps>,
    Omit<AntdSelectProps, TSelectProps> { }

export const Select: FC<SelectProps> = ({
    className,
    children,
    onChange,
    defaultValue,
    suffixIcon,
    ...props
}) => {
    const theme = useValueByTheme(lightTheme, darkTheme)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdSelect
                className={clsx(styles.root, className)}
                onChange={onChange}
                defaultValue={defaultValue}
                suffixIcon={suffixIcon}
                // bordered={false}
                popupMatchSelectWidth={false}
                {...props}
            >
                {children}
            </AntdSelect>
        </AntdConfigProvider>
    )
}