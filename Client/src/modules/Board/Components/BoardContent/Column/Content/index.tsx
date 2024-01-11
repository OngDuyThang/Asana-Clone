import { Card as CardComponent, Container, Div, Image } from 'components'
import { useState, type FC } from 'react'
import styles from './index.module.less'
import { actions } from './actions'
import { TCard } from 'types/card'
import { sortByOrder } from 'utils/helpers'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';

export const Card = ({ cardData }: { cardData: TCard }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: cardData.id,
        data: { ...cardData }
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        touchAction: 'none',
        opacity: isDragging ? '0.5' : '1'
    };

    const cover = (src: string | null) => src ? (
        <Div className={styles.cover}>
            <Image
                src={src}
                alt='test'
                fit='cover'
            />
        </Div>
    ) : null

    return (
        <CardComponent
            className={styles.card}
            cover={cover(cardData.cover)}
            actions={actions({
                memberIds: cardData.memberIds,
                comments: cardData.comments,
                attachments: cardData.attachments
            })}
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            {cardData.title}
        </CardComponent>
    )
}

interface ContentProps {
    cardList: TCard[];
    cardOrder: string[]
}

const Content: FC<ContentProps> = ({
    cardList,
    cardOrder
}) => {
    const [sortedOrder, setSortedOrder] = useState<string[]>(cardOrder)

    const render = sortByOrder(
        cardList,
        sortedOrder,
        'id'
    ).map(card => (
        <Card cardData={card} key={card.id} />
    ))

    return (
        <Container flex direct='column' gap='16' className={styles.content}>
            <SortableContext
                items={cardList.map(card => card.id)}
                strategy={verticalListSortingStrategy}
            >
                {render}
            </SortableContext>
        </Container>
    )
}

export default Content
