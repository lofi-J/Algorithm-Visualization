export interface HeaderProp {
    isHome: boolean,
    isInfomation: boolean
}


declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        oppositeBgColor: string;
        color: string;
        oppositeColor: string;
        accent: string;
    }
}

