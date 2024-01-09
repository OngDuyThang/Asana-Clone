import { Button, Container } from 'components'
import { type FC } from 'react'
import styles from './index.module.less'
import { Col, Row } from 'antd'
import { useValueByTheme } from 'hooks'
import { DarkColor, LightColor } from 'types/theme'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { capitalize } from 'lodash'
import { RiMenuAddLine } from "react-icons/ri";
import { TColumn } from 'types/column'
import { sortByOrder } from 'utils/helpers'

// const testCover = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
// const testReactionData: TCardReaction = {
//     users: 10,
//     comments: 20,
//     pins: 30
// }
// const testCardData: TCardData = {
//     coverSrc: testCover,
//     reactionData: testReactionData,
//     content: 'test test test'
// }
// const testCardData2: TCardData = {
//     content: 'test test test'
// }

interface BoardContentProps {
    columnList: TColumn[]
}

const BoardContent: FC<BoardContentProps> = ({
    columnList
}) => {
    const color = useValueByTheme(LightColor.text, DarkColor.text)
    const columnBg = useValueByTheme(LightColor.board_column, DarkColor.board_column)

    const render = columnList.map(item => (
        <Col className='h-full' key={item.id}>
            <Container className={styles.column} style={{ background: columnBg }}>
                <Header title={item.title} />
                <Content
                    cardList={sortByOrder(
                        item.cards,
                        item.cardOrderIds,
                        'id'
                    )}
                />
                <Footer />
            </Container>
        </Col>
    ))

    const AddColumn = (
        <Col>
            <Button
                icon={<RiMenuAddLine className='w-4 h-4' />}
                fontWeight='600'
                onClick={() => { }}
            >
                {capitalize('add new columns')}
            </Button>
        </Col>
    )

    return (
        <Container className={styles.root} color={color}>
            <Row gutter={[32, 0]} wrap={false} className='h-full'>
                {render}
                {AddColumn}
            </Row>
        </Container>
    )
}

export default BoardContent
