import { useRef } from "react";
import { atom } from "recoil";
// Header
export const isDark = atom({
    key: 'isDark',
    default: true,
})

export const isInfomation = atom({
    key: 'isInfomation',
    default: false,
})

//Card를 클릭했을 때 선택한 카드의 정렬알고리즘이 담겨있는 배열의 인덱스와 매핑
export const currentSort = atom({
    key: 'currentSort',
    default: 0,
})


export const showDetail = atom({
    key: 'showDetail',
    default: false,
})
