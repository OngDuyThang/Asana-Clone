import { type FC } from 'react'
import {
    Drawer as AntdDrawer,
    DrawerProps as AntdDrawerProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { TDrawerProps } from 'types/drawer'
import { IoClose } from 'react-icons/io5'
import { useValueByTheme } from 'hooks'
import { darkTheme, lightTheme } from './theme'
import { DarkColor, LightColor } from 'types/theme'

interface DrawerProps extends
    Pick<Required<AntdDrawerProps>, TDrawerProps>,
    Omit<AntdDrawerProps, TDrawerProps> {}

const Drawer: FC<DrawerProps> = ({
    children,
    open,
    onClose,
    ...props
}) => {
    const theme = useValueByTheme(lightTheme, darkTheme)
    const textColor = useValueByTheme(LightColor.text, DarkColor.text)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdDrawer
                open={open}
                onClose={onClose}
                placement={'left'}
                closeIcon={<IoClose style={{ color: textColor }} className='w-6 h-6' />}
                style={{ color: textColor }}
                {...props}
            >
                {children}
            </AntdDrawer>
        </AntdConfigProvider>
    )
}

export default Drawer
