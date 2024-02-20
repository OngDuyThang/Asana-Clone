import { Container, Spin } from 'components'
import { useValueByTheme } from 'hooks'
import { useRouter } from 'next/router'
import { useState, type FC, useEffect } from 'react'
import { DarkColor, LightColor } from "types/theme"

interface IProps {
    isRouteLoading?: boolean
}

const LoadingScreen: FC<IProps> = ({
    isRouteLoading = false
}) => {
    const bgColor = useValueByTheme(LightColor.loading_background, DarkColor.loading_background)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router])

    const LoadingUI = (
        <Container
            className='w-screen h-screen absolute z-[999] top-0 left-0'
            background={bgColor}
            flex
            justify='center'
            align='center'
        >
            <Spin size='large' />
        </Container>
    )

    if (isRouteLoading) {
        return isLoading ? LoadingUI : null
    }

    return LoadingUI
}

export default LoadingScreen
