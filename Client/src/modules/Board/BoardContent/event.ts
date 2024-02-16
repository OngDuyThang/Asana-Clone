import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core"
import { cloneDeep } from "lodash"
import { UseMutateFunction } from "react-query"
import { TApiResponse } from "types/api"
import { MoveColumnRequest } from "types/board"
import { TCard } from "types/card"
import { MoveCardRequest, TColumn } from "types/column"
import { addEmptyCard, isCard, moveCardBetweenColumns, moveCardSameColumn, removeEmptyCard, validateEmptyCard } from "utils/board"
import { moveItem } from "utils/helpers"

let prevColumnId: string = ''

export const dragStart = (
    event: DragStartEvent,
    setActiveItem: (value: TColumn | TCard | null) => void
) => {
    const { active: { data: { current: data } } } = event
    if (!data) return

    const { sortable, ...itemData } = data
    if (itemData.hasOwnProperty('columnId')) {
        setActiveItem(cloneDeep(itemData) as TCard)
        return
    }
    setActiveItem(cloneDeep(itemData) as TColumn)
}

export const dragOver = (
    event: DragOverEvent,
    activeItem: TColumn | TCard | null,
    setActiveItem: (value: TColumn | TCard | null) => void,
    columnList: TColumn[]
) => {
    // CHECK ACTIVE ITEM IS CARD OR NOT, ASSIGN TYPE
    const { active, over } = event
    if (!active || !over || !activeItem || !isCard(activeItem)) return
    const activeCard = cloneDeep(activeItem as TCard)

    // DECLARE PREVIOUS COLUMN AND CURRENT DRAG OVER COLUMN, CHECK IF DRAG CARD IN THE SAME COLUMN
    const prevColumn = columnList.find(column => column.id === activeCard.columnId)
    const currentColumn = columnList.find(
        column => column.cards.find(
            card => card.id === over.id // || card.columnId === over.id
        )
    )
    if (!currentColumn || !prevColumn) return

    if (currentColumn.id === prevColumn.id) {
        moveCardSameColumn(
            activeCard,
            currentColumn,
            over
        )
    }

    if (currentColumn.id !== prevColumn.id) {
        prevColumnId = prevColumn.id
        moveCardBetweenColumns(
            activeCard,
            prevColumn,
            currentColumn,
            active,
            over
        )
    }

    setActiveItem(cloneDeep(activeCard))

    // PREVENT EMPTY CARD LIST BUG BY ADD EMPTY CARD
    addEmptyCard(columnList)
}

export const dragEnd = (
    event: DragEndEvent,
    activeItem: TColumn | TCard | null,
    setActiveItem: (value: TColumn | TCard | null) => void,
    columnList: TColumn[],
    setColumnList: (value: TColumn[]) => void,
    handleMoveColumn: UseMutateFunction<TApiResponse, unknown, MoveColumnRequest, unknown>,
    handleMoveCard: UseMutateFunction<TApiResponse, unknown, MoveCardRequest, unknown>
) => {
    const { active, over } = event
    if (!active || !over || !activeItem) return

    if (isCard(activeItem)) {
        const activeCard = cloneDeep(activeItem as TCard)

        // DECLARE PREVIOUS COLUMN AND CURRENT DRAG OVER COLUMN
        const currentColumn = columnList.find(
            column => column.cards.find(
                card => card.id === over.id // || card.columnId === over.id
            )
        )
        const prevColumn = prevColumnId ?
            columnList.find(column => column.id === prevColumnId) :
            columnList.find(column => column.id === activeCard.columnId)

        if (!currentColumn || !prevColumn) return

        // SAME COLUMN, DIFFERENT COLUMN
        if (currentColumn.id === prevColumn.id) {
            moveCardSameColumn(
                activeCard,
                currentColumn,
                over
            )
            handleMoveCard({
                currentId: currentColumn.id,
                prevId: currentColumn.id,
                cardId: activeCard.id,
                currentCardOrderIds: validateEmptyCard([...currentColumn.cardOrderIds]),
                prevCardOrderIds: validateEmptyCard([...currentColumn.cardOrderIds])
            })
        } else {
            moveCardBetweenColumns(
                activeCard,
                prevColumn,
                currentColumn,
                active,
                over
            )
            handleMoveCard({
                currentId: currentColumn.id,
                prevId: prevColumn.id,
                cardId: activeCard.id,
                currentCardOrderIds: validateEmptyCard([...currentColumn.cardOrderIds]),
                prevCardOrderIds: validateEmptyCard([...prevColumn.cardOrderIds])
            })
        }

        prevColumnId = ''
    }

    if (!isCard(activeItem)) {
        if (active.id !== over.id) {
            const oldIndex = columnList.findIndex(column => column.id === active.id);
            const newIndex = columnList.findIndex(column => column.id === over.id);

            const newColumnList: TColumn[] = [...moveItem(columnList, oldIndex, newIndex)]
            setColumnList(newColumnList)
            handleMoveColumn({
                id: newColumnList[0].boardId,
                columnOrderIds: [...newColumnList.map(column => column.id)]
            })
        }
    }

    setActiveItem(null)

    // PREVENT EMPTY CARD LIST BUG BY ADD EMPTY CARD
    addEmptyCard(columnList)
    // DELETE EMPTY CARD WHEN ADD CARD
    removeEmptyCard(columnList)
}