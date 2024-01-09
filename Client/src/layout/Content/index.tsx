import type { FC, ReactNode } from "react";
import { AntdContent } from "layout";
import { useValueByTheme } from "hooks";
import { DarkColor } from "types/theme";

interface ContentProps {
    children: ReactNode;
    className?: string
}

const Content: FC<ContentProps> = ({
    children,
    className
}) => {
    const bgColor = useValueByTheme('#fff', DarkColor.boardbar)

    return (
        <AntdContent className={className}
            style={{ background: bgColor }}
        >
            {children}
        </AntdContent>
    )
}

export default Content