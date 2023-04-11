import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import styled from '@emotion/styled';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const StyledTest = styled.div`

`

const Test = () => {
  return(
    <StyledTest>
      <div></div>      
    </StyledTest>
  );
}

root.render(
  <RecoilRoot>
    <App />
    {/* <Test /> */}
  </RecoilRoot>
);

