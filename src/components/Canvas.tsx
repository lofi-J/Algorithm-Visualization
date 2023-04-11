import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { currentSort } from "../state-management/atom";
import { getAlgorithms } from "../state-management/sort-algorithms";



const Canvas = () => {
    // 알고리즘 정보를 담고 있는 배열에 접근
    const algorithms = useRecoilValue(getAlgorithms);
    const index = useRecoilValue(currentSort);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    

    return <canvas ref={canvasRef}></canvas>
}

export default Canvas;