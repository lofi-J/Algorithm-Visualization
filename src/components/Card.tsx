import styled from "styled-components";
import { CardProp } from "../type-info/type-interface";


//media
const StyledCard = styled.article`
    display: flex;
    flex-direction: column;
    width: 288px;
    height: 300px;
    padding: 0 36px;
    //temp
    background-color: gray;
    //
    .content-container {
        
        canvas {
            width: 100%;    
        }
    }
`

const Card = (props: CardProp) => {
    return(
        <StyledCard>
            <div className="content-container">
                <h3>{props.title}</h3>
                <div className="canvas-container">canvas<canvas id="canvas"></canvas></div>
                <span>infomation</span>
            </div>
        </StyledCard>
    );
}

export default Card;

/* 받아야할 데이터 

1. 정렬 알고리즘 이름
2. canvas에 그릴 이미지 데이터
3. 데이터 크기

*/