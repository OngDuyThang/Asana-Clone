import Dashboard from 'modules/Dashboard'
import { GetStaticPropsContext } from 'next'
import { type FC } from 'react'
import { mockBoardList } from './seoData'
import { TBoardTitle } from 'types/board'

interface IProps {
    boardList: TBoardTitle[]
}

const Dashboard_Page: FC<IProps> = ({
    boardList
}) => {
    return (
        <Dashboard boardList={boardList} />
    )
}

export default Dashboard_Page

export function getStaticProps(_ctx: GetStaticPropsContext) {
    return {
        props: {
            boardList: mockBoardList
        }
    }
}
