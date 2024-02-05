import { Button } from 'components'
import { useAppSelector } from 'hooks'
import { capitalize } from 'lodash'
import SigninForm from 'modules/Auth/SigninForm'
import { useState, type FC, useEffect } from 'react'

const Signin: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { isSession } = useAppSelector(state => state.user)

    useEffect(() => {
        if (isSession) setIsOpen(false)
    }, [isSession])

    return (
        <>
            <SigninForm
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
