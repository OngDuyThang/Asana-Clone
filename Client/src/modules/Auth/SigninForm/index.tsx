import { type FC, useContext } from 'react'
import { Checkbox, Form } from 'antd'
import { Button, Input, Modal, Text } from 'components'
import styles from './index.module.less'
import { FaUser, FaLock } from "react-icons/fa";
import { Password } from 'components/Input';
import { TCredentialSignin } from 'types/auth';
import { useMutation } from 'react-query';
import { signin } from 'api/auth';
import { useAppDispatch } from 'hooks';
import { signinAction } from 'store/user/slice';
import { capitalize } from 'lodash';
import { ToastContext, ToastInstance } from "layout";

const { Item } = Form

interface IProps {
    open: boolean;
    handleCancel: () => void
}

const SigninForm: FC<IProps> = ({
    open,
    handleCancel
}) => {
    const dispatch = useAppDispatch()
    const toast = useContext(ToastContext) as ToastInstance
    const [form] = Form.useForm();
    const { mutate: handleSignin } = useMutation(signin, {
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

    return (
        <Modal
            className={styles.root}
            title={<Text tag='span' fontSize='18px'>{capitalize('sign in')}</Text>}
            open={open}
            onCancel={handleCancel}
            width={400}
        >
            <Form
                form={form}
                onFinish={handleFinish}
                autoComplete="off"
            >
                <Item
                    name="username"
                    rules={[{ required: true, message: capitalize('please input your username!') }]}
                    validateTrigger='onBlur'
                >
                    <Input
                        name="username"
                        prefix={<FaUser />}
                        placeholder='Username'
                        onChange={() => {}}
                    />
                </Item>

                <Item
                    name="password"
                    rules={[{ required: true, message: capitalize('please input your password!') }]}
                    validateTrigger='onBlur'
                >
                    <Password
                        name="password"
                        prefix={<FaLock />}
                        placeholder='Password'
                        onChange={() => {}}
                    />
                </Item>

                <Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>{capitalize('remember me')}</Checkbox>
                </Item>

                <Item>
                    <Button
                        className={styles.submit}
                        fontWeight={600}
                        htmlType="submit"
                        onClick={() => {}}
                    >
                        {capitalize('submit')}
                    </Button>
                </Item>
            </Form>
        </Modal>
    )
}

export default SigninForm
