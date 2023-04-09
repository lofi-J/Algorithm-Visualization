import { useRecoilValue } from "recoil";
import { getAlgorithms } from "../state-management/sort-algorithms"
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const StyledDetail = styled.div`
    display: block;
    div{
        position: absolute;
        top: 10%;
        left: 20%;
        width: 60%;
        height: 100%;
        display: block;
        transform-origin: center top;
        transform: translateX(0px) translateY(calc(-43px + 2em)) scaleX(1) scaleY(1) translateZ(0px);
        background-color: #1f1f1f;
        border-radius: 6px;
    }
`


const Detail = () => {
    const algorithms = useRecoilValue(getAlgorithms);
    const urldata = useLocation().pathname;
    const index = Number(urldata[urldata.length-1]);
    
    return (
    <StyledDetail>
        <div>
            <h1>{algorithms[index].name}</h1>
            <p>{algorithms[index].info}</p>
        </div>
    </StyledDetail>
    );
}

export default Detail;
