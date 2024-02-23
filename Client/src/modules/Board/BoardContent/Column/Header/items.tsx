import { TDropdownItems } from "types/dropdown";
import { MdDelete } from "react-icons/md";
import { FaCut, FaCopy, FaPaste, FaCloud } from "react-icons/fa";
import { capitalize } from "lodash";

const iconCss: string = 'w-4 h-4'

export const items = (
    openConfirmModal: () => void
): TDropdownItems => [
        {
            label: capitalize('cut'),
            key: '1',
            icon: <FaCut className={iconCss} />,
            style: {
                gap: '4px'
            }
        },
        {
            label: capitalize('copy'),
            key: '2',
            icon: <FaCopy className={iconCss} />,
            style: {
                gap: '4px'
            }
        },
        {
            label: capitalize('paste'),
            key: '3',
            icon: <FaPaste className={iconCss} />,
            style: {
                gap: '4px'
            }
        },
        {
            type: 'divider'
        },
        {
            label: capitalize('remove this column'),
            key: '4',
            icon: <MdDelete className={iconCss} />,
            style: {
                gap: '4px'
            },
            onClick: () => openConfirmModal()
        },
        {
            label: capitalize('archive this column'),
            key: '5',
            icon: <FaCloud className={iconCss} />,
            style: {
                gap: '4px'
            }
        },
    ];