import { Container, Text } from "components"
import { useValueByTheme } from "hooks"
import { capitalize } from "lodash"
import Link from "next/link"
import { FC } from "react"
import { DarkColor, LightColor } from "types/theme"

const NotFound: FC = () => {
    const bgColor = useValueByTheme(LightColor.loading_background, DarkColor.loading_background)
    const color = useValueByTheme(LightColor.text, DarkColor.text)

    return (
        <Container
            flex direct="column" gap={16} align="center" justify="center"
            className="w-screen h-screen"
            background={bgColor}
            color={color}
        >
            <Text tag="span" fontSize="48px" fontWeight={600}>
                404
            </Text>
            <Text tag="span" fontSize="28px">
                {capitalize('not found')}
            </Text>
            <Link href={{
                pathname: '/dashboard'
            }}>
                <Text
                    tag="span" fontSize="18px" textDecoration="underline"
                    className="cursor-pointer"
                >
                    {capitalize('back to dashboard')}
                </Text>
            </Link>
        </Container>
    )
}

export default NotFound
