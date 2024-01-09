import { ThemeEnum } from "types/theme";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";
import { TThemeOption } from "types/select";
import { capitalize } from 'lodash'
import { CSSProperties } from "react";

const css: CSSProperties = {
    width: '12px',
    height: '12px',
}

export const themes: TThemeOption[] = [
    {
        value: ThemeEnum.light,
        text: capitalize(ThemeEnum.light),
        icon: <FaSun style={css} />
    },
    {
        value: ThemeEnum.dark,
        text: capitalize(ThemeEnum.dark),
        icon: <FaMoon style={css} />
    },
    {
        value: ThemeEnum.system,
        text: capitalize(ThemeEnum.system),
        icon: <FaDisplay style={css} />
    }
]