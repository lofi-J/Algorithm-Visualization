import { useRecoilValue } from "recoil";
import { getAlgorithms } from "../state-management/sort-algorithms"
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const ModalContainer = styled.div`
    position: absolute;
    top: 10%;
    left: auto;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

//실질적 모달창
const DialogBox = styled.dialog`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 20px ${props => props.theme.oppositeBgColor};
  box-sizing: border-box;
  background-color: ${props => props.theme.bgColor};
  z-index: 10000;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  /* background-color: rgba(0, 0, 0, 0.2); */
  background-color: rgba(0, 0, 0, 0.5);
`;

interface ModalType {
    onClickToggleModal: () => void;
}

const Modal = ({onClickToggleModal} : ModalType) => {

    //알고리즘 정보를 담고 있는 배열에 접근
    const algorithms = useRecoilValue(getAlgorithms);
    //url에 담겨있는 index를 이용해 현재 보여줘야할 객체를 타겟팅함
    const urldata = useLocation().pathname;
    const index = Number(urldata[urldata.length-1]); //현재 보여줄 정렬알고리즘이 담겨있는 index번호이다.

    
    return (
        <ModalContainer>
            <DialogBox>hello world</DialogBox>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();

                    if (onClickToggleModal) {
                        onClickToggleModal();
                    }
                }}
            />
        </ModalContainer>
    );
}

export default Modal;
