import clsx from 'clsx'
import { type FC } from 'react'
import styles from '../index.module.less'

type SkeletonType = 'title' | 'text' | 'avatar' | 'thumbnail'

interface IProps {
    type: SkeletonType
    className?: string
}

const SkeletonElement: FC<IProps> = ({
    type,
    className
}) => {
    return (
        <div className={clsx(
            styles.skeleton,
            styles[type],
            className
        )}></div>
    )
}

export default SkeletonElement
