import { ThemeConfig } from "antd"
import { useAppSelector } from "hooks"
import { ThemeEnum } from "types/theme"

const useValueByTheme = (
    lightVal: string | ThemeConfig,
    darkVal: string | ThemeConfig
): any => {
    const { theme: reduxTheme } = useAppSelector(state => state.system)

    switch (reduxTheme) {
        case ThemeEnum.light:
            return lightVal
        case ThemeEnum.dark:
            return darkVal
    }
}

export default useValueByTheme