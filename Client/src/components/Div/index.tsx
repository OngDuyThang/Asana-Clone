import { ReactNode, CSSProperties, forwardRef, ComponentPropsWithRef } from 'react'

interface DivProps extends ComponentPropsWithRef<'div'> {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    id?: string;
}

const Div = forwardRef<HTMLDivElement, DivProps>(({
    children,
    className,
    style,
    id,
    ...props
}, ref) => {
    return (
        <div
            className={className}
            style={style}
            id={id}
            {...props}
            ref={ref}
        >
            {children}
        </div>
    )
})

Div.displayName = 'Div'
export default Div
