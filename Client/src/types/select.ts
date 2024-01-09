import { ReactNode } from "react";
import { ThemeEnum } from "./theme";

export type TOption = {
    value: string;
    text: string;
    icon?: ReactNode
}

export type TThemeOption = TOption & {
    value: ThemeEnum;
}

export type TSelectProps = 'children' | 'onChange' | 'defaultValue' | 'suffixIcon'
export type TOptionProps = 'children' | 'value'