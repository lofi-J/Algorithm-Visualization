import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { isDark } from "../state-management/atom";
import blopSound from "../assets/audio/blop.mp3";
import useSound from "use-sound";

const StyledCard = styled.article`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 300px;
    height: auto;
    padding: 0px 38px;
    margin-bottom: 3.5rem;
    
    h3 {
        display: inline-block;
        margin-bottom: 1rem;
        
        span {
            display: inline-block;
            line-height: 1;
        }
        pre {
            display: inline-block;
        }
    }
    
    canvas {
        width: 80%;
    }

    .contents-container {
        display: inline-block;
        &:hover {
            cursor: pointer;
            span, pre {
                background-color: ${p => p.theme.oppositeBgColor};
                color: ${p => p.theme.oppositeColor};
            }
        }
    }

    @media screen and (max-width: 1024px) {
        h3 {
            font-size: 1.2rem;
        }
    }

    @media screen and (max-width: 845px) {
        h3 {
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 480px) {
        
        .contents-container {
            
            h3 {
                display: inline-block;
                
                font-size: 16px;
            }
            .sort-name {
                
            }
            .pre-sort {
            }
            canvas {
                /* display: none; */
            }
        }
    }
`

interface CardProp {
    onClick: () => void;
    data: {
        name: string;
        arr: number[];
        timeComplex: {
            average: string,
            best: string,
            worst: string,
            space: string
        }
    }
}

const Card = (props: CardProp) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDarkMode = useRecoilValue(isDark); // 다크모드 감지
    // const setIsOpen = useSetRecoilState(isModalOpen);
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
                ctx.fillRect(x+i, y, barWidth, barHeight);
            }
        }
    }
 
    const [playHover] = useSound(blopSound, {
        volume: 0.2,
    });
    
    const onMouseEnter = () => {
        playHover();
    }

    //useEffect를 이용해 다크모드 on, off 마다 다시 렌더링 해줌.
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        contextRef.current = canvas.getContext('2d');
    }, [isDarkMode])
    setTimeout(() => {
        draw(contextRef.current, array, isDarkMode);
    }, 50)
    
    return(
        <StyledCard>
            <div className="contents-container" onClick={props.onClick} onMouseEnter={onMouseEnter} >
                <h3>
                    <span className="sort-name">{props.data.name.toUpperCase()}</span><pre className="pre-sort">  SORT</pre>
                </h3>
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} ></canvas>
            </div>
        </StyledCard>
    );
}

export default Card;