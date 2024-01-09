import {
    ConfigProvider as AntdConfigProvider,
    Layout as AntdLayout,
    ThemeConfig
} from 'antd'
import { useState, type FC, type ReactNode, useEffect } from "react"
import Header from "./Header"
import { useAppDispatch, useAppSelector } from 'hooks';
import { setSystemTheme } from 'store/system/slice';
import { lightTheme, darkTheme } from 'utils/theme';
import { ThemeEnum } from 'types/theme';
import styles from './index.module.less'
import Content from './Content';

export const {
    Header: AntdHeader,
    Content: AntdContent
} = AntdLayout

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({
    children
}) => {
    const dispatch = useAppDispatch()
    const { theme: reduxTheme } = useAppSelector(state => state.system)
    const [theme, setTheme] = useState<ThemeConfig>()

    useEffect(() => {
        switch (reduxTheme) {
            case ThemeEnum.light:
                setTheme(lightTheme)
                break;
            case ThemeEnum.dark:
                setTheme(darkTheme)
                break;
        }
    }, [reduxTheme])

    const systemThemeEvent = (event: MediaQueryListEvent) => {
        if (event.matches) {
            dispatch(setSystemTheme(ThemeEnum.dark))
            setTheme(darkTheme)
            return
        }
        dispatch(setSystemTheme(ThemeEnum.light))
        setTheme(lightTheme)
    }

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', systemThemeEvent)
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)')
                .removeEventListener('change', systemThemeEvent)
        }
    }, [])

    return (
        <AntdConfigProvider theme={theme}>
            <AntdLayout className={styles.root}>
                <Header />
                <Content>
                    {children}
                </Content>
            </AntdLayout>
        </AntdConfigProvider>
    )
}

export default Layout
