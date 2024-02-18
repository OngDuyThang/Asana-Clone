import { ReactNode, type FC } from 'react'
import {
    Form as AntdForm,
    FormProps as AntdFormProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { useValueByTheme } from 'hooks'
import { darkTheme, lightTheme } from './theme'

export const { Item, List, ErrorList, Provider, useForm, useFormInstance, useWatch } = AntdForm

interface FormProps extends AntdFormProps {
    children: ReactNode
}

const Form: FC<FormProps> = ({
    children,
    ...props
}) => {
    const theme = useValueByTheme(lightTheme, darkTheme)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdForm
                {...props}
            >
                {children}
            </AntdForm>
        </AntdConfigProvider>
    )
}

export default Form
