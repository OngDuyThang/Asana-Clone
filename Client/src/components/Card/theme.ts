import { ThemeConfig } from 'antd';
import { CardColor } from 'types/theme';

export const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: CardColor.light_primary,
        colorBgContainer: CardColor.light_card,
        colorText: CardColor.light_text
    },
}

export const darkTheme: ThemeConfig = {
    token: {
        colorPrimary: CardColor.dark_primary,
        colorBgContainer: CardColor.dark_card,
        colorText: CardColor.dark_text,
    },
}