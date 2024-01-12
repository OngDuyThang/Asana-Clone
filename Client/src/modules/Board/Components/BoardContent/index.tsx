import { Button, Container } from 'components'
import { type FC, useState } from 'react'
import styles from './index.module.less'
import { useValueByTheme, useGetSensors } from 'hooks'
import { DarkColor, LightColor } from 'types/theme'
import { capitalize, cloneDeep, remove } from 'lodash'
import { RiMenuAddLine } from "react-icons/ri";
import { TColumn } from 'types/column'
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    DropAnimation,
    defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Column from './Column'
import { sortByOrder } from 'utils/helpers'
import { TCard } from 'types/card'
import { Card } from './Column/Content'

interface BoardContentProps {
    columnList: TColumn[];
    columnOrder: string[]
}

const BoardContent: FC<BoardContentProps> = ({
    columnList: columns,
    columnOrder: order
}) => {
    const color = useValueByTheme(LightColor.text, DarkColor.text)
    const [columnList, setColumnList] = useState<TColumn[]>([...columns])
    const [columnOrder, setColumnOrder] = useState<string[]>([...order])
    const sensors = useGetSensors()
    const [activeItem, setActiveItem] = useState<TColumn | TCard | null>(null)
    const isCard = (item: TColumn | TCard) => item.hasOwnProperty('columnId')

    const render = sortByOrder(
        columnList,
        columnOrder,
        'id'
    ).map(column => (
        <Column columnData={column} key={column.id} />
    ))

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
        const { active: { data: { current: data } } } = event
        if (!data) return

        const { sortable, ...itemData } = data
        if (itemData.hasOwnProperty('columnId')) {
            setActiveItem(cloneDeep(itemData) as TCard)
            return
        }
        setActiveItem(cloneDeep(itemData) as TColumn)
    }

    const handleDragOver = (event: DragOverEvent) => {
        // CHECK ACTIVE ITEM IS CARD OR NOT, ASSIGN TYPE
        if (!activeItem || !isCard(activeItem)) return
        const activeCard = cloneDeep(activeItem as TCard)

        // DECLARE PREVIOUS COLUMN AND CURRENT DRAG OVER COLUMN, CHECK IF DRAG CARD IN THE SAME COLUMN
        const { active, over } = event
        const prevColumn = columnList.find(column => column.id === activeCard.columnId)
        const currentColumn = columnList.find(
            column => column.cards.find(
                card => card.id === over?.id // || card.columnId === over?.id
            )
        )
        if (!currentColumn || !prevColumn || currentColumn.id === prevColumn.id) return

        // FIND ARRIVE INDEX OF THE CARD LIST OF THE CURRENT COLUMN BASE ON DRAG OVER ID
        // FIND INSERT INDEX TO INSERT TO THE CARD LIST OF THE CURRENT COLUMN
        const arriveIndex = currentColumn.cards.findIndex(card => card.id === over?.id)
        const isBelowOverItem = over && active.rect.current.translated
            && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0;
        const insertIndex = arriveIndex >= 0 ? arriveIndex + modifier : currentColumn.cards.length + 1

        // CHECK IF CARD EXIST IN THE CARD LIST OF THE CURRENT COLUMN
        // INSERT CARD TO THE CARD LIST OF THE CURRENT COLUMN, UPDATE COLUMN ID FOR CARD
        if (currentColumn.cards.find(card => card.id === activeCard.id)) return
        activeCard.columnId = currentColumn.id
        currentColumn.cards.splice(insertIndex, 0, activeCard)
        currentColumn.cardOrderIds.splice(insertIndex, 0, activeCard.id)
        console.log('insert index: ', insertIndex)
        console.log('currentColumn: ', currentColumn)
        console.log('columnList: ', columnList)

        // REMOVE CARD FROM THE CARD LIST OF THE PREVIOUS COLUMN
        remove(prevColumn?.cards as TCard[], card => card.id === activeCard.id)
        remove(prevColumn?.cardOrderIds as string[], id => id === activeCard.id)

        setColumnList(prev => prev)
        // setColumnList(prev => {
        //     prev[prev.findIndex(column => column.id === currentColumn.id)] = currentColumn
        //     prev[prev.findIndex(column => column.id === prevColumn.id)] = prevColumn
        //     return prev
        // })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!active || !over) return

        if (active.id !== over?.id) {
            setColumnOrder((prev) => {
                const oldIndex = prev.indexOf(active?.id as string);
                const newIndex = prev.indexOf(over?.id as string);

                return arrayMove(prev, oldIndex, newIndex);
            });
        }
        setActiveItem(null)
    }

    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    return (
        <Container
            flex
            align='start'
            gap='32'
            className={styles.root}
            color={color}
        >
            <DndContext
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeItem && activeItem.hasOwnProperty('columnId')
                        ? <Card cardData={activeItem as TCard} />
                        : <Column columnData={activeItem as TColumn} />}
                </DragOverlay>
                <SortableContext
                    items={columnList.map(column => column.id)}
                    strategy={horizontalListSortingStrategy}
                >
                    {render}
                </SortableContext>
            </DndContext>
            {AddColumn}
        </Container>
    )
}

export default BoardContent
