import { Card, Container, Div, Image } from 'components'
import { type FC } from 'react'
import styles from './index.module.less'
import { actions } from './actions'
import { TCard } from 'types/card'

interface ContentProps {
    cardList: TCard[];
}

const Content: FC<ContentProps> = ({
    cardList,
}) => {
    const cover = (src: string | null) => src ? (
        <Div className={styles.cover}>
            <Image
                src={src}
                alt='test'
                fit='cover'
            />
        </Div>
    ) : null

    const render = cardList.map((item, index) => (
        <Card
            className={styles.card}
            cover={cover(item.cover)}
            actions={actions({
                memberIds: item.memberIds,
                comments: item.comments,
                attachments: item.attachments
            })}
            key={index}
        >
            {item.title}
        </Card>
    ))

    return (
        <Container flex direct='column' gap='16' className={styles.content}>
            {render}
        </Container>
    )
}

export default Content
