import { Active, DropAnimation, Over, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { remove } from "lodash";
import { EMPTY_CARD, TCard } from "types/card";
import { TColumn } from "types/column";

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

export const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};