import { Container } from 'components'
import { type FC } from 'react'
import { TBoard } from 'types/board'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { sortByOrder } from 'utils/helpers'

interface BoardProps {
    boardData: TBoard
}

const Board: FC<BoardProps> = ({
    boardData
}) => {
    return (
        <Container>
            <BoardBar
                title={boardData.title}
                description={boardData.description}
                type={boardData.type}
            />
            <BoardContent
                columnList={sortByOrder(
                    boardData.columns,
                    boardData.columnOrderIds,
                    'id'
                )}
                columnOrder={[...boardData.columnOrderIds]}
            />
        </Container>
    )
}

export default Board
