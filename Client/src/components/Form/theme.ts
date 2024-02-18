import { ThemeConfig } from "antd";
import { FormColor } from "types/theme";

export const lightTheme: ThemeConfig = {
    components: {
        Form: {
            labelColor: FormColor.light_text,
            colorText: FormColor.light_text
        },
        Checkbox: {
            colorText: FormColor.light_text
        }
    }
}

export const darkTheme: ThemeConfig = {
    components: {
        Form: {
            labelColor: FormColor.dark_text,
            colorText: FormColor.dark_text
        },
        Checkbox: {
            colorText: FormColor.dark_text
        }
    }
}