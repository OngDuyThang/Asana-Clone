import { Container } from 'components'
import { GetStaticPropsContext } from 'next'

import { type FC } from 'react'

const BoardList_Page: FC = () => {
    return (
        <Container>
            AAA
        </Container>
    )
}

export default BoardList_Page

export const getStaticProps = (ctx: GetStaticPropsContext) => {
    return {
        props: {}
    }
}
