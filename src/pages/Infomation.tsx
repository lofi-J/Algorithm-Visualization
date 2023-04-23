import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";


const StyledInfomation = styled.div`
    padding: 0 100px;
`
//TODO : 포트폴리오용 페이지인 만큼 개발자의 정보를 담을 수 있어야함 이를 구현해야함.
const Infomation = () => {
    const location = useLocation();
    return (
        <>
            <Header path={location.pathname}/>
            <StyledInfomation>
                <h1>Infomation Page</h1>
            </StyledInfomation>
        </>
    );
}

export default Infomation;