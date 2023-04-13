import styled from "styled-components";
import { CardProp } from "../type-info/type-interface";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isModalOpen } from "../state-management/atom";




//media
const StyledCard = styled.article`
    display: flex;
    flex-direction: column;
    width: 288px;
    height: 300px;
    padding: 0 36px;
    
    .content-container {
        /* border: 1px solid white;
        border-radius: 2px; */
        canvas {
            width: 100%;    
        }

        &:hover {
            background: gray;
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
    
    // const path = `detail/${props.data.name.replace(' sort', '')}`;  

    // Click Card
    const setIsOpen = useSetRecoilState(isModalOpen);
    const currPath = useLocation().pathname;
    const isDetailNow = currPath.includes('/detail')
    
    useEffect(() => {
        if(isDetailNow) {
            setIsOpen(true);
        }
    }, [])

    return(
        <StyledCard onClick={props.onClick}>
            <div className="content-container">
                <h3>{props.data.name}</h3>
                <canvas ref={canvasRef}></canvas>
                <span>detail</span>
            </div>
        </StyledCard>
    );
}

export default Card;