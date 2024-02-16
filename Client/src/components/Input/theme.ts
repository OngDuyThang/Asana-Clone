import { ThemeConfig } from 'antd';
import { InputColor } from 'types/theme';

export const headerTheme: ThemeConfig = {
    token: {
        colorPrimary: '#ffffff',
        colorText: '#ffffff',
        colorTextPlaceholder: '#ecf0f1',
        colorBorder: '#ffffff',
        colorBgContainer: 'transparent',
        colorError: '#ffffff',
        colorErrorBorderHover: '#ffffff'
    },
}

export const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: InputColor.light_primary,
        colorText: InputColor.light_text,
        colorTextPlaceholder: InputColor.light_placeholder,
        colorBorder: InputColor.light_border,
        colorBgContainer: 'transparent',
        colorError: InputColor.light_border,
    },
}

export const darkTheme: ThemeConfig = {
    token: {
        colorPrimary: InputColor.dark_primary,
        colorText: InputColor.dark_text,
        colorTextPlaceholder: InputColor.dark_placeholder,
        colorBorder: InputColor.dark_border,
        colorBgContainer: 'transparent',
        colorError: InputColor.dark_border,
    },
}