export type TCredentialSignin = {
    username: string;
    password: string;
}

export type TCredentialSignup = {}

export type SigninResponseDto = {
    username: string,
    avatar: string,
    email: string,
    accessToken: string
}