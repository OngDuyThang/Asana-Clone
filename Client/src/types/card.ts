import { UploadFile } from "antd"
import { UserDto } from "./auth"

export type TCardProps = 'cover' | 'actions' | 'children'

export type TCard = {
    id: string,
    boardId: string,
    columnId: string,
    title: string,
    description: string | null,
    cover: string | null,
    memberIds: string[],
    comments: string[],
    attachments: string[]
}

export type TCardReaction = Pick<TCard, 'memberIds' | 'comments' | 'attachments'>

export const EMPTY_CARD = 'empty-card'

export type CreateCardDto = {
    title: string,
    description: string,
    cover?: File,
    columnId: string,
    boardId: string,
    members: UserDto[],
    comments: string[],
    attachments: string[]
}