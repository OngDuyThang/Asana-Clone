import { ThemeConfig } from "antd";
import { DrawerColor } from "types/theme";

export const lightTheme: ThemeConfig = {
    token: {
        colorBgElevated: DrawerColor.light_bg,
        colorText: DrawerColor.light_text
    }
}

export const darkTheme: ThemeConfig = {
    token: {
        colorBgElevated: DrawerColor.dark_bg,
        colorText: DrawerColor.dark_text
    }
}