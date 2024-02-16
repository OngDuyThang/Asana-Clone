import { TApiResponse } from "types/api";
import { CreateCardDto, TCard } from "types/card";
import { axiosClient } from "./axios";

export const createCard = async (
    request: CreateCardDto
): Promise<TApiResponse<TCard>> => {
    const formData = new FormData()
    for (const key in request) {
        switch (key) {
            case 'members':
            case 'comments':
            case 'attachments':
                if (!request[key]?.length) {
                    formData.append(`${key}[]`, '')
                    break
                }
                request[key]?.forEach((item) => formData.append(`${key}[]`, item as string))
                break
            case 'cover':
                if (request.cover) formData.set('cover', request.cover)
                break
            default:
                formData.set(key, request[key as keyof CreateCardDto] as string)
                break
        }
    }
    const { data } = await axiosClient.post('/cards', formData)
    return data
}