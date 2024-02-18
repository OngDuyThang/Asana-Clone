import {
    ConfigProvider as AntdConfigProvider,
    Layout as AntdLayout,
    ThemeConfig,
    notification
} from 'antd'
import { NotificationInstance } from 'antd/es/notification/interface';
import { useState, type FC, type ReactNode, useEffect, createContext, lazy, Suspense } from "react"
import { useAppDispatch, useAppSelector } from 'hooks';
import { setSystemTheme } from 'store/system/slice';
import { lightTheme, darkTheme } from 'utils/theme';
import { ThemeEnum } from 'types/theme';
import styles from './index.module.less'
import { setAccessToken } from 'store/user/slice';
import { getAccessToken } from 'utils/helpers';
import { LoadingScreen } from 'components';
import { useRouter } from 'next/router';
const Header = lazy(() => import('./Header'))
const Content = lazy(() => import('./Content'))

export interface ToastInstance extends NotificationInstance {}
export const ToastContext = createContext<ToastInstance | null>(null)

export const {
    Header: AntdHeader,
    Content: AntdContent
} = AntdLayout

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({
    children
}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { theme: reduxTheme } = useAppSelector(state => state.system)
    const [theme, setTheme] = useState<ThemeConfig>()
    const [api, contextHolder] = notification.useNotification();

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

    const storageEvent = () => {
        const accessToken = getAccessToken()
        dispatch(setAccessToken(accessToken))
    }

    useEffect(() => {
        window.addEventListener('storage', storageEvent)
        return () => {
            window.removeEventListener('storage', storageEvent)
        }
    }, [])

    if (router.pathname === '/404') return <>{children}</>

    return (
        <AntdConfigProvider theme={theme}>
            {contextHolder}
            <LoadingScreen isRouteLoading />
            <AntdLayout className={styles.root}>
                <ToastContext.Provider value={api}>
                    <Suspense fallback={<LoadingScreen />}>
                        <Header />
                        <Content>
                            {children}
                        </Content>
                    </Suspense>
                </ToastContext.Provider>
            </AntdLayout>
        </AntdConfigProvider>
    )
}

export default Layout
