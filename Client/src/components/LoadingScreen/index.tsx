import { Container, Spin } from 'components'
import { useValueByTheme } from 'hooks'
import { type FC } from 'react'
import { DarkColor, LightColor } from "types/theme"

const LoadingScreen: FC = () => {
    const bgColor = useValueByTheme(LightColor.loading_background, DarkColor.loading_background)

    return (
        <Container
            className='w-screen h-screen'
            background={bgColor}
            flex
            justify='center'
            align='center'
        >
            <Spin size='large' />
        </Container>
    )
}

export default LoadingScreen
