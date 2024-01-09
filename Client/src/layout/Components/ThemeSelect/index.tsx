import { Space } from "antd";
import { Option, Select, Text } from "components"
import type { FC } from "react"
import { themes } from "./options";
import { useAppDispatch } from "hooks";
import { setTheme, themeBySystem } from "store/system/slice";
import { ThemeEnum } from "types/theme";
import { FaSun } from "react-icons/fa";
import { capitalize } from "lodash";
import { FaCaretDown } from "react-icons/fa";
import { DefaultOptionType } from "antd/es/select";
import { isDarkModeSystem } from "utils/theme";

interface IProps {
    className?: string
}

const ThemeSelect: FC<IProps> = ({
    className
}) => {
    const dispatch = useAppDispatch()

    const handleSetTheme = (value: ThemeEnum) => {
        if (value !== ThemeEnum.system) {
            dispatch(themeBySystem(false))
            dispatch(setTheme(value))
        } else {
            dispatch(themeBySystem(true))
            dispatch(setTheme(!isDarkModeSystem() ? ThemeEnum.light : ThemeEnum.dark))
        }
    }

    const render = themes.map((item, index) => (
        <Option value={item.value} key={index} >
            <Space align="center" size={8} >
                {item.icon}
                <Text tag="p" fontSize="12px" fontWeight='600'>
                    {item.text}
                </Text>
            </Space>
        </Option>
    ))

    const defaultValue: DefaultOptionType = {
        value: ThemeEnum.light,
        label: (
            <Space align="center" size={8}>
                <FaSun className="w-3 h-3" />
                <Text tag="p" fontSize="12px" fontWeight='600'>
                    {capitalize(ThemeEnum.light)}
                </Text>
            </Space>
        )
    }

    return (
        <Select
            className={className}
            onChange={(e) => handleSetTheme(e)}
            defaultValue={defaultValue}
            suffixIcon={<FaCaretDown
                className='w-3 h-3'
                style={{ color: '#fff' }}
            />}
        >
            {render}
        </Select>
    )
}

export default ThemeSelect
