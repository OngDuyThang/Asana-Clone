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

export const moveItem = (
    arr: any[],
    from: number,
    to: number
) => {
    const res = [...arr]
    if (from >= 0 && to < arr.length) {
        res.splice(
            to,
            0,
            res.splice(from, 1)[0]
        )
    }
    return res
}