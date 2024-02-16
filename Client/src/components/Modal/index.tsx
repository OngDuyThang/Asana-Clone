import { type FC } from 'react'
import {
    Modal as AntdModal,
    ModalProps as AntdModalProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { TModalProps } from 'types/modal';
import { lightTheme, darkTheme } from './theme'
import { useValueByTheme } from 'hooks';

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
                {...props}
            >
                {children}
            </AntdModal>
        </AntdConfigProvider>
    )
}

export default Modal
