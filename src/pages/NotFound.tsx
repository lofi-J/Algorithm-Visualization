import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNotFound = styled.div`
    
`

const NotFound = () => {
    return(
        <StyledNotFound>
        
        <h1>404 not found 🥲</h1>
        <hr></hr>
        <Link to='/'>return to Home Page</Link>
        </StyledNotFound>
    );
}

export default NotFound;