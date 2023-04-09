import styled from "styled-components";
import { CardProp } from "../type-info/type-interface";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { algorithms } from "../state-management/sort-algorithms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showDetail } from "../state-management/atom";




//media
const StyledCard = styled.article`
    display: flex;
    flex-direction: column;
    width: 288px;
    height: 300px;
    padding: 0 36px;
    .content-container {
        
        canvas {
            width: 100%;    
        }

        &:hover {
            background: red;
        }
    }
`

const Card = (props: CardProp) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    //canvas가 DOM에 그려진 후 가져와야함(useEffect() 안에서 할당)
    useEffect(() => {
    try {
        const canvas = canvasRef.current;
        if(canvas) {
            // const ctx = canvas.getContext('2d');
            //ctx...
        } 
        else {
            console.error('캔버스 가져오기 실패');
        }
    } catch(error) {
        console.error('컨텍스트 가져오기 실패.', error);
    }
    }, [])
    
    const path = `detail/${props.data.name.replace(' sort', '')}`;  

    // Click Detail Card
    
    const setShowDetail = useSetRecoilState(showDetail);
    const onClick = () => {
    //카드를 클릭하면 detail 렌더 유무를 결정하는 전역state변수를 true로 초기화
        setShowDetail(true);
    }

    return(
        <StyledCard onClick={onClick}>
            <Link to={path+props.index}>
                <div className="content-container">
                    <h3>{props.data.name}</h3>
                    <canvas ref={canvasRef}></canvas>
                    <span>detail</span>
                </div>
            </Link>
        </StyledCard>
    );
}

export default Card;