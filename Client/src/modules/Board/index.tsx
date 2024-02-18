import { Container, LoadingScreen } from 'components'
import { useState, type FC, createContext } from 'react'
import { QueryObserverResult } from 'react-query'
import { TBoard } from 'types/board'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { sortByOrder } from 'utils/helpers'
import { useGetBoardById } from 'api/board'
import { useRouter } from 'next/router'
import { useAppSelector } from 'hooks'

export type RefetchBoard = () => Promise<QueryObserverResult>
export const BoardContext = createContext<RefetchBoard | null>(null)

interface BoardProps {
    boardData: TBoard
}

const Board: FC<BoardProps> = ({
    boardData: mockBoardData
}) => {
    const router = useRouter()
    const [boardData, setBoardData] = useState<TBoard>(mockBoardData)
    const { isSession } = useAppSelector(state => state.user)
    const { isLoading, refetch: refetchBoard, isFetching } = useGetBoardById(
        router.query?.slug as string,
        router.pathname, {
        onSuccess: (data) => {
            if (!data?.data) return
            setBoardData(data.data)
        },
        enabled: isSession
    })

    return (
        <BoardContext.Provider value={refetchBoard}>
            <Container style={{ ...(isLoading || isFetching ? { display: 'none' } : null) }}>
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
            {isLoading || isFetching ? <LoadingScreen /> : null}
        </BoardContext.Provider>
    )
}

export default Board
