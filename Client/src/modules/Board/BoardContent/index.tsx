import { Container } from 'components'
import { type FC, useState, useEffect, useContext } from 'react'
import styles from './index.module.less'
import { useAppSelector, useGetSensors } from 'hooks'
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
import { addEmptyCard, dropAnimation, isCard } from 'utils/board'
import { dragEnd, dragOver, dragStart } from './event'
import AddColumn from '../Components/AddColumn'
import { useMutation } from 'react-query'
import { moveColumn } from 'api/board'
import { useRouter } from 'next/router'
import { ToastContext, ToastInstance } from 'layout'
import { BoardContext, RefetchBoard } from '..'
import { capitalize } from 'lodash'
import { moveCard } from 'api/column'

interface BoardContentProps {
    columnList: TColumn[]
}

const BoardContent: FC<BoardContentProps> = ({
    columnList: columns
}) => {
    const router = useRouter()
    const toast = useContext(ToastContext) as ToastInstance
    const refetchBoard = useContext(BoardContext) as RefetchBoard
    const { isSession } = useAppSelector(state => state.user)
    const [columnList, setColumnList] = useState<TColumn[]>([...columns])
    const sensors = useGetSensors()
    const [activeItem, setActiveItem] = useState<TColumn | TCard | null>(null)
    const { mutate: handleMoveColumn } = useMutation(moveColumn, {
        onSuccess: (data) => {
            if (data.statusCode !== 200) {
                toast.error({ message: data.message })
                return
            }
            toast.success({ message: capitalize('move column successfully') })
            refetchBoard()
        },
        retry: false,
    })
    const { mutate: handleMoveCard } = useMutation(moveCard, {
        onSuccess: (data) => {
            if (data.statusCode !== 200) {
                toast.error({ message: data.message })
                return
            }
            toast.success({ message: capitalize('move card successfully') })
            refetchBoard()
        },
        retry: false,
    })

    useEffect(() => {
        setColumnList(() => {
            addEmptyCard(columns)
            return [...columns]
        })
    }, [columns])

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

    const handleDragStart = (event: DragStartEvent) => {
        dragStart(
            event,
            (value: TColumn | TCard | null) => { setActiveItem(value) }
        )
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
            handleMoveColumn,
            handleMoveCard
            // (value: string[]) => {
            //     if (isSession) {
            //         mutate({
            //             id: router.query?.slug as string,
            //             columnOrderIds: value
            //         })
            //     }
            // }
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
                    <AddColumn />
                </Container>
            </SortableContext>
        </DndContext>
    )
}

export default BoardContent