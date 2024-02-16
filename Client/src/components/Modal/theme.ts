import { ThemeConfig } from 'antd';
import { ModalColor } from 'types/theme';

export const lightTheme: ThemeConfig = {
    components: {
        Modal: {
            contentBg: ModalColor.light_content_bg,
            headerBg: ModalColor.light_content_bg,
            footerBg: ModalColor.light_content_bg,
            titleColor: ModalColor.light_title
        }
    }
}

export const darkTheme: ThemeConfig = {
    components: {
        Modal: {
            contentBg: ModalColor.dark_content_bg,
            headerBg: ModalColor.dark_content_bg,
            footerBg: ModalColor.dark_content_bg,
            titleColor: ModalColor.dark_title
        }
    }
}