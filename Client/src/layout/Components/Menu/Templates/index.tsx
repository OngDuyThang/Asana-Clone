import { type FC } from 'react'
import Menu from '../index'
import { TDropdownItems, TDropdownOnClick } from 'types/dropdown';

const items: TDropdownItems = [
    {
        label: '1st menu item',
        key: '1',
    },
    {
        label: '2st menu item',
        key: '2',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

const Templates: FC = () => {
    const handleClick: TDropdownOnClick = ({ key }) => {
        console.log(key)
    };

    return (
        <Menu
            label='templates'
            items={items}
            onClick={handleClick}
        />
    )
}

export default Templates
