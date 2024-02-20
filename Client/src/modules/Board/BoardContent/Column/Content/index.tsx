import { Card as CardComponent, Container, Div, Image } from 'components'
import { type FC, CSSProperties } from 'react'
import styles from './index.module.less'
import { actions } from './actions'
import { EMPTY_CARD, TCard } from 'types/card'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';
import { cloneDeep } from 'lodash'
import clsx from 'clsx'
import { useAppSelector } from 'hooks'

export const Card = ({ cardData }: { cardData: TCard }) => {
    const { theme: reduxTheme } = useAppSelector(state => state.system)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: cardData.id,
        data: cloneDeep(cardData)
    });
    const style: CSSProperties = {
        transform: CSS.Translate.toString(transform),
        transition,
        touchAction: 'none',
        opacity: isDragging ? '0.5' : '1',
        ...(cardData.id.includes(EMPTY_CARD) ? {
            visibility: 'hidden',
            height: '0',
            pointerEvents: 'none'
        } : null)
    };

    const cover = (src: string | null) => src ? (
        <Div className={styles.cover}>
            <Image
                src={src}
                alt='cover-image'
                fit='cover'
            />
        </Div>
    ) : null

    return (
        <CardComponent
            className={clsx(styles.card, styles[`card-${reduxTheme}`])}
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
}

const Content: FC<ContentProps> = ({
    cardList
}) => {
    const render = cardList.map(card => (
        <Card cardData={card} key={card.id} />
    ))

    return (
        <SortableContext
            items={cardList.map(card => card.id)}
            strategy={verticalListSortingStrategy}
        >
            <Container flex direct='column' gap='16' className={styles.content}>
                {render}
            </Container>
        </SortableContext>
    )
}

export default Content
