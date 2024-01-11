import { forwardRef, type FC } from 'react'
import {
    Card as AntdCard,
    CardProps as AntdCardProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { TCardProps } from 'types/card'
import { lightTheme, darkTheme } from './theme'
import { useAppSelector, useValueByTheme } from 'hooks'
import clsx from 'clsx'
import styles from './index.module.less'

export const { Meta } = AntdCard

interface CardProps extends
    Pick<Required<AntdCardProps>, TCardProps>,
    Omit<AntdCardProps, TCardProps> { }

export const Card = forwardRef<HTMLDivElement, CardProps>(({
    className,
    cover,
    actions,
    children,
    hoverable = true,
    bordered = false,
    extra,
    ...props
}, ref) => {
    const theme = useValueByTheme(lightTheme, darkTheme)
    const { theme: reduxTheme } = useAppSelector(state => state.system)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdCard
                className={clsx(styles.root, styles[`card-${reduxTheme}`], className)}
                cover={cover}
                actions={actions}
                hoverable={hoverable}
                bordered={bordered}
                extra={extra}
                {...props}
                ref={ref}
            >
                {children}
            </AntdCard>
        </AntdConfigProvider>
    )
})

Card.displayName = 'Card'