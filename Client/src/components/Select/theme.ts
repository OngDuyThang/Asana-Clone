import { ThemeConfig } from 'antd';
import { SelectColor } from 'types/theme';

export const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: SelectColor.light_primary,
        colorText: SelectColor.text,
    },
}

export const darkTheme: ThemeConfig = {
    token: {
        colorPrimary: SelectColor.dark_primary,
        colorText: SelectColor.text,
    },
    components: {
        Select: {
            optionSelectedColor: SelectColor.dark_text_selected
        }
    }
}