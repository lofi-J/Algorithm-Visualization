import styled from "styled-components";
import { faMobileButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { isDark } from "../state-management/atom";

const StyledScreenOrientationAlert = styled.div`
    padding: 1.5rem 0;
    div {
        display: flex;
        flex-direction: column;
    }
    svg {
        font-size: xx-large;
        color: ${props => props.theme.color};
        rotate: -30deg;
        margin-bottom: 1rem;
    }
`

const ScreenOrientationAlert = () => {
    const isDarkMode = useRecoilValue(isDark);
    console.log(isDarkMode);
    return(
        <StyledScreenOrientationAlert>
            <div>
                <FontAwesomeIcon icon={faMobileButton} />
                <span>Please rotate your device</span>
            </div>
        </StyledScreenOrientationAlert>
    );
}

export default ScreenOrientationAlert;