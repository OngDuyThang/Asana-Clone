import { Button, Input, Modal, Text, Form, Radio, TextArea } from 'components';
import { ToastContext, ToastInstance } from 'layout';
import { useContext, type FC, useState } from 'react'
import styles from './index.module.less'
import { capitalize } from 'lodash';
import { TBoardAccess } from 'types/board';
import { useMutation } from 'react-query';
import { createBoard, useGetAllBoards } from 'api/board';
import { Item, useForm } from 'components/Form';
import { Group } from 'components/Radio';
import { useAppSelector } from 'hooks';
import { useRouter } from 'next/router';

interface IProps {
    open: boolean;
    handleCancel: () => void
}

const CreateBoardForm: FC<IProps> = ({
    open,
    handleCancel
}) => {
    const router = useRouter()
    const toast = useContext(ToastContext) as ToastInstance
    const [form] = useForm();
    const [type, setType] = useState<TBoardAccess>('public')
    const { isSession } = useAppSelector(state => state.user)
    const { refetch: refetchBoards } = useGetAllBoards(router.pathname, { enabled: false })
    const { mutate } = useMutation(createBoard, {
        onSuccess: (data) => {
            if (!data?.data) {
                toast.error({ message: data.message })
                return
            }
            toast.success({ message: capitalize('create board successfully.') })
            form.resetFields()
            refetchBoards()
        },
        retry: false
    })

    const handleFinish = (value: any) => {
        if (!isSession) {
            toast.warning({ message: capitalize('you must login first') })
            return
        }
        const { title, description, type } = value
        mutate({
            title,
            description: description || '',
            type: type || 'public',
            owners: [],
            members: []
        })
    }

    const Title = (
        <Item
            label={capitalize('title')}
            name="title"
            rules={[{ required: true, message: capitalize('please input board title!') }]}
            validateTrigger='onBlur'
        >
            <Input
                name="title"
                placeholder={capitalize('title')}
            />
        </Item>
    )

    const Description = (
        <Item
            label={capitalize('description')}
            name="description"
        >
            <TextArea
                name="description"
                placeholder={capitalize('description')}
                autoSize={{ minRows: 6, maxRows: 6 }}
            />
        </Item>
    )

    const Type = (
        <Item
            label={capitalize('type')}
            name="type"
        >
            <Group onChange={(e) => setType(e.target.value)} value={type} defaultValue={type}>
                <Radio value={'public'}>{capitalize('public')}</Radio>
                <Radio value={'private'}>{capitalize('private')}</Radio>
            </Group>
        </Item>
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
        <Modal
            className={styles.root}
            title={<Text tag='span' fontSize='18px'>{capitalize('create board')}</Text>}
            open={open}
            onCancel={handleCancel}
            width={500}
        >
            <Form
                form={form}
                onFinish={handleFinish}
                autoComplete="off"
            >
                {Title}
                {Description}
                {Type}
                {Submit}
            </Form>
        </Modal>
    )
}

export default CreateBoardForm
