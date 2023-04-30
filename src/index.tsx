import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';import styled from 'styled-components';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <RecoilRoot>
      <App />
  </RecoilRoot>
);

