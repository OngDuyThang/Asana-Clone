
import { UseQueryOptions, useQuery } from "react-query"
import { axiosClient } from "./axios"
import { BoardApiKey, MoveColumnRequest, TBoard } from "types/board"
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