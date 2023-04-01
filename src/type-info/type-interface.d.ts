export interface HeaderProp {
    isHome: boolean,
    isInfomation: boolean
}

export interface CardProp {
    title: string;
    timeComplex: string;
}


declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        color: string;
    }
}