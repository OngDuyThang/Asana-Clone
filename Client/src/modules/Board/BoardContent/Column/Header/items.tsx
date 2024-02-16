import { TDropdownItems } from "types/dropdown";
import { MdAddBox, MdDelete } from "react-icons/md";
import { FaCut, FaCopy, FaPaste, FaCloud } from "react-icons/fa";
import { CSSProperties } from "react";
import { UseMutateFunction } from "react-query";
import { TApiResponse } from "types/api";

const iconCss: string = 'w-4 h-4'
const itemCss: CSSProperties = {
    minWidth: '120px',
    gap: '4px',
    alignItems: 'center'
}

type DeleteApi = UseMutateFunction<TApiResponse, unknown, string, unknown>

export const items = (
    columnId: string,
    deleteColumn: DeleteApi,
): TDropdownItems => [
        {
            label: 'Add new',
            key: '1',
            icon: <MdAddBox className={iconCss} />,
            style: itemCss
        },
        {
            label: 'Cut',
            key: '2',
            icon: <FaCut className={iconCss} />,
            style: {
                gap: '4px'
            }
        },
        {
            label: 'Copy',
            key: '3',
            icon: <FaCopy className={iconCss} />,
            style: {
                gap: '4px'
            }
        },
        {
            label: 'Paste',
            key: '4',
            icon: <FaPaste className={iconCss} />,
            style: {
                gap: '4px'
            }
        },
        {
            type: 'divider'
        },
        {
            label: 'Remove this column',
            key: '5',
            icon: <MdDelete className={iconCss} />,
            style: {
                gap: '4px'
            },
            onClick: () => deleteColumn(columnId)
        },
        {
            label: 'Archive this column',
            key: '6',
            icon: <FaCloud className={iconCss} />,
            style: {
                gap: '4px'
            }
        },
    ];