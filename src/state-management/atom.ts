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









export const showDetail = atom({
    key: 'showDetail',
    default: false,
})
