import { Button, Container } from 'components'
import { type FC } from 'react'
import { MdAddBox } from "react-icons/md";
import { GrDrag } from "react-icons/gr";
import { capitalize } from 'lodash';

const Footer: FC = () => {
    return (
        <Container flex justify='between' align='center'>
            <Button
                onClick={() => { console.log('click') }}
                icon={<MdAddBox className='w-4 h-4' />}
                fontWeight='600'
            >
                {capitalize('add new card')}
            </Button>
            <GrDrag className='w-4 h-4 cursor-pointer' />
        </Container>
    )
}

export default Footer
