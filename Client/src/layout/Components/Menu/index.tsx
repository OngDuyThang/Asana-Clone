import { Text, Dropdown } from 'components'
import { type FC } from 'react'
import { TDropdownItems, TDropdownOnClick } from 'types/dropdown'
import { Space } from 'antd'
import { FaCaretDown } from 'react-icons/fa'
import { capitalize } from 'lodash'

interface MenuProps {
    label: string;
    items: TDropdownItems
    onClick: TDropdownOnClick;
}

const Menu: FC<MenuProps> = ({
    label,
    items,
    onClick
}) => {

    return (
        <Dropdown
            items={items}
            onClick={onClick}
        >
            <Space size={8} align='center' >
                <Text tag='span' fontWeight='600' fontSize='12px'>
                    {capitalize(label)}
                </Text>
                <FaCaretDown />
            </Space>
        </Dropdown>
    )
}

export default Menu
export { default as Workspace } from './Workspaces/index'
export { default as Recent } from './Recent/index'
export { default as Starred } from './Starred/index'
export { default as Templates } from './Templates/index'