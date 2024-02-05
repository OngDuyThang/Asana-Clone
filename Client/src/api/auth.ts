import { TApiResponse } from "types/api"
import { axiosInstance } from "./axios"
import { SigninResponseDto, TCredentialSignin } from "types/auth"

export const signin = async (
    credential: TCredentialSignin
): Promise<TApiResponse<SigninResponseDto>> => {
    const { data } = await axiosInstance.post('/auth/signin', {
        ...credential
    })
    return data
}