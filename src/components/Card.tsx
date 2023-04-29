import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDark, isModalOpen } from "../state-management/atom";
import blopSound from "../audio/blop.mp3";
import useSound from "use-sound";

const StyledCard = styled.article`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 300px;
    height: auto;
    padding: 0px 38px;
    margin-bottom: 3.5rem;
    
    @media screen and (max-width: 1100px) {
        .pre-sort {
            display: none;
        }
        canvas {
            width: 100px;
            height: 75px;
        }
    }
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
    const isDarkMode = useRecoilValue(isDark); // 다크모드 감지
    const setIsOpen = useSetRecoilState(isModalOpen);
    const [canvasWidth, canvasHeight] = [800, 600]; // canvas 크기
    let array: number[] = props.data.arr;
    const [isMouseOver, setIsMouseOver] = useState(false);

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

    //useEffect를 이용해 다크모드 on, off 마다 다시 렌더링 해줌.
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        draw(ctx, array, isDarkMode);
    }, [isDarkMode])

    
    const [playHover] = useSound(blopSound, {
        volume: 0.2,
    });
    
    const onMouseEnter = () => {
        playHover();
    }

    return(
        <StyledCard>
            <div className="contents-container" onClick={props.onClick} onMouseEnter={onMouseEnter} >
                <h3>
                    <span>{props.data.name.toUpperCase()}</span><pre className="pre-sort">  SORT</pre>
                </h3>
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} ></canvas>
            </div>
        </StyledCard>
    );
}

export default Card;