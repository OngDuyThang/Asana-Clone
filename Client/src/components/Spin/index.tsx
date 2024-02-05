import { type FC } from 'react'
import {
    Spin as AntdSpin,
    SpinProps as AntdSpinProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { lightTheme, darkTheme } from './theme'
import { useValueByTheme } from 'hooks'

const Spin: FC<AntdSpinProps> = (props) => {
    const theme = useValueByTheme(lightTheme, darkTheme)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdSpin {...props} />
        </AntdConfigProvider>
    )
}

export default Spin
