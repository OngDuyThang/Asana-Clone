import { type FC } from 'react'
import {
    Modal as AntdModal,
    ModalProps as AntdModalProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { TModalProps } from 'types/modal';
import { lightTheme, darkTheme } from './theme'
import { useValueByTheme } from 'hooks';
import { IoClose } from 'react-icons/io5';
import { DarkColor, LightColor } from 'types/theme';

interface ModalProps extends
    Pick<Required<AntdModalProps>, TModalProps>,
    Omit<AntdModalProps, TModalProps> {
    showFooter?: boolean
}

const Modal: FC<ModalProps> = ({
    children,
    className,
    title,
    open,
    showFooter = false,
    maskClosable = true,
    width,
    onOk,
    onCancel,
    cancelButtonProps,
    okButtonProps,
    centered = false,
    ...props
}) => {
    const theme = useValueByTheme(lightTheme, darkTheme)
    const iconColor = useValueByTheme(LightColor.text, DarkColor.text)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdModal
                className={className}
                title={title}
                open={open}
                {...(!showFooter ? { footer: null } : null)}
                maskClosable={maskClosable}
                width={width}
                onOk={onOk}
                onCancel={onCancel}
                cancelButtonProps={cancelButtonProps}
                okButtonProps={okButtonProps}
                centered={centered}
                closeIcon={<IoClose style={{ color: iconColor }} className='w-6 h-6' />}
                {...props}
            >
                {children}
            </AntdModal>
        </AntdConfigProvider>
    )
}

export default Modal
