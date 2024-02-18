import { Modal, Text } from 'components'
import { useState, type FC } from 'react'
import styles from './index.module.less'
import { capitalize } from 'lodash'
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

interface AuthProps {
    open: boolean;
    handleCancel: () => void
}

const Auth: FC<AuthProps> = ({
    open,
    handleCancel
}) => {
    const [isSignin, setIsSignin] = useState<boolean>(true)

    const AuthForm = isSignin ?
        <SigninForm setIsSignin={() => setIsSignin(false)} /> :
        <SignupForm setIsSignin={() => setIsSignin(true)} />

    return (
        <Modal
            className={styles.root}
            title={
                <Text tag='span' fontSize='18px'>{capitalize(
                    isSignin ? 'sign in' : 'register'
                )}</Text>
            }
            open={open}
            onCancel={handleCancel}
            width={400}
        >
            {AuthForm}
        </Modal>
    )
}

export default Auth
