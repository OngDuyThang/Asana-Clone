import { TColumn } from "./column"

export type TBoardAccess = 'public' | 'private'

export type TBoard = {
    id: string,
    title: string,
    description: string,
    type: TBoardAccess,
    columnOrderIds: string[],
    columns: TColumn[]
}