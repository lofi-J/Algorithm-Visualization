import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";


const StyledHome = styled.main`
    .flex-container {
        display: flex; 
        box-sizing: border-box;
        flex-direction: column;
        text-align: center;
        margin: 0 80px;
        padding: 0 64px;

        //flex 윗 줄
        .flex-top {
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
        }
        //flex 아랫 줄
        .flex-bottom {
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
            margin-top: 26px;
        }
    }
`

const Home = () => {
    const location = useLocation();
    return (
        <>
            <Header path={location.pathname}/>
            <StyledHome>
                <div className="flex-container">
                    <div className="flex-top">
                        <Card title={'Bubble sort'} timeComplex={'O(n\u00B2)'}/>
                        <Card title={'Selection sort'} timeComplex={'O(n\u00B2)'}/>
                        <Card title={'Insertion sort'} timeComplex={'O(n\u00B2)'}/>
                        <Card title={'Merge sort'} timeComplex={'O(nlogn)'}/>
                    </div>
                    <div className="flex-bottom">
                        <Card title={'Heap sort'} timeComplex={'O(nlogn)'}/>
                        <Card title={'Quick sort'} timeComplex={'O(nlogn)'}/>
                        <Card title={'Radix sort'} timeComplex={'O(n2)'}/>
                        <Card title={'Shell sort'} timeComplex={'Depends on gap sequence'}/>
                    </div>
                </div>
            </StyledHome>
        </>
    );
}

export default Home;