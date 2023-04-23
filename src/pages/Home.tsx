import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentSort, isModalOpen } from "../state-management/atom";
import Card from "../components/Card"
import { useEffect } from "react";
import Modal from "../components/Modal";
import { getAlgorithms } from "../scripts/sort-algorithms";


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
/*
현재 isOpen, setIsOpen State를 통해 modal창의 render여부를 결정하고 조작하고 있음
또한 각 Card 컴포넌트는 algorithms State를 이용해 component위치에 맞는 정보를 Card컴포넌트가 제공이 가능하도록 되어있음.
onClick 함수를 콜백함수형태로 Card컴포넌트에 넘겨줌.
*/
const Home = () => {
    const location = useLocation();
    // currentSort atom 
    const setCurrentSort = useSetRecoilState(currentSort);
    const algorithms = useRecoilValue(getAlgorithms);
    
    const level1 = algorithms.slice(0, 3);
    const level2 = algorithms.slice(3, 6);
    const level3 = algorithms.slice(6, 9);

    // modal state hook 
    // const [isOpen, setIsOpen] = useState<boolean>(true);
    const isOpen = useRecoilValue(isModalOpen);
    const setIsOpen = useSetRecoilState(isModalOpen);
    // toggle modal state
    const onClickToggleModal = (index: number) => {
        setIsOpen(!isOpen); //modal open
        setCurrentSort(index);
    }
    // about scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen])

    return (
        <div>
            <Header path={location.pathname}/>

            {/* modal(Detail.tsx) */}
            {
                isOpen && <Modal />
            }

            {/*      3 * 3 형태의 flex디자인을 위해 3개씩 3번 map()를 이용했음      */}
            <StyledHome>
                <div className="flex-container">
                    <div className="level1 card-container">
                        {
                            level1.map((algorithm)=>(
                                <Card
                                onClick={() => {onClickToggleModal(algorithm.index)}}
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
                                onClick={() => {onClickToggleModal(algorithm.index)}}
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
                                onClick={() => {onClickToggleModal(algorithm.index)}}
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

