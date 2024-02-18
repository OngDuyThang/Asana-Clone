import { ThemeConfig } from "antd";
import { DarkColor, LightColor } from "types/theme";

export const lightTheme: ThemeConfig = {
    token: {
        colorText: LightColor.text,
        fontSize: 18
    }
}

export const darkTheme: ThemeConfig = {
    token: {
        colorText: DarkColor.text,
        fontSize: 18
    }
}