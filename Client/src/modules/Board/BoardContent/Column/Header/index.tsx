import { Container, Text, Dropdown, Modal, Button } from 'components'
import { capitalize } from 'lodash'
import { useMemo, type FC, useContext, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { items } from './items'
import { useMutation } from 'react-query'
import { deleteColumn } from 'api/column'
import { ToastContext, ToastInstance } from 'layout'
import { BoardContext, RefetchBoard } from 'modules/Board'
import { useAppSelector } from 'hooks'
import { useRouter } from 'next/router'

interface HeaderProps {
    title: string;
    columnId: string
}

const Header: FC<HeaderProps> = ({
    title,
    columnId
}) => {
    const router = useRouter()
    const toast = useContext(ToastContext) as ToastInstance
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { isSession } = useAppSelector(state => state.user)
    const refetchBoard = useContext(BoardContext) as RefetchBoard
    const { mutate } = useMutation(deleteColumn, {
        onSuccess: (data) => {
            if (data.statusCode !== 200) {
                toast.error({ message: data.message })
                return
            }
            toast.success({ message: capitalize('remove column succesfully') })
            refetchBoard()
        }
    })
    const memoItems = useMemo(() => items(
        () => setIsOpen(true)
    ), [])

    const handleDelete = () => {
        if (!isSession) {
            toast.warning({ message: capitalize('you must login first') })
            return
        }
        mutate({
            id: columnId,
            boardId: router.query?.slug as string
        })
    }

    const ConfirmModal = (
        <Modal
            title={
                <Text tag='span' fontSize='18px'>
                    {capitalize('confirm delete this column?')}
                </Text>
            }
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            width={400}
        >
            <Container flex justify='end' gap={16} className='mt-8'>
                <Button
                    fontWeight={600}
                    onClick={handleDelete}
                >
                    {capitalize('delete')}
                </Button>
                <Button
                    fontWeight={600}
                    onClick={() => setIsOpen(false)}
                >
                    {capitalize('cancel')}
                </Button>
            </Container>
        </Modal>
    )

    return (
        <>
            <Container flex justify='between' align='center'>
                <Text tag='span' fontWeight='600' fontSize='16px'>
                    {capitalize(title)}
                </Text>
                <Dropdown
                    items={memoItems}
                    onClick={() => {}}
                >
                    <FaCaretDown className='w-4 h-4' />
                </Dropdown>
            </Container>
            {ConfirmModal}
        </>
    )
}

export default Header
