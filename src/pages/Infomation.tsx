import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";


const StyledInfomation = styled.div`
    padding: 0 100px;
`
//TODO : 현재 구성한 페이지 설명 및 사용 기술 스택 정리
const Infomation = () => {
    const location = useLocation();
    return (
        <>
            <Header path={location.pathname}/>
            <StyledInfomation>
                <span>사용한 기술 스택</span>
                <span>TypeScript</span>
                <span>React</span>
            </StyledInfomation>
            <Footer />
        </>
    );
}

export default Infomation;