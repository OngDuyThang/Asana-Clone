import { LoadingScreen } from 'components'
import Board from 'modules/Board'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { type FC } from 'react'
import { TBoard } from 'types/board'
import { mockBoardData } from '../../modules/Board/seoData'

interface IProps {
    boardData: TBoard
}

const BoardDetail_Page: FC<IProps> = ({
    boardData
}) => {
    const router = useRouter()

    if (router.isFallback) {
        return <LoadingScreen />
    }
    return <Board boardData={boardData} />
}

export default BoardDetail_Page

export const getStaticPaths = () => {
    return {
        paths: [
            { params: { slug: '1' } }
        ],
        fallback: true
    }
}

export const getStaticProps = async (_ctx: GetStaticPropsContext) => {
    return {
        props: {
            boardData: mockBoardData
        },
        revalidate: 60
    }
}
