import { Button } from 'components'
import { useAppSelector } from 'hooks'
import { capitalize } from 'lodash'
import Auth from 'modules/Auth'
import { useState, type FC, useEffect } from 'react'

const Signin: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { isSession } = useAppSelector(state => state.user)

    useEffect(() => {
        if (isSession) setIsOpen(false)
    }, [isSession])

    return (
        <>
            <Auth
                open={isOpen}
                handleCancel={() => { setIsOpen(false) }}
            />
            <Button
                isHeaderButton
                fontSize="12px"
                fontWeight={600}
                onClick={() => setIsOpen(true)}
            >
                {capitalize('sign in')}
            </Button>
        </>
    )
}

export default Signin
