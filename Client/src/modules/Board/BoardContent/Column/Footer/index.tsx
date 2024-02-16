import { Container } from 'components'
import { type FC } from 'react'
import AddCard from 'modules/Board/Components/AddCard';

interface FooterProps {
    columnId: string
}

const Footer: FC<FooterProps> = ({
    columnId
}) => {

    return (
        <Container flex justify='between' align='center'>
            <AddCard columnId={columnId} />
        </Container>
    )
}

export default Footer
