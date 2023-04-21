import styled from "styled-components";
import { CardProp } from "../type-info/type-interface";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDark, isModalOpen } from "../state-management/atom";




//media
const StyledCard = styled.article`
    display: flex;
    flex-direction: column;
    width: 288px;
    height: 300px;
    padding: 0 36px;
    
    h3 {
        margin-bottom: 1rem;
    }
    .content-container {
        /* border: 1px solid white;
        border-radius: 2px; */
        canvas {
            width: 100%;    
        }

        &:hover {
            
        }
    }
`

const Card = (props: CardProp) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDarkMode = useRecoilValue(isDark); // 다크모드 감지
    const [canvasWidth, canvasHeight] = [800, 600]; // canvas 크기
    let array: number[] = props.data.arr;

    // HTMLCanvas 그리기 함수
    const draw = (ctx: CanvasRenderingContext2D | null, arr: number[], isDark: boolean) => {
        const array = arr;
        
        // canvas 크기
        const [width, height] = [canvasWidth, canvasHeight];
        // 배열의 최댓값
        const maxValue = Math.max(...array);
        // 막대의 width
        const barWidth = (width / array.length);

        if(ctx !== null) {
            ctx.fillStyle = isDark ? 'white' : 'black';
            ctx.clearRect(0, 0, width, height); //새로 그리기전 화면 비우기
            for(let i = 0; i < array.length; i++) {
                // 높이를 계산할 비율을 계산
                const ratio = height / maxValue;
                // 막대의 높이
                const barHeight = ratio * array[i];
                const [x, y] = [i * barWidth, height - barHeight];
                ctx.fillRect(x-1, y, barWidth-1, barHeight);
            }
        }
    }
    
    //useEffect를 이용해 다크모드 on, off 마다 다시 렌더링 해줌.
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        draw(ctx, array, isDarkMode);
    }, [isDarkMode])
    
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
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
            </div>
        </StyledCard>
    );
}

export default Card;