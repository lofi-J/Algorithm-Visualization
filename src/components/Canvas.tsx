import { useEffect, useRef, useState } from "react";
import { atom, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentSort, isDark, isModalOpen } from "../state-management/atom";
import { getAlgorithms } from "../scripts/sort-algorithms";
import { faXmark, faPlay, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


let array: number[] = [];

// 무작위로 섞는 함수(Math.random())
const shuffle = (array: number[]) => {
    array.sort(() => Math.random() - 0.5);
}
// 무작위로 섞인 number들을 배열에 할당하는 함수(count: 생성할 배열의 길이)
const makeRandomArray = (count: number) => {
    array = [];
    for(let i = 1; i <= count; i++) {
        array.push(i / 2);
    }
    shuffle(array);
}


/*  =============================================== React Component ===============================================  */
const Canvas = () => {
    const [width, height] = [800, 600]; // canvas 크기    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDarkMode = useRecoilValue(isDark); // 다크모드 감지
    const setIsOpen = useSetRecoilState(isModalOpen); //모달창 오픈 감지변수
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    let run: boolean = false;
    // 알고리즘 정보를 담고 있는 배열에 접근
    const algorithms = useRecoilValue(getAlgorithms);
    const index = useRecoilValue(currentSort);
    // 선택한 알고리즘의 인덱스
    const sortIndex = useRecoilValue(currentSort);
    

    // HTMLCanvas 그리기 함수
    const draw = (ctx: CanvasRenderingContext2D | null, arr: number[], isDark: boolean) => {
        const array = arr;
        
        // canvas 크기
        const [width, height] = [800, 600];
        // 배열의 최댓값
        const maxValue = Math.max(...array);
        // 막대의 width
        const barWidth = (width / array.length);

        if(ctx !== null) {
            ctx.fillStyle = isDark ? 'white' : 'black';
            ctx.clearRect(0, 0, width, height);
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
    // delay
    function setTimeoutPromise(ms: number){
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    

    //1
    const bubble = async (arr: number[], context: CanvasRenderingContext2D | null, isDarkMode: boolean) => {
        run = true;
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < arr.length-i-1; j++) {
                if(!run) return;
                if(arr[j] > arr[j+1]) {
                    const temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                
                    await setTimeoutPromise(10);
                    draw(context, array, isDarkMode);
                }
            }
        }
        run = false;
    }
    //2
    const selection =  async (arr: number[], context: CanvasRenderingContext2D | null, isDarkMode: boolean) => {
        for(let i = 0; i < arr.length; i++) {
            let min = i;
            for(let j = i + 1; j < arr.length; j++) {
                if(arr[min] > arr[j]) {
                    min = j;
                }
            }
            if(i != min) {
                [arr[i], arr[min]] = [arr[min], arr[i]];     
            }
            await setTimeoutPromise(10);
            draw(context, array, isDarkMode);
        }
    }

    // canvas가 mount되면 context 초기화 and 배열 할당
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) { return }

        const ctx = canvas.getContext('2d');
        setContext(ctx);
        makeRandomArray(100); //array 초기화

        draw(ctx, array, isDarkMode); //초기화면 그리기
    }, [])
    
    
    // x button click
    const onClickClose = () => {
        run = false;
        setIsOpen(false);
    }

    // play button click
    const onClickPlay = () => {
        if(run) return;

        switch(sortIndex) {
            case 0:
                bubble(array, context, isDarkMode);
                break;
            case 1:
                selection(array, context, isDarkMode);
                break;
            case 2:
                // insertion(array, context, isDarkMode);
                break;
            
            default: console.error('아직 정렬알고리즘이 할당되지 않음');
        }
    }
    // shuffle button click
    const onClickShuffle = () => {
        run = false;
        shuffle(array);
        draw(context, array, isDarkMode);
    }

    return (
        <StyledCanvasContainer>
            <div className="header-container">
                <div className="sort-name">{algorithms[index].name.toUpperCase()}</div> {/* 정렬알고리즘 이름  */}
                <FontAwesomeIcon className="close" onClick={onClickClose} icon={faXmark} /> {/* x button  */}
            </div>
            <div className="func-container">
                <FontAwesomeIcon className="play" onClick={onClickPlay} icon={faPlay} /> {/* play button */}
                <FontAwesomeIcon className="shuffle" onClick={onClickShuffle} icon={faShuffle} /> {/* shuffle button */}
            </div>
            <canvas ref={canvasRef} width={width} height={height}></canvas>
        </StyledCanvasContainer>
    );
}

export default Canvas;

const StyledCanvasContainer = styled.div`
    width: 100%;
    height: 100%;

    .header-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        .sort-name {
            font-weight: 100;
            font-size: x-large;
        }        
    }
    svg {
        font-size: 1.5rem;
        &:hover {
            color: red;
        }
    }
    .func-container {
        margin-bottom: 1rem;
        .play {
            margin-right: 1rem;
        }
    }
    /* .play, .shuffle {
        color: yellow;
    } */
    canvas {
        margin: 0 auto;
        width: 100%;
        height: 350px;
    }
`




// //3
// const insertion = (arr: number[], context: CanvasRenderingContext2D | null, isDarkMode: boolean) =>{
//     let i, j, key;
//     for(let i = 1; i < arr.length; i++) {
//         key = arr[i];
//         j = i - 1;
//         while(j >= 0 && arr[j] > key)
//         {
//             arr[j+1] = arr[j];
//             j = j-1;
//         } 
//         arr[j+1] = key;
//         draw(context, array, isDarkMode);
//     }
// }