import { Button } from 'components'
import { type FC } from 'react'
import { FiMenu } from "react-icons/fi";
import styles from 'layout/Header/index.module.less'

interface IProps {
    onClick: () => void
}

const OpenSider: FC<IProps> = ({ onClick }) => {
    return (
        <Button fontSize='12px' fontWeight='600'
            onClick={onClick}
            className={styles.sider}
            isHeaderButton
        >
            <FiMenu />
        </Button>
    )
}

export default OpenSider
