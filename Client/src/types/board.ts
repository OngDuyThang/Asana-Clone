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

export enum BoardApiKey {
    GET = 'GET_BOARDS',
    POST = 'POST_BOARD',
    GET_BY_ID = 'GET_BOARD_BY_ID',
    UPDATE = 'UPDATE_BOARD',
    PATCH = 'PATCH_BOARD',
    DELETE = 'DELETE_BOARD'
}