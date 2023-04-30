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

    @media (max-width: 1100px){
        h1 {
            font-size: x-large;
        }
        .bubble-bar, .infomation, input, span {
            display: none;
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
    h1::after {
        display: block;
        content: "";
        margin-top: .3rem;
        width: 100%;
        height: 2px;
        background-color: ${props => props.theme.color};
        opacity: ${props => props.path === '/' ? 1 : 0}
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
        width: 100%;
        height: 2px;
        background-color: ${props => props.theme.color};
        opacity: ${props => props.path === '/infomation' ? 1 : 0};
    }
    .infomation {
        &:hover {
            ::after{opacity: 1;}
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
                <Link to={"/"}><h1>Sorting Algorithm Visualization</h1></Link>
                <span className="bubble-bar">||</span>
                <Link to={"/infomation"}><span className="infomation">Infomation</span></Link>
            </StyledHeaderInner>

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
        </StyledHeaderContainer>
    );
}

export default Header;

/**
 * <span className="mute-toggle" onClick={onClick}> <FontAwesomeIcon icon={isMute ? faVolumeOff : faVolumeHigh} /> </span>
 */