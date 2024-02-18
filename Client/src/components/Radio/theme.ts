import { ThemeConfig } from "antd";
import { RadioColor } from "types/theme";

export const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: RadioColor.light_primary,
        colorText: RadioColor.light_text
    }
}

export const darkTheme: ThemeConfig = {
    token: {
        colorPrimary: RadioColor.dark_primary,
        colorText: RadioColor.dark_text
    }
}