import styled from "styled-components";

const StyledHome = styled.main`
    background-color: black;
    color: white;
    border: 2px solid gray;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, minmax(300px, auto));
    grid-gap: 10px;
    div{
        border: 2px solid white;

        &:hover {
            background-color: #cbffad;
        }
    }
`

const StyledArticle = styled.article`
    background-color: black;
`


const Test = () => {
    return(
        <>
            <h1>Header Component</h1>
            <StyledHome>
                <div className="card">card1</div>
                <div className="card">card2</div>
                <div className="card">card3</div>
                <div className="card">card4</div>

                <div className="card">card5</div>
                <div className="card">card6</div>
                <div className="card">card7</div>
                <div className="card">card8</div>
            </StyledHome>
        </>
    );
}
export default Test;


/**
 * main -> article -> canvas
 * article 호버시 css 이펙트 추가
 * article 클릭시 Card 컴포넌트 렌더 -> home blur 효과 
 */

/**
 * 클릭 이벤트 로직
 * 카드 컴포넌트가 무엇을 렌더할지 클릭시 데이터를 prop으로 넘겨준다
 * 카드 컴포넌트에서 데이터를 받으면 해당 컴포넌트를 렌더한다
*/