import { ThemeConfig } from "antd";
import { AliasToken } from "antd/es/theme/internal";
import { LightColor, DarkColor } from "types/theme";

const commonCss: Partial<AliasToken> = {
    borderRadius: 4,
}

export const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: LightColor.primary,
        ...commonCss
    },
    components: {

    },
}

export const darkTheme: ThemeConfig = {
    token: {
        colorPrimary: DarkColor.primary,
        ...commonCss
    },
    components: {

    }
}

export const isDarkModeSystem = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true
    }
    return false
}