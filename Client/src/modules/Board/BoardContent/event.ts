import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core"
import { cloneDeep, remove } from "lodash"
import { EMPTY_CARD, TCard } from "types/card"
import { TColumn } from "types/column"
import { createCardId, hasEmptyCard, hasEmptyCardList, isCard, moveCardBetweenColumns } from "utils/board"
import { moveItem } from "utils/helpers"

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
    if (!currentColumn || !prevColumn || currentColumn.id === prevColumn.id) return

    moveCardBetweenColumns(
        activeCard,
        prevColumn,
        currentColumn,
        active,
        over
    )

    setActiveItem(cloneDeep(activeCard))
}

export const dragEnd = (
    event: DragEndEvent,
    activeItem: TColumn | TCard | null,
    setActiveItem: (value: TColumn | TCard | null) => void,
    columnList: TColumn[],
    setColumnList: (value: TColumn[]) => void,
    setColumnOrder: (value: string[]) => void
) => {
    const { active, over } = event
    if (!active || !over || !activeItem) return

    if (isCard(activeItem)) {
        const activeCard = cloneDeep(activeItem as TCard)

        // DECLARE PREVIOUS COLUMN AND CURRENT DRAG OVER COLUMN
        const prevColumn = columnList.find(column => column.id === activeCard.columnId)
        const currentColumn = columnList.find(
            column => column.cards.find(
                card => card.id === over.id // || card.columnId === over.id
            )
        )
        if (!currentColumn || !prevColumn) return

        // SAME COLUMN, DIFFERENT COLUMN
        if (currentColumn.id === prevColumn.id) {
            const oldIndex = currentColumn.cards.findIndex(card => card.id === activeCard.id);
            const newIndex = currentColumn.cards.findIndex(card => card.id === over.id);

            currentColumn.cards = [...moveItem(currentColumn.cards, oldIndex, newIndex)]
            currentColumn.cardOrderIds = [...currentColumn.cards.map(card => card.id)]
        } else {
            moveCardBetweenColumns(
                activeCard,
                prevColumn,
                currentColumn,
                active,
                over
            )
        }
    }

    if (!isCard(activeItem)) {
        if (active.id !== over.id) {
            const oldIndex = columnList.findIndex(column => column.id === active.id);
            const newIndex = columnList.findIndex(column => column.id === over.id);

            const newColumnList = [...moveItem(columnList, oldIndex, newIndex)]
            setColumnList(newColumnList)
            setColumnOrder([...newColumnList.map(column => column.id)])
            // setColumnList((prev) => {
            //     const oldIndex = prev.findIndex(column => column.id === active.id);
            //     const newIndex = prev.findIndex(column => column.id === over.id);

            //     prev = [...moveItem(prev, oldIndex, newIndex)];
            //     setColumnOrder([...prev.map(column => column.id)])

            //     return prev
            // });
        }
    }

    setActiveItem(null)

    // PREVENT EMPTY CARD LIST BUG BY ADD EMPTY CARD
    if (hasEmptyCardList(columnList).length) {
        hasEmptyCardList(columnList).forEach(column => {
            column.cards.push({
                id: createCardId(EMPTY_CARD, column.id, column.boardId),
                boardId: column.boardId,
                columnId: column.id
            } as TCard)
            column.cardOrderIds.push(createCardId(EMPTY_CARD, column.id, column.boardId))
        })
    }
    // DELETE EMPTY CARD WHEN ADD CARD
    if (hasEmptyCard(columnList).length) {
        hasEmptyCard(columnList).forEach(column => {
            if (column.cards.length > 1) {
                remove(column.cards, card => card.id.includes(EMPTY_CARD))
                remove(column.cardOrderIds, id => id.includes(EMPTY_CARD))
            }
        })
    }
}