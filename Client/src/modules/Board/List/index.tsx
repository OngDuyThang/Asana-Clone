
import { Container } from 'components'
import { type FC } from 'react'
import BoardBar from '../Components/BoardBar'
import BoardContent from '../Components/BoardContent'
import { TBoard } from 'types/board'

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
                columnList={boardData.columns}
                columnOrder={boardData.columnOrderIds}
            />
        </Container>
    )
}

export default BoardList
