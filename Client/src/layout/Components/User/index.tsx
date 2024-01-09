import { Div, Image, Dropdown } from 'components'
import { type FC } from 'react'
import { TDropdownItems } from 'types/dropdown';

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

const User: FC = () => {
    return (
        <Dropdown
            items={items}
            onClick={() => { }}
        >
            <Div className='w-[30px] h-[30px] rounded-full overflow-hidden'>
                <Image
                    src='/images/user.png'
                    alt='avatar'
                    fit="cover"
                />
            </Div>
        </Dropdown>
    )
}

export default User
