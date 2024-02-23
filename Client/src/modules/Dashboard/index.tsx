import { Container, LoadingScreen, Text } from 'components'
import { capitalize } from 'lodash'
import { useContext, type FC, useState, createContext } from 'react'
import Boards from './Boards'
import { TBoardTitle } from 'types/board'
import { useGetAllBoards } from 'api/board'
import { useRouter } from 'next/router'
import { ToastContext, ToastInstance } from 'layout'
import { useAppSelector, useValueByTheme } from 'hooks'
import styles from './index.module.less'
import { DarkColor, LightColor } from 'types/theme'
import { QueryObserverResult } from 'react-query'

export type RefetchBoards = () => Promise<QueryObserverResult>
export const BoardsContext = createContext<RefetchBoards | null>(null)

interface DashboardProps {
    boardList: TBoardTitle[]
}

const Dashboard: FC<DashboardProps> = ({
    boardList: boards
}) => {
    const color = useValueByTheme(LightColor.text, DarkColor.text)
    const router = useRouter()
    const toast = useContext(ToastContext) as ToastInstance
    const { isSession } = useAppSelector(state => state.user)
    const [boardList, setBoardList] = useState<TBoardTitle[]>(boards)
    const { isLoading, refetch: refetchBoards, isFetching } = useGetAllBoards(router.pathname, {
        onSuccess: (data) => {
            if (!data?.data) {
                toast.error({ message: data.message })
                return
            }
            setBoardList(data.data)
        },
        enabled: isSession
    })

    const BoardsRender = (
        <>
            <Text tag='span' fontSize='18px' fontWeight={600}>
                {capitalize('your boards')}
            </Text>
            {!isSession ? <Text tag='span' fontSize='14px' fontWeight={600}>
                {capitalize('signin to create your board, or use trial version below:')}
            </Text> : null}
            <Boards boardList={boardList} />
        </>
    )

    return (
        <BoardsContext.Provider value={refetchBoards}>
            <Container
                color={color}
                className={styles.root}
                flex direct='column' gap={16}
                style={{ ...(isLoading || isFetching ? { display: 'none' } : null) }}
            >
                {BoardsRender}
            </Container>
            {isLoading || isFetching ? <LoadingScreen /> : null}
        </BoardsContext.Provider>
    )
}

export default Dashboard
