import { Container, Text, Dropdown } from 'components'
import { capitalize } from 'lodash'
import { useMemo, type FC } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { items } from './items'

interface HeaderProps {
    title: string
}

const Header: FC<HeaderProps> = ({
    title
}) => {
    const memoItems = useMemo(() => items, [])

    return (
        <Container flex justify='between' align='center'>
            <Text tag='span' fontWeight='600' fontSize='16px'>
                {capitalize(title)}
            </Text>
            <Dropdown
                items={memoItems}
                onClick={() => { }}
            >
                <FaCaretDown className='w-4 h-4' />
            </Dropdown>
        </Container>
    )
}

export default Header
