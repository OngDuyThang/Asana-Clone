import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThemeEnum } from "types/theme";

export type TSystemState = {
    theme: Exclude<ThemeEnum, ThemeEnum.system>,
    systemTheme: boolean,
}

const initialState: TSystemState = {
    theme: ThemeEnum.dark,
    systemTheme: false
}

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setTheme(
            state,
            action: PayloadAction<Exclude<ThemeEnum, ThemeEnum.system>>
        ) {
            state.theme = action.payload
        },
        themeBySystem(state, action: PayloadAction<boolean>) {
            state.systemTheme = action.payload
        },
        setSystemTheme(
            state,
            action: PayloadAction<Exclude<ThemeEnum, ThemeEnum.system>>
        ) {
            if (!state.systemTheme) return
            state.theme = action.payload
        }
    }
})

export const {
    setTheme,
    themeBySystem,
    setSystemTheme
} = systemSlice.actions
export default systemSlice.reducer