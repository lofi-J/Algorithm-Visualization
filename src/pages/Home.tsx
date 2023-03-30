import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";


const StyledHome = styled.div`
    background-color: gray;
    padding: 0 100px;

    .grid-container {
        background-color: aqua;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, minmax(200px, auto));
        grid-gap: 10px;
        
        text-align: center;
        align-items: stretch;
    }
    span{
        background-color: blue;
    }
`

const Home = () => {
    const location = useLocation();
    return (
        <>
            <Header path={location.pathname}/>
            <StyledHome>
                <div className="grid-container">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                </div>
            </StyledHome>
        </>
    );
}

export default Home;