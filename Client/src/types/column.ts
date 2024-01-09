import { TCard } from "./card"

export type TColumn = {
    id: string,
    boardId: string,
    title: string,
    cardOrderIds: string[],
    cards: TCard[]
}