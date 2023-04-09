export interface HeaderProp {
    isHome: boolean,
    isInfomation: boolean
}

export interface CardProp {
    index: number;
    data: {
        name: string;
        timeComplex: string;
    }
}

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        color: string;
    }
}