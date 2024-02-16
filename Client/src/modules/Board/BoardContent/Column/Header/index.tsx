import { Container, Text, Dropdown } from 'components'
import { capitalize } from 'lodash'
import { useMemo, type FC, useContext } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { items } from './items'
import { useMutation } from 'react-query'
import { deleteColumn } from 'api/column'
import { ToastContext, ToastInstance } from 'layout'
import { BoardContext, RefetchBoard } from 'modules/Board'

interface HeaderProps {
    title: string;
    columnId: string
}

const Header: FC<HeaderProps> = ({
    title,
    columnId
}) => {
    const toast = useContext(ToastContext) as ToastInstance
    const refetchBoard = useContext(BoardContext) as RefetchBoard
    const { mutate: handleDelete } = useMutation(deleteColumn, {
        onSuccess: (data) => {
            if (data.statusCode !== 200) {
                toast.error({ message: data.message })
                return
            }
            toast.success({ message: capitalize('Remove column succesfully') })
            refetchBoard()
        }
    })
    const memoItems = useMemo(() => items(
        columnId,
        handleDelete
    ), [])

    return (
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
    )
}

export default Header
