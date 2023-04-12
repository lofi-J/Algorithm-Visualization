import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import useDraw from "../hooks/useDraw";
import { currentSort } from "../state-management/atom";
import { getAlgorithms, array } from "../state-management/sort-algorithms";



const StyledCanvasContainer = styled.div`
    width: 100%;
    height: 100%;

    .header-container {
        display: flex;
        justify-content: space-between;
        .sort-name {
            font-weight: 100;
            font-size: x-large;
        }
    }
    
    canvas {
        margin: 0 auto;
        width: 100%;
        height: 350px;
    }
`

const Canvas = () => {
    console.log('Canvas render!!!')
    // canvas 크기
    const [width, height] = [800, 600];
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    // 알고리즘 정보를 담고 있는 배열에 접근
    const algorithms = useRecoilValue(getAlgorithms);
    const index = useRecoilValue(currentSort);
    
    useEffect( () => {
        console.log('useEffect()!!!')
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            setContext(ctx);
        }
    }, [])
    
    useDraw(context, array);
    
    return (
        <StyledCanvasContainer>
            <div className="header-container">
                <div className="sort-name">{algorithms[index].name.toUpperCase()}</div>
                <div>닫기 버튼</div>
            </div>
            {/* canvas에 직접 width, height값을 지정해 해상도를 높임 */}
            <canvas ref={canvasRef} width={width} height={height} ></canvas>
        </StyledCanvasContainer>
    );
}

export default Canvas;

