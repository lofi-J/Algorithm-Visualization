import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { currentSort } from "../state-management/atom";
import { getAlgorithms } from "../state-management/sort-algorithms";
import Canvas from "./Canvas";


// 부모 컴포넌트
const StyledVisualization = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`

// 캔버스 컨테이너
const StyledCanvasContainer = styled.div`
    display: block;
    width: 100%;
    height: 50%;
    background-color: tomato;
    
    /* canvas */
    canvas {
        width: 100%;
        height: 100%;
    }
`

// 설명 및 시간 복잡도 컨테이너
const StyledContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1rem;

    .description {
        display: flex;
        flex-direction: column;
        line-height: 1.5rem;
        width: 60%;

        p {
            margin: .5rem 0;
            font-size: 14px;
        }
    }
    .complexity {
        width: 40%;
        margin-left: 2rem;
    }
    .description, .complexity {
        box-sizing: border-box;
        padding: .5rem;
    }

    .title {
        font-weight: 200;
        font-size: 30px;
        margin-bottom: 1rem;
    }
`


const Visualization = () => {
    // 알고리즘 정보를 담고 있는 배열에 접근
    const algorithms = useRecoilValue(getAlgorithms);
    const index = useRecoilValue(currentSort);
    
    
    
    return (
        <StyledVisualization>
            {/* canvas와 닫기 창 */}
            <StyledCanvasContainer>
                {/* Canvas컴포넌트는 따로 구분했음(로직을 따로 분리하기위해) */}
                <Canvas />
            </StyledCanvasContainer>

            {/* 설명칸과 시간복잡도 테이블 */}
            <StyledContentContainer>
                <div className="description">
                    <div className="title">DESCRIPTION</div>
                    {
                        algorithms[index].info.map((str) => (
                             <p key={str}>{str}</p>
                        ))
                    }
                </div>
                <div className="complexity">
                    <div className="title">COMPLEXITY</div>
                </div>
            </StyledContentContainer>
        </StyledVisualization>
    )
}

export default Visualization;