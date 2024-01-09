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