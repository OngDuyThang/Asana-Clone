import { Active, DropAnimation, Over, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { remove } from "lodash";
import { EMPTY_CARD, TCard } from "types/card";
import { TColumn } from "types/column";
import { moveItem } from "./helpers";

export const moveCardSameColumn = (
    activeCard: TCard,
    currentColumn: TColumn,
    over: Over
) => {
    const oldIndex = currentColumn.cards.findIndex(card => card.id === activeCard.id);
    const newIndex = currentColumn.cards.findIndex(card => card.id === over.id);

    currentColumn.cards = [...moveItem(currentColumn.cards, oldIndex, newIndex)]
    currentColumn.cardOrderIds = [...currentColumn.cards.map(card => card.id)]
}

export const moveCardBetweenColumns = (
    activeCard: TCard,
    prevColumn: TColumn,
    currentColumn: TColumn,
    active: Active,
    over: Over
) => {
    // FIND ARRIVE INDEX OF THE CARD LIST OF THE CURRENT COLUMN BASE ON DRAG OVER ID
    // FIND INSERT INDEX TO INSERT TO THE CARD LIST OF THE CURRENT COLUMN
    const arriveIndex = currentColumn.cards.findIndex(card => card.id === over.id)
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

    // REMOVE CARD FROM THE CARD LIST OF THE PREVIOUS COLUMN
    remove(prevColumn.cards, card => card.id === activeCard.id)
    remove(prevColumn.cardOrderIds, id => id === activeCard.id)
}

export const isCard = (item: TColumn | TCard) => item.hasOwnProperty('columnId')

export const hasEmptyCardList = (columnList: TColumn[]) => columnList.filter(
    column => !column.cards.length
)

export const hasEmptyCard = (columnList: TColumn[]) => columnList.filter(
    column => column.cards.find(
        card => card.id.includes(EMPTY_CARD)
    )
)

export const createCardId = (
    format: string,
    columnId: string,
    boardId: string
) => `${format}-${columnId}-${boardId}`

export const addEmptyCard = (columnList: TColumn[]) => {
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
}

export const removeEmptyCard = (columnList: TColumn[]) => {
    if (hasEmptyCard(columnList).length) {
        hasEmptyCard(columnList).forEach(column => {
            if (column.cards.length > 1) {
                remove(column.cards, card => card.id.includes(EMPTY_CARD))
                remove(column.cardOrderIds, id => id.includes(EMPTY_CARD))
            }
        })
    }
}

export const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

export const validateEmptyCard = (ids: string[]) => {
    remove(ids, id => id.includes(EMPTY_CARD))
    return ids
}