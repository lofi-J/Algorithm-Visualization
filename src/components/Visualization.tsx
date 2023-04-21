import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { currentSort } from "../state-management/atom";
import { getAlgorithms } from "../scripts/sort-algorithms";
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
    padding: 1rem;
`

// 설명 및 시간 복잡도 컨테이너
const StyledContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    font-size: 1.2rem;
    line-height: 1.5rem;

    .description, .time-complexity-table {
        box-sizing: border-box;
        padding: 1rem;
    }
    .description {
        margin-bottom: 1rem;
    }

    p {
        margin-bottom: 1rem;
    }

    .title {
        font-weight: 200;
        font-size: 30px;
        margin-bottom: 1.5rem;
    }
`
const StyledTable = styled.div`
    text-align: left;
    /* padding-left: 1rem; */
    /* background-color: tomato; */
    table {
        th, td {
            border: 1.5px solid;
            padding: .7rem;
            font-size: 1.3rem;
        }
        th {
            border-left: none;
        }
        td {
            border-right: none;
        }
        .average {
            border-top: none;
        }
        .space {
            border-bottom: none;
        }
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
                <Canvas /> {/* Canvas컴포넌트는 따로 구분했음 */}
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
                    
                <StyledTable className="time-complexity-table">
                    <div className="title">TIME COMPLEXITY</div>
                    <table>
                        <tbody>
                            <tr>
                                <th className="average">Average Complexity</th>
                                <td className="average">{algorithms[index].timeComplex.average}</td>
                            </tr>

                            <tr>
                                <th>Best Case</th>
                                <td>{algorithms[index].timeComplex.best}</td>
                            </tr>

                            <tr>
                                <th>Worst Case</th>
                                <td>{algorithms[index].timeComplex.worst}</td>
                            </tr>

                            <tr>
                                <th className="space">Space Complexity</th>
                                <td className="space">{algorithms[index].timeComplex.space}</td>
                            </tr>

                        </tbody>
                    </table>

                </StyledTable>
            </StyledContentContainer>
        </StyledVisualization>
    )
}

export default Visualization;