import { NotFound } from "components"
import { useRouter } from "next/router"
import { useEffect } from "react"

const NotFound_Page = () => {
    const router = useRouter()

    useEffect(() => {
        router.replace({
            pathname: '/404'
        })
    }, [])

    return <NotFound />
}

export default NotFound_Page
