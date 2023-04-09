import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { algorithms } from "../state-management/sort-algorithms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showDetail } from "../state-management/atom";
import Card from "../components/Card"
import { useCallback, useState } from "react";
import Detail from "../components/Modal";


const StyledHome = styled.main`
    .flex-container {
        display: flex; 
        box-sizing: border-box;
        flex-direction: column;
        text-align: center;
        margin: 0 80px;
        padding: 0 64px;

        //level1 윗 줄
        .card-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            box-sizing: border-box;
        }
    }
`

const Home = () => {
    const location = useLocation();
    
    const level1 = algorithms.slice(0, 3);
    const level2 = algorithms.slice(3, 6);
    const level3 = algorithms.slice(6, 9);

    //modal state hook 
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // toggle modal state
    const onClickToggleModal = useCallback(() => {
        console.log('onClickToggleModal!!!');
        setIsOpen(!isOpen);
      }, [isOpen]);

    return (
        <div>
            <Header path={location.pathname}/>

            {/* modal(Detail.tsx) */}
            {
                isOpen && <Detail onClickToggleModal={onClickToggleModal} />
            }

            {/*      3 * 3 형태의 flex디자인을 위해 3개씩 3번 map()를 이용했음      */}
            <StyledHome>
                <div className="flex-container">
                    <div className="level1 card-container">
                        {
                            level1.map((algorithm)=>(
                                <Card
                                onClick={onClickToggleModal}
                                index={algorithm.index}
                                key={algorithm.name}
                                data={algorithm}
                                />
                            ))
                        }
                    </div>

                    <div className="level2 card-container">
                        {
                            level2.map((algorithm)=>(
                                <Card 
                                onClick={onClickToggleModal}
                                index={algorithm.index}
                                key={algorithm.name}
                                data={algorithm}
                                />
                            ))
                        }
                    </div>

                    <div className="level3 card-container">
                        {
                            level3.map((algorithm)=>(
                                <Card 
                                onClick={onClickToggleModal}
                                index={algorithm.index}
                                key={algorithm.name}
                                data={algorithm}                               
                                />
                            ))
                        }
                    </div>
                </div>
            </StyledHome>
        </div>
    );
}

export default Home;

