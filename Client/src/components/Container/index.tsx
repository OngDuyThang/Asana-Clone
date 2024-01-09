import type { CSSProperties, FC, ReactNode } from "react";
import styles from './index.module.less'
import clsx from "clsx";
import { Div } from "components";

type percen = '100' | '20' | '40' | '60' | '80' | '25' | '50' | '75' | '33' | '66'
type layout = 'start' | 'center' | 'end'
type justify = 'between' | 'evenly' | 'around'
type direction = 'row' | 'column' | 'row-reverse' | 'column-reverse'

interface ContainerProps {
    children: ReactNode;
    width?: percen;
    height?: percen;
    flex?: boolean;
    direct?: direction;
    justify?: layout | justify;
    align?: layout;
    gap?: string | number;
    className?: string;
    color?: string;
    background?: string;
    style?: CSSProperties;
}

const Container: FC<ContainerProps> = ({
    children,
    width = '100',
    height,
    flex = false,
    direct = 'row',
    justify,
    align,
    gap,
    className,
    color,
    background,
    style
}) => {
    return (
        <Div
            className={clsx(
                styles[`width-${width}`],
                height && styles[`height-${height}`],
                flex && styles.flex,
                flex && styles[`direct-${direct}`],
                justify && styles[`justify-${justify}`],
                align && styles[`align-${align}`],
                className
            )}
            style={{
                gap: `${gap}px`,
                color,
                background,
                ...style
            }}
        >
            {children}
        </Div>
    )
}

export default Container