
import { UseQueryOptions, useQuery } from "react-query"
import { axiosInstance } from "./axios"
import { BoardApiKey, TBoard } from "types/board"
import { TApiResponse } from "types/api"

export const useGetBoardById = (
    pathname: string,
    options?: UseQueryOptions<TApiResponse<TBoard>>
) => {
    return useQuery<TApiResponse<TBoard>>(
        [BoardApiKey.GET_BY_ID, pathname],
        async () => {
            const { data } = await axiosInstance.get('/boards/9dcfb312-70af-4b42-9e18-682273614de9')
            return data
        },
        {
            ...options,
            retry: false
        }
    )
}