import { Div, Image, Dropdown } from 'components'
import { capitalize } from 'lodash';
import { type FC } from 'react'
import { TDropdownItems } from 'types/dropdown';
import { userLogout } from 'utils/helpers';

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
        label: capitalize('log out'),
        key: '3',
        onClick: () => { userLogout() }
    },
];

const User: FC = () => {
    return (
        <Dropdown
            items={items}
            onClick={() => {}}
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
