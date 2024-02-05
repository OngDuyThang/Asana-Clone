import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SigninResponseDto } from "types/auth";

export type TUserState = SigninResponseDto & {
    isSession: boolean
}

const initialState: TUserState = {
    username: '',
    avatar: '',
    email: '',
    accessToken: '',
    isSession: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinAction(
            _state,
            action: PayloadAction<SigninResponseDto>
        ) {
            return { ...action.payload, isSession: true }
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload
        }
    }
})

export const {
    signinAction,
    setAccessToken
} = userSlice.actions
export default userSlice.reducer