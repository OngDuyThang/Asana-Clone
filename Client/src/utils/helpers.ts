import { some, has } from "lodash"

export const sortByOrder = (
    objectArr: any[],
    orderRule: string[],
    key: string,
) => {
    if (!objectArr.length || !orderRule.length || some(objectArr, item => !has(item, key))) {
        return objectArr
    }
    return [...objectArr].sort((a, b) =>
        orderRule.indexOf(a?.[key]) - orderRule.indexOf(b?.[key])
    )
}