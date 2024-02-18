export type TCredentialSignin = {
    username: string,
    password: string,
}

export type TCredentialSignup = TCredentialSignin & {
    email: string,
    avatar?: File
}

export type SigninResponseDto = {
    username: string,
    avatar: string,
    email: string,
    accessToken: string
}

export type UserDto = {
    id: string,
    username: string,
    avatar: string
}