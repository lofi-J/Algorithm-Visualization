import styled from "styled-components";
import Visualization from "./Visualization";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isModalOpen } from "../state-management/atom";
import ScreenOrientationAlert from "./ScreenOrientationAlert";

const ModalContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

//실질적 모달창
const DialogBox = styled.dialog`
    position: relative;
    width: 65%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 20px ${props => props.theme.oppositeBgColor};
    box-sizing: border-box;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.bgColor};
    z-index: 10000;
    overflow-y: auto;
    

    //FIXME mobile position is break 
    @media screen and (max-width: 850px) {
        padding: 0;    
    }
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.5);
`;


const Modal = () => {
    //모바일 환경에서 사용자의 portrait, landscape 처리
    let isLandscape_ = window.innerWidth > window.innerHeight;
    const [isLandscape, setIsLandscape] = useState(isLandscape_);

    // 모달 창이 나타나면 화면을 위로 스크롤함 
    useEffect(() => {
        window.scrollTo({ top: 100, behavior: 'smooth' });
        function handleOrientationChange() {
            setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
        }
        window.addEventListener('resize', handleOrientationChange);
        
        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, [])
    const setIsOpen = useSetRecoilState(isModalOpen);
    return (
        <ModalContainer>
            <DialogBox>
                {
                    isLandscape ? <Visualization /> : <ScreenOrientationAlert />
                }
            </DialogBox>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    setIsOpen(false);
                }}
            />
        </ModalContainer>
    );
}

export default Modal;
