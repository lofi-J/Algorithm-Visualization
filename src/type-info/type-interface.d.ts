export interface HeaderProp {
    isHome: boolean,
    isInfomation: boolean
}


export interface CardProp {
    onClick: () => void;
    index: number;
    data: {
        name: string;
        arr: number[];
        timeComplex: {
            average: string,
            best: string,
            worst: string,
            space: string
        }
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

