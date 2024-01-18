import { Button, Container } from 'components'
import { type FC, useState } from 'react'
import styles from './index.module.less'
import { useGetSensors } from 'hooks'
import { capitalize } from 'lodash'
import { RiMenuAddLine } from "react-icons/ri";
import { TColumn } from 'types/column'
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    closestCorners
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { sortByOrder } from 'utils/helpers'
import { TCard } from 'types/card'
import { Card } from './Column/Content'
import Column from './Column'
import { dropAnimation, isCard } from 'utils/board'
import { dragEnd, dragOver, dragStart } from './event'

interface BoardContentProps {
    columnList: TColumn[];
    columnOrder: string[]
}

const BoardContent: FC<BoardContentProps> = ({
    columnList: columns,
    columnOrder: order
}) => {
    // COLUMN LIST & COLUMN ORDER FOR POST REQUEST
    const [columnList, setColumnList] = useState<TColumn[]>([...columns])
    const [columnOrder, setColumnOrder] = useState<string[]>([...order])
    const sensors = useGetSensors()
    const [activeItem, setActiveItem] = useState<TColumn | TCard | null>(null)

    const render = columnList.map(column => {
        column.cards = sortByOrder(
            column.cards,
            column.cardOrderIds,
            'id'
        )
        return (
            <Column columnData={column} key={column.id} />
        )
    })

    const AddColumn = (
        <Button
            icon={<RiMenuAddLine className='w-4 h-4' />}
            fontWeight='600'
            onClick={() => { }}
        >
            {capitalize('add new columns')}
        </Button>
    )

    const handleDragStart = (event: DragStartEvent) => {
        dragStart(event, (value: TColumn | TCard | null) => {
            setActiveItem(value)
        })
    }


    const handleDragOver = (event: DragOverEvent) => {
        dragOver(
            event,
            activeItem,
            (value: TColumn | TCard | null) => { setActiveItem(value) },
            columnList
        )
    }

    const handleDragEnd = (event: DragEndEvent) => {
        dragEnd(
            event,
            activeItem,
            (value: TColumn | TCard | null) => { setActiveItem(value) },
            columnList,
            (value: TColumn[]) => { setColumnList(value) },
            (value: string[]) => { setColumnOrder(value) }
        )
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCorners}
        >
            <DragOverlay dropAnimation={dropAnimation}>
                {activeItem && isCard(activeItem)
                    ? <Card cardData={activeItem as TCard} />
                    : <Column columnData={activeItem as TColumn} />}
            </DragOverlay>
            <SortableContext
                items={columnList.map(column => column.id)}
                strategy={horizontalListSortingStrategy}
            >
                <Container
                    flex
                    align='start'
                    gap='32'
                    className={styles.root}
                >
                    {render}
                    {AddColumn}
                </Container>
            </SortableContext>
        </DndContext>
    )
}

export default BoardContent