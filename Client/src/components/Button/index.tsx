import { type FC } from 'react'
import {
    Button as AntdButton,
    ButtonProps as AntdButtonProps,
    ConfigProvider as AntdConfigProvider,
} from 'antd'
import { TButtonProps, TButtonPropsExcept } from 'types/button'
import clsx from 'clsx';
import { useValueByTheme } from 'hooks';
import { headerTheme, lightTheme, darkTheme, boardbarLight, boardbarDark } from './theme'

interface ButtonProps extends
    Pick<Required<AntdButtonProps>, TButtonProps>,
    Omit<AntdButtonProps, TButtonProps | TButtonPropsExcept> {
    fontSize?: string;
    fontWeight?: number | string;
    fit?: boolean;
    transparent?: boolean;
    isLoading?: boolean;
    isHeaderButton?: boolean;
    isBoardbarButton?: boolean;
}

const Button: FC<ButtonProps> = ({
    className,
    children,
    fontSize = '14px',
    fontWeight = '400',
    type = 'default',
    icon,
    shape,
    size = 'middle',
    onClick,
    htmlType,
    isHeaderButton = false,
    isBoardbarButton = false,
    style,
    ...props
}) => {
    const lightVal = isBoardbarButton ? boardbarLight : lightTheme
    const darkVal = isBoardbarButton ? boardbarDark : darkTheme
    const theme = useValueByTheme(lightVal, darkVal)

    return (
        <AntdConfigProvider theme={isHeaderButton ? headerTheme : theme}>
            <AntdButton
                className={clsx('flex items-center', className)}
                style={{
                    fontSize,
                    fontWeight,
                    ...style
                }}
                type={type}
                icon={icon}
                shape={shape}
                size={size}
                onClick={onClick}
                htmlType={htmlType}
                {...props}
            >
                {children}
            </AntdButton>
        </AntdConfigProvider>
    )
}

export default Button
