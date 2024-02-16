import { CreateColumnDto, MoveCardRequest, TColumn } from "types/column";
import { axiosClient } from "./axios";
import { TApiResponse } from "types/api";

export const createColumn = async (
    createColumnDto: CreateColumnDto
): Promise<TApiResponse<TColumn>> => {
    const { data } = await axiosClient.post('/columns', createColumnDto)
    return data
}

export const deleteColumn = async (
    id: string
): Promise<TApiResponse> => {
    const { data } = await axiosClient.delete(`/columns/${id}`)
    return data
}

export const moveCard = async (
    request: MoveCardRequest
): Promise<TApiResponse> => {
    const { data } = await axiosClient.patch('/columns', request)
    return data
}