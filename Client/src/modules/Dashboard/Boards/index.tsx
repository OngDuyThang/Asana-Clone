import { Container, Text, Empty, Dropdown, Modal, Button } from 'components'
import { useAppSelector, useValueByTheme } from 'hooks'
import { capitalize } from 'lodash'
import { useMemo, type FC, useContext, useState } from 'react'
import { DarkColor, LightColor } from 'types/theme'
import styles from '../index.module.less'
import { TBoardTitle } from 'types/board'
import Link from 'next/link'
import { FaCaretDown } from 'react-icons/fa'
import { items } from './items'
import { useMutation } from 'react-query'
import { deleteBoard } from 'api/board'
import { ToastContext, ToastInstance } from 'layout'
import { BoardsContext, RefetchBoards } from '..'

interface BoardProps {
    boardId: string;
    boardTitle: string;
}

const Board: FC<BoardProps> = ({
    boardId,
    boardTitle
}) => {
    const toast = useContext(ToastContext) as ToastInstance
    const bgColor = useValueByTheme(LightColor.board_column, DarkColor.board_column)
    const color = useValueByTheme(LightColor.text, DarkColor.text)
    const { isSession } = useAppSelector(state => state.user)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const memoItems = useMemo(() => items, [])
    const refetchBoards = useContext(BoardsContext) as RefetchBoards
    const { mutate } = useMutation(deleteBoard, {
        onSuccess: (data) => {
            if (data.statusCode !== 200) {
                toast.error({ message: data.message })
                return
            }
            toast.success({ message: capitalize('remove board succesfully') })
            refetchBoards()
        }
    })

    const handleDelete = () => {
        if (!isSession) {
            toast.warning({ message: capitalize('you must login first') })
            return
        }
        mutate(boardId)
    }

    const ConfirmModal = (
        <Modal
            title={
                <Text tag='span' fontSize='18px'>
                    {capitalize('confirm delete this board?')}
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
        <Container className={styles.item}>
            <Link href={{ pathname: `/board/${boardId}` }}>
                <Container
                    className={styles.content}
                    background={bgColor}
                    color={color}
                    flex justify='between' align='start'
                >
                    <Text tag='span' fontWeight={600}>
                        {capitalize(boardTitle)}
                    </Text>
                    <a
                        className={styles.anchor}
                        onClick={(e) => e.preventDefault()}
                    >
                        <Dropdown
                            items={memoItems(() => setIsOpen(true))}
                            onClick={() => {}}
                        >
                            <FaCaretDown className={styles['board-dropdown']} />
                        </Dropdown>
                    </a>
                </Container>
            </Link>
            {ConfirmModal}
        </Container>
    )
}

interface BoardsProps {
    boardList: TBoardTitle[]
}

const Boards: FC<BoardsProps> = ({
    boardList
}) => {

    const render = boardList.map((board, index) => (
        <Board
            boardId={board.id}
            boardTitle={board.title}
            key={index}
        />
    ))

    if (!boardList.length) return <Empty description={capitalize('you have no board, please create!')} />

    return (
        <Container
            className={styles.list}
            flex wrap rowGap={16}
        >
            {render}
        </Container>
    )
}

export default Boards
