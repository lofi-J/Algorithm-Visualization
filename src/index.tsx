import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';import styled from 'styled-components';
;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);





const StyledTimeComplex = styled.div`
  table {
    th, td {
      border: 1px solid black;
    }
    
    tbody {
      
    }
  }
`


const Test = () => {
  return(
    <></>
  );
}


root.render(
  <RecoilRoot>
    <App />
    {/* <Test /> */}
  </RecoilRoot>
);

