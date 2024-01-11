import { Button, Container } from 'components'
import { type FC, useState, useEffect } from 'react'
import styles from './index.module.less'
import { useValueByTheme, useGetSensors } from 'hooks'
import { DarkColor, LightColor } from 'types/theme'
import { capitalize } from 'lodash'
import { RiMenuAddLine } from "react-icons/ri";
import { TColumn } from 'types/column'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, DropAnimation, defaultDropAnimationSideEffects } from '@dnd-kit/core';
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
    columnList,
    columnOrder
}) => {
    const color = useValueByTheme(LightColor.text, DarkColor.text)
    const [sortedOrder, setSortedOrder] = useState<string[]>(columnOrder)
    const [activeItem, setActiveItem] = useState<TColumn | TCard | null>(null)
    const sensors = useGetSensors()

    const render = sortByOrder(
        columnList,
        sortedOrder,
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
        const { active } = event
        if (!active.data.current?.sortable) return

        const { sortable, ...itemData } = active.data.current
        if (active.data.current?.hasOwnProperty('columnId')) {
            setActiveItem({ ...(itemData as TCard) })
            return
        }
        setActiveItem({ ...(itemData as TColumn) })
    }

    useEffect(() => { console.log(activeItem) }, [activeItem])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return

        if (active.id !== over?.id) {
            setSortedOrder((prev) => {
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
