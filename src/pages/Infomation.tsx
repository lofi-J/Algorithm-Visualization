import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";


const StyledInfomation = styled.div`
    padding: 0 100px;
`

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