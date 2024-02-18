import { type FC } from 'react'
import {
    Radio as AntdRadio,
    RadioProps as AntdRadioProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { useValueByTheme } from 'hooks'
import { darkTheme, lightTheme } from './theme'

export const { Group, Button } = AntdRadio

const Radio: FC<AntdRadioProps> = ({
    children,
    ...props
}) => {
    const theme = useValueByTheme(lightTheme, darkTheme)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdRadio {...props}>
                {children}
            </AntdRadio>
        </AntdConfigProvider>
    )
}

export default Radio
