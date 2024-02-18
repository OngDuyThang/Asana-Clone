import { type FC, useContext, useState } from 'react'
import { Button, Input, Text, Form, Password, Container } from 'components'
import styles from '../index.module.less'
import { FaUser, FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { TCredentialSignup } from 'types/auth';
import { useMutation } from 'react-query';
import { signup } from 'api/auth';
import { capitalize } from 'lodash';
import { ToastContext, ToastInstance } from "layout";
import { Item, useForm } from 'components/Form';
import ImageUpload from 'components/ImageUpload';

interface IProps {
    setIsSignin: () => void
}

const SignupForm: FC<IProps> = ({
    setIsSignin
}) => {
    const toast = useContext(ToastContext) as ToastInstance
    const [form] = useForm();
    const [avatar, setAvatar] = useState<File>()
    const { mutate: handleSignup } = useMutation(signup, {
        onSuccess: (data) => {
            if (data.statusCode !== 201) {
                toast.error({ message: data.message })
                return
            }
            toast.success({ message: capitalize('register successfully.') })
            form.resetFields()
        },
        retry: false
    })

    const handleFinish = (value: any) => {
        const { username, password, email } = value
        const credential: TCredentialSignup = {
            username,
            password,
            email,
            ...(avatar ? { avatar } : null)
        }
        handleSignup(credential)
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
            />
        </Item>
    )

    const Email = (
        <Item
            name="email"
            rules={[{ required: true, message: capitalize('please input your username!') }]}
            validateTrigger='onBlur'
        >
            <Input
                name="email"
                prefix={<MdMail />}
                placeholder={capitalize('email')}
            />
        </Item>
    )

    const Avatar = <ImageUpload setImg={(img: File) => setAvatar(img)} />

    const Signin = (
        <Container flex justify='center' className='mt-6'>
            <Text
                tag="span" fontSize="14px" textDecoration="underline"
                className="cursor-pointer"
                onClick={setIsSignin}
            >
                {capitalize('back to sign in')}
            </Text>
        </Container>
    )

    const Submit = (
        <Item>
            <Button
                className={styles.submit}
                fontWeight={600}
                htmlType="submit"
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
            {Email}
            {Avatar}
            {Signin}
            {Submit}
        </Form>
    )
}

export default SignupForm
