import { TDropdownItems } from "types/dropdown";
import { MdDelete } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import { CSSProperties } from "react";
import { capitalize } from "lodash";

const iconCss: string = 'w-4 h-4'
const itemCss: CSSProperties = {
    minWidth: '120px',
    gap: '4px',
    alignItems: 'center'
}

export const items = (
    openConfirmModal: () => void
): TDropdownItems => [
        {
            label: capitalize('remove this board'),
            key: '1',
            icon: <MdDelete className={iconCss} />,
            style: itemCss,
            onClick: () => openConfirmModal()
        },
        {
            label: capitalize('archive this board'),
            key: '2',
            icon: <FaCloud className={iconCss} />,
            style: itemCss
        },
    ];