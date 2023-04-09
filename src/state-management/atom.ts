import { atom } from "recoil";

export const isDark = atom({
    key: 'isDark',
    default: true,
})

export const showDetail = atom({
    key: 'showDetail',
    default: false,
})