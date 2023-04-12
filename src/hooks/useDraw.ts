import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isDark } from "../state-management/atom";

const useDraw = (ctx: CanvasRenderingContext2D | null, arr: number[]) => {
    const array = arr;
    // 다크모드 감지
    const isDarkMode = useRecoilValue(isDark);
    // canvas 크기   
    const [width, height] = [800, 600];
    // 배열의 최댓값
    const maxValue = Math.max(...array);
    // 막대의 width
    const barWidth = (width / array.length);

    if(ctx !== null) {
        ctx.fillStyle = isDarkMode ? 'white' : 'black';
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

export default useDraw;