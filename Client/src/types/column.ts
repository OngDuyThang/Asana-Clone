import { TCard } from "./card"

export type TColumn = {
    id: string,
    title: string,
    boardId: string,
    cardOrderIds: string[],
    cards: TCard[]
}

export type CreateColumnDto = {
    title: string;
    boardId: string;
}

export type DeleteColumnRequest = {
    id: string,
    boardId: string
}

export type MoveCardRequest = {
    currentId: string,
    prevId: string,
    cardId: string,
    currentCardOrderIds: string[],
    prevCardOrderIds: string[]
}