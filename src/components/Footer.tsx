import styled from "styled-components";

const StyledFooter = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 5rem;
    padding: 0 10%;
    padding-top: 5rem;
    padding-bottom: 10rem;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div {
        display: flex;
        flex-direction: column;
    }
    .footer-title {
        font-size: 25px;
        margin-bottom: 2.5rem;
    }
    .footer-content {
        font-size: 20px;
    }
    .name {
        font-size: x-large;
    }
    .email {
        margin-bottom: 1rem;
    }
    .up-btn {
        display: flex;
        justify-content: center;
        align-self: center;
        font-size: xx-large;
        width: 15px;
        height: 15px;
        box-sizing: border-box;
        border: ${props=>props.theme.bgColor} 2px solid;
        border-radius: 100%;
        padding: 1rem;
        line-height: .8;
        
        &:hover {
            cursor: pointer;
            border-color: ${props=>props.theme.color};
        }
    }
    a {
        &:hover {
            color: cornflowerblue;
        }
    }

    @media screen and (max-width: 845px) {
        padding-top: .5rem;
        .footer-title {
            font-size: 20px;
            margin-bottom: 18px;
        }
        .footer-content {
            font-size: 16px;
            
        }
    }

    @media screen and (max-width: 480px) {
        padding-top: 1rem;
        .footer-title { 
            font-size: 16px; 
            margin-bottom: 1rem;
        }  
        .name { font-size: 12px; }
        .footer-contacts, .footer-reference { display: none; }
        
        .up-btn {
            line-height: 1.5;
        }
    }
`

const Footer = () => {
    const onClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return(
        <StyledFooter>
            <div>
                <span className="footer-title">Developer</span>

                <span className="name footer-content">Jo SeongJun</span>
            </div>
            <div className="footer-contacts">
                <span className="footer-title">Contacts</span>

                <span className="email footer-content">jsj2505@gmail.com</span>
                <a href="https://github.com/lofi-J" rel="noreferrer" target={"_blank"}><span className="email footer-content">github.com/lofi-J</span></a>
            </div>
            <div className="footer-reference">
                <span className="footer-title">Reference</span>
                
                <a href="https://en.wikipedia.org/wiki/Sorting_algorithm" rel="noreferrer" target={"_blank"}><span className="footer-content">Wikipedia</span></a>                
            </div>
            <span className="up-btn" onClick={onClick}>^</span>
        </StyledFooter>
    );
}

export default Footer;