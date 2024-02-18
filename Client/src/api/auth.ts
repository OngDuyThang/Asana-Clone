import { TApiResponse } from "types/api"
import { axiosClient } from "./axios"
import { SigninResponseDto, TCredentialSignin, TCredentialSignup } from "types/auth"

export const signin = async (
    credential: TCredentialSignin
): Promise<TApiResponse<SigninResponseDto>> => {
    const { data } = await axiosClient.post('/auth/signin', {
        ...credential
    })
    return data
}

export const signup = async (
    credential: TCredentialSignup
): Promise<TApiResponse> => {
    const formData = new FormData()
    for (const key in credential) {
        switch (key) {
            case 'avatar':
                formData.set('avatar', credential.avatar as Blob)
                break
            default:
                formData.set(key, credential[key as keyof TCredentialSignup] as string)
                break
        }
    }
    const { data } = await axiosClient.post('/auth/signup', formData)
    return data
}