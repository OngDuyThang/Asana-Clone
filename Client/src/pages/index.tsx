import { LoadingScreen } from "components"
import { useRouter } from "next/router"
import { useEffect, type FC } from "react"

const Home: FC = () => {
    const router = useRouter()

    useEffect(() => {
        router.replace('/dashboard')
    }, [])

    return (
        <LoadingScreen />
    )
}

export default Home
