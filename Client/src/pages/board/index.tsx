import BoardList from 'modules/Board/List'
import { GetStaticPropsContext } from 'next'
import { type FC } from 'react'

const BoardList_Page: FC = () => {
    return <BoardList />
}

export default BoardList_Page

export const getStaticProps = (ctx: GetStaticPropsContext) => {
    return {
        props: {}
    }
}
