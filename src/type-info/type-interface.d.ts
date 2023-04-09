export interface HeaderProp {
    isHome: boolean,
    isInfomation: boolean
}

export interface CardProp {
    onClick: () => void;
    index: number;
    data: {
        name: string;
        timeComplex: string;
    }
}

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        oppositeBgColor: string;
        color: string;
        oppositeColor: string;
    }
}

