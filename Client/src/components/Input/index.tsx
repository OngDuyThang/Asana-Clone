import { forwardRef } from 'react'
import {
    Input as AntdInput,
    InputProps as AntdInputProps,
    InputRef as AntdInputRef,
    ConfigProvider as AntdConfigProvider,
} from 'antd'
import { TInputProps, TInputPropsExcept } from 'types/input'
import styles from './index.module.less'
import clsx from 'clsx'
import { headerTheme, lightTheme, darkTheme } from './theme'
import { useValueByTheme } from 'hooks'

export const {
    Search: AntdSearch,
    TextArea: AntdTextArea,
    Password: AntdPassword
} = AntdInput

export interface InputProps extends
    Pick<Required<AntdInputProps>, TInputProps>,
    Omit<AntdInputProps, TInputProps | TInputPropsExcept> {
    isHeaderInput?: boolean
}

const Input = forwardRef<AntdInputRef, InputProps>(({
    className,
    placeholder,
    defaultValue,
    onChange,
    bordered = true,
    prefix,
    suffix,
    disabled = false,
    size = 'middle',
    onPressEnter,
    isHeaderInput = false,
    ...props
}, ref) => {
    const theme = useValueByTheme(lightTheme, darkTheme)

    return (
        <AntdConfigProvider theme={isHeaderInput ? headerTheme : theme}>
            <AntdInput
                className={clsx(styles.root, className)}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                bordered={bordered}
                prefix={prefix}
                suffix={suffix}
                disabled={disabled}
                size={size}
                onPressEnter={onPressEnter}
                {...props}
                ref={ref}
            />
        </AntdConfigProvider>
    )
})

Input.displayName = 'Input'
export default Input
