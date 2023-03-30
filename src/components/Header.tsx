import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeOff, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";


const StyledHeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 130px 100px;
`

const StyledHeaderInner = styled.div<PropsType>`
    display: flex;
    flex-direction: row;
    h1 {
        position: relative;
        font-size: x-large; 
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
        background-color: #ffffff;
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
        background-color: #ffffff;
        opacity: ${props => props.path === '/' ? 0 : 1};
    }
    .infomation {
        &:hover {
            ::after{opacity: 1;}
        }
    }
`
const StyledSetting = styled.div`
    display: flex;
`


interface PropsType {
    path: string
}

const Header = (props: PropsType) => {
    const [isMute, setIsMute] = useState(true);
    const [mode, setMode] = useState<Mode | undefined>('dark');

    const onClick = () => {
        setIsMute((current) => !current);
    }
    return(
        <StyledHeaderContainer>
            <StyledHeaderInner path={props.path}>
                <Link to={"/"}><h1>Sorting Algorithm Visualization</h1></Link>
                <span className="bubble-bar">||</span>
                <Link to={"/infomation"}><span className="infomation">Infomation</span></Link>
            </StyledHeaderInner>

            <StyledSetting>
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
                  console.log(mode);
                }}
                />
            </StyledSetting>
        </StyledHeaderContainer>
    );
}

export default Header;

/**
 * <span className="mute-toggle" onClick={onClick}> <FontAwesomeIcon icon={isMute ? faVolumeOff : faVolumeHigh} /> </span>
 */