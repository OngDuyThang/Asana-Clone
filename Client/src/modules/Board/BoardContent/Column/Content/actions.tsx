import { Space } from "antd";
import { Text } from "components";
import { MdModeComment } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { BiPaperclip } from "react-icons/bi";
import { TCardReaction } from "types/card";
import { ReactNode } from "react";

type Key = keyof TCardReaction

const Icon = (key: Key) => {
    switch (key) {
        case 'memberIds':
            return <FaUserGroup className='w-4 h-4' />
        case 'comments':
            return <MdModeComment className='w-4 h-4' />
        case 'attachments':
            return <BiPaperclip className='w-4 h-4' />
    }
}

export const actions = (data: TCardReaction) => {
    return Object.keys(data).reduce<ReactNode[]>((res, item) => {
        if (data[item as Key]?.length) {
            res.push(
                <Space key={item} size={8} align='center'>
                    {Icon(item as Key)}
                    <Text>
                        {data[item as Key].length}
                    </Text>
                </Space>
            )
        }
        return res
    }, [])
}