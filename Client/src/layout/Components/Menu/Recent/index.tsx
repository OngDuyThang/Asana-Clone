import { type FC } from 'react'
import Menu from '../index'
import { TDropdownItems, TDropdownOnClick } from 'types/dropdown';

const items: TDropdownItems = [
    {
        label: 'Coming soon',
        key: '1',
        style: {
            fontWeight: '600'
        }
    },
    {
        label: 'Coming soon',
        key: '2',
        style: {
            fontWeight: '600'
        }
    },
    {
        label: 'Coming soon',
        key: '3',
        style: {
            fontWeight: '600'
        }
    },
];

const Recent: FC = () => {
    const handleClick: TDropdownOnClick = ({ key }) => {
        console.log(key)
    };

    return (
        <Menu
            label='recent'
            items={items}
            onClick={handleClick}
        />
    )
}

export default Recent
