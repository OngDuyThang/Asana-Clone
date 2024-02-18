import { Button } from 'components'
import { useAppSelector } from 'hooks';
import { capitalize } from 'lodash';
import CreateBoardForm from 'modules/Dashboard/Components/CreateBoardForm';
import { useState, type FC, useEffect } from 'react'
import { MdAddToPhotos } from "react-icons/md";

const AddBoard: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { isSession } = useAppSelector(state => state.user)

    useEffect(() => {
        if (isSession) setIsOpen(false)
    }, [isSession])

    return (
        <>
            <CreateBoardForm
                open={isOpen}
                handleCancel={() => { setIsOpen(false) }}
            />
            <Button fontSize='12px' fontWeight='600'
                onClick={() => { setIsOpen(true) }}
                icon={<MdAddToPhotos />}
                isHeaderButton
            >
                {capitalize('create board')}
            </Button>
        </>
    )
}

export default AddBoard
