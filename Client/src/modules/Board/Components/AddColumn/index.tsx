import { Button, Container, Input } from 'components'
import { capitalize } from 'lodash'
import { useState, type FC, useRef, useContext } from 'react'
import { RiMenuAddLine } from 'react-icons/ri'
import { IoClose } from "react-icons/io5";
import { useAppSelector, useValueByTheme } from 'hooks';
import { DarkColor, LightColor } from 'types/theme';
import { InputRef } from 'antd';
import { useMutation } from 'react-query';
import { createColumn } from 'api/column';
import { useRouter } from 'next/router';
import { ToastContext, ToastInstance } from 'layout';
import { BoardContext, RefetchBoard } from 'modules/Board';

const AddColumn: FC = () => {
    const router = useRouter()
    const toast = useContext(ToastContext) as ToastInstance
    const refetchBoard = useContext(BoardContext) as RefetchBoard
    const { isSession } = useAppSelector(state => state.user)
    const bgColor = useValueByTheme(LightColor.board_column, DarkColor.board_column)
    const color = useValueByTheme(LightColor.text, DarkColor.text)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const inputRef = useRef<InputRef>(null)
    const { mutate } = useMutation(createColumn, {
        onSuccess: (data) => {
            if (!data?.data) {
                toast.error({ message: data.message })
                return
            }
            toast.success({ message: capitalize('create column successfully') })
            setIsOpen(false)
            refetchBoard()
        },
        retry: false
    })

    const handleAdd = (title: string | undefined) => {
        if (!title) {
            toast.warning({ message: capitalize('please enter column title') })
            return
        }
        if (!isSession) {
            toast.warning({ message: capitalize('you must login first') })
            return
        }
        mutate({
            title,
            boardId: router.query?.slug as string
        })
    }

    const Ready = (
        <Container
            background={bgColor}
            color={color}
            flex direct='column' gap={24}
            className='min-w-[250px] max-w-[250px] p-4 rounded'
            style={{ boxShadow: 'var(--board-shadow)' }}
        >
            <Input
                placeholder={capitalize('column title')}
                ref={inputRef}
            />
            <Container flex justify='between' align='center'>
                <Button
                    fontSize='12px'
                    fontWeight={600}
                    icon={<RiMenuAddLine className='w-4 h-4' />}
                    onClick={() => handleAdd(inputRef.current?.input?.value)}
                >
                    {capitalize('add')}
                </Button>
                <IoClose
                    className='w-5 h-5 cursor-pointer'
                    onClick={() => setIsOpen(false)}
                />
            </Container>
        </Container>
    )

    const Add = (
        <Button
            icon={<RiMenuAddLine className='w-4 h-4' />}
            fontWeight='600'
            onClick={() => setIsOpen(true)}
        >
            {capitalize('add new columns')}
        </Button>
    )

    return (
        <>
            {isOpen ? Ready : Add}
        </>
    )
}

export default AddColumn
