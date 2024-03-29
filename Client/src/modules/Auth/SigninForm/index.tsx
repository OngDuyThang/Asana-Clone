import { type FC, useContext } from 'react'
import { Checkbox } from 'antd'
import { Button, Input, Text, Form, Password, Container, Spin } from 'components'
import styles from '../index.module.less'
import { FaUser, FaLock } from "react-icons/fa";
import { TCredentialSignin } from 'types/auth';
import { useMutation } from 'react-query';
import { signin } from 'api/auth';
import { useAppDispatch } from 'hooks';
import { signinAction } from 'store/user/slice';
import { capitalize } from 'lodash';
import { ToastContext, ToastInstance } from "layout";
import { Item, useForm } from 'components/Form';
import { useRouter } from 'next/router';

interface IProps {
    setIsSignin: () => void
}

const SigninForm: FC<IProps> = ({
    setIsSignin
}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const toast = useContext(ToastContext) as ToastInstance
    const [form] = useForm();
    const { mutate: handleSignin, isLoading } = useMutation(signin, {
        onSuccess: (data) => {
            if (!data?.data) {
                toast.error({ message: data.message })
                return
            }
            dispatch(signinAction({
                ...data.data
            }))
            toast.success({ message: capitalize('login successfully.') })
            form.resetFields()
            router.replace('/')
        },
        retry: false
    })

    const handleFinish = (value: any) => {
        const { username, password } = value
        const credential: TCredentialSignin = {
            username,
            password
        }
        handleSignin(credential)
    }

    const Username = (
        <Item
            name="username"
            rules={[{ required: true, message: capitalize('please input your username!') }]}
            validateTrigger='onBlur'
        >
            <Input
                name="username"
                prefix={<FaUser />}
                placeholder={capitalize('username')}
                disabled={isLoading}
            />
        </Item>
    )

    const Pass = (
        <Item
            name="password"
            rules={[{ required: true, message: capitalize('please input your password!') }]}
            validateTrigger='onBlur'
        >
            <Password
                name="password"
                prefix={<FaLock />}
                placeholder={capitalize('password')}
                disabled={isLoading}
            />
        </Item>
    )

    const Remember = (
        <Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{capitalize('remember me')}</Checkbox>
        </Item>
    )

    const Signup = (
        <Container flex justify='center' className='mt-6'>
            <Text
                tag="span" fontSize="14px" textDecoration="underline"
                className="cursor-pointer"
                onClick={setIsSignin}
                style={{ ...(isLoading ? { display: 'none' } : null) }}
            >
                {capitalize('or create an account')}
            </Text>
        </Container>
    )

    const Submit = (
        <Item>
            <Button
                className={styles.submit}
                fontWeight={600}
                htmlType="submit"
                disabled={isLoading}
            >
                {capitalize('submit')}
            </Button>
        </Item>
    )

    return (
        <Form
            form={form}
            onFinish={handleFinish}
            autoComplete="off"
        >
            {Username}
            {Pass}
            {Remember}
            {Signup}
            {Submit}
            {isLoading ? <Spin className='w-full flex justify-center' /> : null}
        </Form>
    )
}

export default SigninForm
