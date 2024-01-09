import { ThemeConfig } from 'antd';
import { ButtonColor } from 'types/theme';

export const headerTheme: ThemeConfig = {
    token: {
        colorPrimary: '#ffffff',
        colorText: '#ffffff',
        colorBorder: '#ffffff',
    },
}

export const boardbarLight: ThemeConfig = {
    token: {
        colorPrimary: ButtonColor.light_primary,
        colorText: ButtonColor.light_primary,
        colorBorder: ButtonColor.light_primary,
    },
}

export const boardbarDark: ThemeConfig = {
    token: {
        colorPrimary: '#ffffff',
        colorText: '#ffffff',
        colorBorder: '#ffffff',
    },
}

export const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: ButtonColor.light_primary,
        colorText: ButtonColor.light_text,
        colorBorder: ButtonColor.light_border,
    },
}

export const darkTheme: ThemeConfig = {
    token: {
        colorPrimary: ButtonColor.dark_primary,
        colorText: ButtonColor.dark_text,
        colorBorder: ButtonColor.dark_border,
    },
}