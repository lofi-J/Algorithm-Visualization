import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { algorithms } from "../state-management/sort-algorithms";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { showDetail } from "../state-management/atom";
import Card from "../components/Card"





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

    //atom 
    const isShowDetail = useRecoilValue(showDetail);

    return (
        <>
            <Header path={location.pathname}/>

            {
                isShowDetail ? <Outlet /> : null
            }
            
            <StyledHome>
                <div className="flex-container">
                    <div className="level1 card-container">
                        {
                            level1.map((algorithm)=>(
                                <Card
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
                                index={algorithm.index}
                                key={algorithm.name}
                                data={algorithm}                               
                                />
                            ))
                        }
                    </div>
                </div>
            </StyledHome>
        </>
    );
}

export default Home;