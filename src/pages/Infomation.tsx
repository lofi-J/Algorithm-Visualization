import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { faWikipediaW, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const StyledInfomation = styled.div`
    display: block;
    flex-direction: column;
    padding: 0 100px;

    div {
        margin-bottom: 5rem;
        h1 {
            font-size: 26px;
            margin-bottom: 2rem;
        }
        
        li {
            font-size: 18px;
        }
        li:nth-child(1) {
            margin-bottom: .5rem;
        }

        p {
            display: inline-block;
        }
        
        svg {
            width: 25px;
        }
    }
    .link-ul>li {
        &:hover {
            cursor: pointer;
            p::after {
                opacity: 0;
            }
        }
    }
    .link-ul {
        display: inline-block;
        p::after {
            display: block;
            content: "";
            margin-top: .3rem;
            width: 100%;
            height: .5px;
            background-color: ${props => props.theme.color};
        }
    }
`


const Infomation = () => {
    const location = useLocation();

    return (
        <>
            <Header path={location.pathname}/>
            <StyledInfomation>
                <div>
                    <h1>Project introduction</h1>
                    <ul>
                        <li>
                            <p>- Visualize the process of sorting algorithms and listen to the sound of the algorithms</p>    
                        </li>
                        <li>
                            <p>- Visuals were created using the HTML Canvas API, and sorted sound was produced using the Web Audio API.</p>
                        </li>
                    </ul>
                </div>
                
                <div>
                    <h1>Tech stack used</h1>
                    <ul>
                        <li>TypeScript</li>
                        <li>React</li>
                    </ul>
                </div>

                <div>
                    <h1>References</h1>
                    <ul className="link-ul">
                        <li>
                            <a href="https://ko.wikipedia.org/wiki/%EC%A0%95%EB%A0%AC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98" rel="noreferrer" target={"_blank"}>
                                <FontAwesomeIcon icon={faWikipediaW} /> <p>정렬_알고리즘</p>
                            </a>
                        </li>
                    
                        <li>
                            <a href="https://www.youtube.com/watch?v=kPRA0W1kECg&t=140s" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faYoutube} /> <p>Timo Bingmann</p> 
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1>Project link</h1>
                    <ul className="link-ul">
                        <li>
                            <a href="https://github.com/lofi-J/Algorithm-Visualization" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faGithub} /> <p>Algorithm-Visualization</p> 
                            </a>
                        </li>
                    </ul>
                </div>
                
            </StyledInfomation>
        </>
    );
}

export default Infomation;
