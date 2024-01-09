
import { Container } from 'components'
import { type FC } from 'react'
import BoardBar from '../Components/BoardBar'
import BoardContent from '../Components/BoardContent'
import { TBoard } from 'types/board'
import { sortByOrder } from 'utils/helpers'

interface BoardListProps {
    boardData: TBoard
}

const BoardList: FC<BoardListProps> = ({
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
            />
        </Container>
    )
}

export default BoardList
