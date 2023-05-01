import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentSort, isDark, isModalOpen } from "../state-management/atom";
import { getAlgorithms } from "../scripts/sort-algorithms";
import { faXmark, faPlay, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/*  =============================================== React Component ===============================================  */
const Canvas = () => {
    let array: number[] = [];
    // 무작위로 섞는 함수(Math.random())
    const shuffle = (array: number[]) => {
        array.sort(() => Math.random() - 0.5);
    }
    // 무작위로 섞인 number들을 배열에 할당하는 함수(count: 생성할 배열의 길이)
    const makeRandomArray = (count: number) => {
        array = [];
        for (let i = 1; i <= count; i++) {
            array.push(i);
        }
        shuffle(array);
    }
    const [canvasWidth, canvasHeight] = [1200, 800];
    const [count, setCount] = useState(100);
    // let run: boolean = false;
    const runRef = useRef<boolean>(false);
    const isDarkMode = useRecoilValue(isDark);
    const setIsOpen = useSetRecoilState(isModalOpen);
    const algorithms = useRecoilValue(getAlgorithms);
    const index = useRecoilValue(currentSort);
    const sortIndex = useRecoilValue(currentSort);
    // Web Audio API (정렬 사운드 생성)
    const audioContext: AudioContext | null = new AudioContext();
    // let context: CanvasRenderingContext2D | null;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);


    // HTMLCanvas 그리기 함수
    const draw = (ctx: CanvasRenderingContext2D | null, arr: number[]) => {
        // canvas 크기
        const [width, height] = [canvasWidth, canvasHeight];
        // 배열의 최댓값
        const maxValue = Math.max(...arr);
        // 막대의 width
        const barWidth = (width / arr.length);
        if (ctx !== null) {
            ctx.fillStyle = isDarkMode ? 'white' : 'black';
            ctx.clearRect(0, 0, width, height); //새로 그리기전 화면 비우기
            for (let i = 0; i < arr.length; i++) {
                // 높이를 계산할 비율을 계산
                const ratio = height / maxValue;
                // 막대의 높이
                const barHeight = ratio * arr[i];
                const [x, y] = [i * barWidth, height - barHeight];
                ctx.fillRect(x - 1, y, barWidth - 1, barHeight);
            }
        }
    }
    // delay
    const setTimeoutPromise = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    // swap
    const swap = (array: number[], i: number, j: number) => {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    // sorting sound make function
    const playSound = (frequency: number, time: number) => {
        if (!audioContext) return;
        const oscillator = audioContext.createOscillator();
        oscillator!.type = "triangle";
        oscillator.frequency.value = 24.5 * frequency;

        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.025;
        // gainNode.gain.linearRampToValueAtTime(0, 200);

        //connect 
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();

        setTimeout(() => {
            oscillator.stop();
            oscillator.disconnect();
            gainNode.disconnect();
        }, audioContext.currentTime + time);
    }

    /* 정렬 및 시각화 함수들 */
    const bubble = async () => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (!runRef.current) return; //중복실행 방지 및 셔플시 취소
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1);
                }
                await setTimeoutPromise(10);
                playSound(array[j], 10);
                draw(contextRef.current, array);
            }
        }
    }
    //2
    const selection = async () => {
        for (let i = 0; i < array.length; i++) {
            let min = i;
            for (let j = i + 1; j < array.length; j++) {
                if (!runRef.current) return; // 중복실행 방지 및 셔플시 취소
                if (array[min] > array[j]) {
                    min = j;
                    await setTimeoutPromise(10);
                    playSound(array[min], 10);
                    draw(contextRef.current, array);
                }
            }
            if (i !== min) {
                [array[i], array[min]] = [array[min], array[i]];
                playSound(array[min], 10);
                draw(contextRef.current, array);

            }
            await setTimeoutPromise(10);
            playSound(array[min], 10);
            draw(contextRef.current, array);
        }
    }
    //3
    const insertion = async () => {
        let i, j, key;
        for (i = 1; i < array.length; i++) {
            key = array[i];
            j = i - 1;

            while (j >= 0 && array[j] > key) {
                if (!runRef.current) return; //중복실행 방지 및 셔플시 취소

                array[j + 1] = array[j];
                j = j - 1;
                await setTimeoutPromise(10);
                playSound(array[j + 1], 10);
                draw(contextRef.current, array);
            }
            array[j + 1] = key;
            await setTimeoutPromise(10);
            playSound(array[j + 1], 10);
            draw(contextRef.current, array);
        }
    }
    //4
    const temp = new Array<number>(count);
    async function mergeSort(array: number[], start: number, end: number) {
        if (!runRef.current) return;
        await setTimeoutPromise(10);
        if (start < end) {
            const mid = (start + end) >> 1;
            await mergeSort(array, start, mid);
            await mergeSort(array, mid + 1, end);
            await merge(array, start, mid, end);
            playSound(array[end], 10)
            draw(contextRef.current, array);
        }

        async function merge(array: number[], start: number, mid: number, end: number) {
            if (!runRef) return;
            await setTimeoutPromise(10);
            let index = start;
            let leftIndex = start;
            let rightIndex = mid + 1;
            while (leftIndex <= mid && rightIndex <= end) {
                if (array[leftIndex] < array[rightIndex]) {
                    temp[index] = array[leftIndex];
                    leftIndex++;
                }
                else {
                    temp[index] = array[rightIndex];
                    rightIndex++;
                }
                index++;
            }
            if (leftIndex > mid) {
                for (let i = rightIndex; i <= end; i++) {
                    temp[index] = array[i];
                    index++;
                }
            }
            else {
                for (let i = leftIndex; i <= mid; i++) {
                    temp[index] = array[i];
                    index++;
                }
            }
            index = start;
            while (index <= end) {
                array[index] = temp[index];
                index++;
            }
        }
    }
    //5
    async function heapSort(array: number[]) {
        const len = array.length;
        let lastIndex = len - 1;
        //build heap
        for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
            if (!runRef.current) return; // 중복실행 방지 및 셔플시 취소
            await setTimeoutPromise(10);
            heapify(array, len, i);
            draw(contextRef.current, array);
        }
        //sort
        while (lastIndex > 0) {
            if (!runRef.current) return; // 중복실행 방지 및 셔플시 취소
            await setTimeoutPromise(10);
            swap(array, 0, lastIndex);
            heapify(array, lastIndex, 0);
            lastIndex--;
            draw(contextRef.current, array);
        }
        function heapify(array: number[], range: number, index: number) {
            if (!runRef.current) return; // 중복실행 방지 및 셔플시 취소
            let largest = index;
            const l = (index * 2) + 1;
            const r = (index * 2) + 2;

            if (l < range && array[largest] < array[l]) { largest = l; }
            if (r < range && array[largest] < array[r]) { largest = r; }

            if (largest !== index) {
                swap(array, index, largest);
                heapify(array, range, largest);
                setTimeoutPromise(10);
                playSound(array[largest], 10);
                draw(contextRef.current, array);
            }
            setTimeoutPromise(10);
            playSound(array[largest], 10);
            draw(contextRef.current, array);
        }
    }
    //6
    async function quickSort(array: number[], start: number, end: number) {
        if (!runRef.current) return; //중복실행 방지 및 셔플시 취소
        if (start < end) {
            let pivot = await partition(array, start, end);

            await setTimeoutPromise(10);
            await quickSort(array, start, pivot - 1);
            await setTimeoutPromise(10);
            await quickSort(array, pivot + 1, end);

            draw(contextRef.current, array);
        }
        async function partition(array: number[], start: number, end: number) {
            if (!runRef.current) return 0; //중복실행 방지 및 셔플시 취소
            let pivot = array[end];
            let i = (start - 1);
            for (let j = start; j <= end - 1; j++) {
                if (!runRef.current) return 0; //중복실행 방지 및 셔플시 취소
                if (array[j] < pivot) {
                    i++;
                    swap(array, i, j);
                    await setTimeoutPromise(10);
                    playSound(array[i], 10);
                    draw(contextRef.current, array);
                }
            }
            swap(array, i + 1, end);
            playSound(array[end], 10);
            draw(contextRef.current, array);
            return (i + 1);
        }
    }
    //7
    async function radixSort(arr: number[]) {
        const maxNum = Math.max(...arr);
        const maxLength = maxNum.toString().length;

        function getDigit(num: number, digit: number, maxNum: number): number {
            const base = 10 ** digit;
            const normalized = Math.abs(num) % (base * 10);
            const result = Math.floor(normalized / base);
            return result + ((num < 0) ? 9 : 0);
        }

        let buckets: number[][] = Array.from({ length: 10 }, () => []);

        for (let i = 0; i < maxLength; i++) {
            for (let j = 0; j < arr.length; j++) {
                const element = arr[j];
                const digit = getDigit(element, i, maxNum);
                buckets[digit].push(element);
            }

            let index = 0
            for (let k = 0; k < buckets.length; k++) {
                const bucket = buckets[k];
                for (let l = 0; l < bucket.length; l++) {
                    await setTimeoutPromise(10);
                    arr[index++] = bucket[l];
                    playSound(bucket[l], 10);
                    draw(contextRef.current, array);
                }
            }
            draw(contextRef.current, array);
            buckets = Array.from({ length: 10 }, () => []);
        }
    }
    //8
    async function shellSort(arr: number[]) {
        let n = arr.length;
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i += 1) {
                let temp = arr[i];
                let j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    if (!runRef.current) return;
                    arr[j] = arr[j - gap];
                    await setTimeoutPromise(10);
                    draw(contextRef.current, array);
                }
                arr[j] = temp;
                await setTimeoutPromise(10);
                playSound(arr[j], 10);
                draw(contextRef.current, array);
            }
        }
    }
    //9
    async function countingSort(arr: number[]) {
        const maxValue = Math.max(...arr);
        const countArr: number[] = Array(maxValue);
        countArr.fill(0);

        for (let i = 0; i < arr.length; i++) {
            if (!runRef.current) return;
            countArr[arr[i]]++;
        }
        array = [];
        draw(contextRef.current, array);
        for (let j = 0; j < countArr.length; j++) {
            if (countArr[j] !== 0) {
                for (let k = 0; k < countArr[j]; k++) {
                    if (!runRef.current) return;
                    await setTimeoutPromise(10);
                    array.push(j);
                    playSound(array.length, 10);
                    draw(contextRef.current, array);
                }
            }
        }
        draw(contextRef.current, array);
    }
    
    
    // x button click
    const onClickClose = () => {
        runRef.current = false
        setIsOpen(false);
    }
    // shuffle button click
    const onClickShuffle = () => {
        runRef.current = false;
        shuffle(array);
        draw(contextRef.current, array);
    }
    // play button click
    const onClickPlay = async () => {
        const isRun = runRef.current;
        if(isRun) return;
        runRef.current = true;
        switch (sortIndex) {
            case 0:
                await bubble();
                break;
            case 1:
                await selection();
                break;
            case 2:
                await insertion();
                break;
            case 3:
                await mergeSort(array, 0, array.length - 1);
                break;
            case 4:
                await heapSort(array);
                break;
            case 5:
                await quickSort(array, 0, array.length - 1);
                break;
            case 6:
                await radixSort(array);
                break;
            case 7:
                await shellSort(array);
                break;
            case 8:
                await countingSort(array);
                break;
            default:
                console.error('아직 정렬알고리즘이 할당되지 않음');
        }
        runRef.current = false;
    }

    // canvas가 mount되면 context 초기화 and 배열 할당
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) { return }
    
        contextRef.current = canvas.getContext('2d');
        return () => {
            runRef.current = false;
        }
    }, [count, runRef])

    //initial
    makeRandomArray(count); //정렬 데이터 생성
    setTimeout(() => {
        draw(contextRef.current, array);
    }, 50)

    return (
        <StyledCanvasContainer>
            <div className="header-container">
                <div className="title-and-delay">
                    <div className="sort-name">{algorithms[index].name.toUpperCase()} SORT</div> {/* 정렬알고리즘 이름  */}
                    <span>10ms delay</span>
                </div>
                <div className="control-and-close">

                    <StyledSlider>
                        <div>elements: {count}</div>
                        <input
                            type="range"
                            min={50}
                            max={500}
                            step={10}
                            value={count}
                            onChange={event => {
                                setCount(event.target.valueAsNumber);
                                makeRandomArray(count);
                                draw(contextRef.current, array);
                            }}
                        />
                    </StyledSlider>

                    <FontAwesomeIcon className="close" onClick={onClickClose} icon={faXmark} /> {/* x button  */}
                </div>
            </div>
            <div className="func-container">
                <FontAwesomeIcon className="play" onClick={onClickPlay} icon={faPlay} /> {/* play button */}
                <FontAwesomeIcon className="shuffle" onClick={onClickShuffle} icon={faShuffle} /> {/* shuffle button */}
            </div>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
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
        
        .title-and-delay {
            display: flex;
            flex-direction: row;
            .sort-name {
                margin-right: 1rem;
            }
            span {
                font-size: small;
                line-height: 2.5;
            }
        }
        .control-and-close {
            .close {
                margin-left: 3rem;
            }
        }
    }
    svg {
        font-size: 1.5rem;
        &:hover {
            color: ${props => props.theme.accent};
        }
    }
    .func-container {
        margin-bottom: 1rem;
        .play {
            margin-right: 1rem;
        }
    }
    
    canvas {
        margin: 0 auto;
        width: 100%;
        height: 350px;
    }
`
const StyledSlider = styled.div`
    @media (max-width: 1100px) {
        display: none;
    }
    div {
        margin-bottom: .5rem;
    }
    display: inline-block;
    input {
        height: 10px;
        border-radius: 8px;
        accent-color: ${props => props.theme.color};
    }
`