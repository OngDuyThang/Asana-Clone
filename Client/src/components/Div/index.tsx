import { ReactNode, type FC, CSSProperties } from 'react'

interface DivProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties
}

const Div: FC<DivProps> = ({
    children,
    className,
    style
}) => {
    return (
        <div className={className} style={style}>
            {children}
        </div>
    )
}

export default Div
