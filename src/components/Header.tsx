import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDark } from "../state-management/atom";

const StyledHeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 130px 100px;


    @media screen and (max-width: 845px) {
        padding: 30px 80px;
        margin-bottom: 3rem;
        .header-toggle {
            scale: .8;
            span { display: none; }
            div {
                width: 50px;
            }
            
        }
    }

    @media screen and (max-width: 480px) {
        padding: 30px 20px;
        .header-toggle {
            scale: .8;
            span { display: none; }
            div {
                width: 50px;
            }
            
        }
    }
`

const StyledHeaderInner = styled.div<PropsType>`
    display: flex;
    flex-direction: row;
    h1 {
        position: relative;
        &:hover {
            ::after{opacity: 1}
        }
    }
    
    span {
        font-size: 26px;
    }
    .bubble-bar {
        margin: 0 2rem;
    }
    .infomation::after {
        display: block;
        content: "";
        margin-top: .3rem;
        width: auto;
        height: 2px;
        background-color: ${props => props.theme.color};
        opacity: ${props => props.path === '/infomation' ? 1 : 0};
    }
    .infomation {
        &:hover {
            ::after{opacity: 1;}
        }
    }

    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        .header-title {
            span {
                display: none;
            }
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        .bubble-bar {
            display: none;
        }
        .infomation {
            font-size: 1.8rem;
        }
        .infomation::after {
            display: block;
            content: "";
            margin-top: .2rem;
            width: 140px;
            height: 1px;
            background-color: ${props => props.theme.color};
            opacity: ${props => props.path === '/infomation' ? 1 : 0};
        }
    }

    @media screen and (max-width: 845px) {
        display: flex;
        flex-direction: column;
        .header-title {
            span {
                display: none;
            }
            font-size: 20px;
            margin-bottom: 1rem;
        }
        .bubble-bar {
            display: none;
        }
        .infomation {
            font-size: 18px;
        }
        .infomation::after {
            display: block;
            content: "";
            margin-top: .2rem;
            width: 88px;
            height: 1px;
            background-color: ${props => props.theme.color};
            opacity: ${props => props.path === '/infomation' ? 1 : 0};
        }
    }

    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        .header-title {
            span {
                display: none;
            }
            font-size: 20px;
            margin-bottom: 1rem;
        }
        .bubble-bar {
            display: none;
        }
        .infomation {
            font-size: 18px;
        }
        .infomation::after {
            display: block;
            content: "";
            margin-top: .2rem;
            width: 88px;
            height: 1px;
            background-color: ${props => props.theme.color};
            opacity: ${props => props.path === '/infomation' ? 1 : 0};
        }
    }
`

interface PropsType {
    path: string
}


const Header = (props: PropsType) => {
    const currentMode = useRecoilValue(isDark);
    const mode_ = currentMode === true ? 'dark' : 'light';
    const [mode, setMode] = useState<Mode | undefined>(mode_);
    const setRecoilFn: (mode: boolean) => void = useSetRecoilState(isDark);
    
    return(
        <StyledHeaderContainer>
            <StyledHeaderInner path={props.path}>
                <Link to={"/"}><h1 className="header-title"><span>Sorting</span> Algorithm Visualization</h1></Link>
                <span className="bubble-bar">||</span>
                <Link to={"/infomation"}><span className="infomation">Infomation</span></Link>
            </StyledHeaderInner>

            <div className="header-toggle">
            <DarkModeToggle
            mode={mode}
            dark="Dark"
            light="Light"
            size="sm"
            inactiveTrackColor="#ffffff"
            inactiveTrackColorOnHover="#ffffff"
            inactiveTrackColorOnActive="#ffffff"
            activeTrackColor="#000000"
            activeTrackColorOnHover="#000000"
            activeTrackColorOnActive="#000000"
            inactiveThumbColor="#000000"
            activeThumbColor="#ffffff"
            onChange={(mode) => {
                setMode(mode);
                if(mode === 'dark') { setRecoilFn(true) }
                else { setRecoilFn(false) }
            }}/>
            </div>
            
        </StyledHeaderContainer>
    );
}

export default Header;
