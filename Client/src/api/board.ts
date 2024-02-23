
import { UseQueryOptions, useQuery } from "react-query"
import { axiosClient } from "./axios"
import { BoardApiKey, CreateBoardRequest, MoveColumnRequest, TBoard, TBoardTitle } from "types/board"
import { TApiResponse } from "types/api"
import { queryCommonOptions } from "utils/api"

export const useGetBoardById = (
    id: string,
    pathname: string,
    options?: UseQueryOptions<TApiResponse<TBoard>>
) => {
    return useQuery<TApiResponse<TBoard>>(
        [BoardApiKey.GET_BY_ID, pathname],
        async () => {
            const { data } = await axiosClient.get(`/boards/${id}`)
            return data
        },
        {
            ...options,
            ...queryCommonOptions
        }
    )
}

export const moveColumn = async (
    request: MoveColumnRequest
): Promise<TApiResponse> => {
    const { data } = await axiosClient.patch(`/boards/${request.id}`, {
        columnOrderIds: request.columnOrderIds
    })
    return data
}

export const useGetAllBoards = (
    pathname: string,
    options?: UseQueryOptions<TApiResponse<TBoardTitle[]>>
) => {
    return useQuery<TApiResponse<TBoardTitle[]>>(
        [BoardApiKey.GET, pathname],
        async () => {
            const { data } = await axiosClient.get('/boards')
            return data
        },
        {
            ...options,
            ...queryCommonOptions
        }
    )
}

export const createBoard = async (
    request: CreateBoardRequest
): Promise<TApiResponse<TBoard>> => {
    const { data } = await axiosClient.post('/boards', request)
    return data
}

export const deleteBoard = async (
    id: string
): Promise<TApiResponse> => {
    const { data } = await axiosClient.delete(`/boards/${id}`)
    return data
}