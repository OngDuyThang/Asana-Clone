import { Button, Container, Input } from 'components'
import { capitalize, kebabCase } from 'lodash'
import { useState, type FC, useRef, useContext } from 'react'
import { AiOutlineUpload } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from 'hooks';
import { InputRef, Upload, UploadFile } from 'antd';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { ToastContext, ToastInstance } from 'layout';
import { BoardContext, RefetchBoard } from 'modules/Board';
import { MdAddBox } from "react-icons/md";
import { createCard } from 'api/card';

interface IProps {
    columnId: string
}

const AddCard: FC<IProps> = ({
    columnId
}) => {
    const router = useRouter()
    const toast = useContext(ToastContext) as ToastInstance
    const refetchBoard = useContext(BoardContext) as RefetchBoard
    const { isSession } = useAppSelector(state => state.user)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const inputRef = useRef<InputRef>(null)
    const [cover, setCover] = useState<File>()
    const { mutate } = useMutation(createCard, {
        onSuccess: (data) => {
            if (data.statusCode !== 201) {
                toast.error({ message: data.message })
                return
            }
            toast.success({ message: capitalize('create card succesfully') })
            setIsOpen(false)
            setCover(undefined)
            refetchBoard()
        }
    })

    const handleAdd = (title: string | undefined) => {
        if (!title) {
            toast.warning({ message: capitalize('please enter card title') })
            return
        }
        if (!isSession) {
            toast.warning({ message: capitalize('you must login first') })
            return
        }
        mutate({
            title,
            description: kebabCase(title),
            ...(cover ? { cover } : null),
            boardId: router.query?.slug as string,
            columnId,
            members: [],
            comments: [],
            attachments: [],
        })
    }

    const Ready = (
        <Container flex gap={16} direct='column' className='py-2'>
            <Input
                onChange={() => {}}
                placeholder={capitalize('card title')}
                ref={inputRef}
            />
            <Upload
                name='cover'
                listType="picture"
                maxCount={1}
                multiple={false}
                onChange={(info) => setCover(info.file.originFileObj)}
            >
                <Button
                    fontSize='12px'
                    fontWeight={600}
                    onClick={() => {}}
                    icon={<AiOutlineUpload />}
                >
                    {capitalize('image')}
                </Button>
            </Upload>
            <Container flex justify='between' align='center'>
                <Button
                    fontSize='12px'
                    fontWeight={600}
                    icon={<MdAddBox className='w-4 h-4' />}
                    onClick={() => handleAdd(inputRef.current?.input?.value)}
                >
                    {capitalize('add')}
                </Button>
                <IoClose
                    className='min-w-5 min-h-5 cursor-pointer'
                    onClick={() => setIsOpen(false)}
                />
            </Container>
        </Container>
    )

    const Add = (
        <Button
            icon={<MdAddBox className='w-4 h-4' />}
            fontWeight='600'
            onClick={() => setIsOpen(true)}
        >
            {capitalize('add new card')}
        </Button>
    )

    return (
        <>
            {isOpen ? Ready : Add}
        </>
    )
}

export default AddCard
