import { Container, Text, Empty } from 'components'
import { useValueByTheme } from 'hooks'
import { capitalize } from 'lodash'
import { type FC } from 'react'
import { DarkColor, LightColor } from 'types/theme'
import styles from '../index.module.less'
import { TBoardTitle } from 'types/board'
import Link from 'next/link'

interface BoardProps {
    boardId: string,
    boardTitle: string
}

const Board: FC<BoardProps> = ({
    boardId,
    boardTitle
}) => {
    const bgColor = useValueByTheme(LightColor.board_column, DarkColor.board_column)
    const color = useValueByTheme(LightColor.text, DarkColor.text)

    return (
        <Container className={styles.item}>
            <Link href={{
                pathname: `/board/${boardId}`
            }}>
                <Container
                    className={styles.content}
                    background={bgColor}
                    color={color}
                    flex justify='start' align='start'
                >
                    <Text tag='span' fontWeight={600}>
                        {capitalize(boardTitle)}
                    </Text>
                </Container>
            </Link>
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
