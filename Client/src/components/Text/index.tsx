import clsx from 'clsx';
import type { CSSProperties, FC, ReactNode } from 'react';

import styles from './index.module.less';

interface TextProps {
    className?: string;
    tag?: 'span' | 'p' | 'div';
    fontSize?: string;
    color?: string;
    fontWeight?: string | number;
    lineHeight?: string;
    textAlign?: string;
    textTransform?: string;
    textDecoration?: string;
    fontStyle?: string;
    opacity?: string;
    children: ReactNode;
    style?: CSSProperties;
    onClick?: () => void
}

const Text: FC<TextProps> = ({
    color,
    tag = 'div',
    fontSize,
    fontWeight,
    lineHeight,
    textTransform,
    textAlign,
    textDecoration,
    fontStyle,
    children,
    opacity,
    className,
    style,
    onClick
}) => {
    const customStyle: string | number | {} = {
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        textTransform: textTransform,
        textAlign: textAlign,
        textDecoration: textDecoration,
        fontStyle: fontStyle,
        opacity: opacity,
        ...style,
    };

    const Span = (
        <span
            style={customStyle}
            className={clsx(
                styles.span,
                className
            )}
            onClick={onClick}
        >
            {children}
        </span>
    )

    const P = (
        <p
            style={customStyle}
            className={clsx(
                styles.p,
                className
            )}
            onClick={onClick}
        >
            {children}
        </p>
    )

    const Div = (
        <div
            className={clsx(
                styles.div,
                styles['tag_' + tag],
                className
            )}
            style={customStyle}
            onClick={onClick}
        >
            {children}
        </div>
    )

    switch (tag) {
        case 'span': return Span
        case 'p': return P
        default: return Div
    }
};

export default Text;
