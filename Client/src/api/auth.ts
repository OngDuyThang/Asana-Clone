import { TApiResponse } from "types/api"
import { axiosClient } from "./axios"
import { SigninResponseDto, TCredentialSignin } from "types/auth"

export const signin = async (
    credential: TCredentialSignin
): Promise<TApiResponse<SigninResponseDto>> => {
    const { data } = await axiosClient.post('/auth/signin', {
        ...credential
    })
    return data
}