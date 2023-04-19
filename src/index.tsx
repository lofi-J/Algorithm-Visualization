import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import styled from '@emotion/styled';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Test = () => {
  // let array = [10,9,8,7,6,5,4,3,2,1];

  // const merge = (left: number[], right: number[]) => {
  //   let temp: number[] = [];
  //   while(left.length && right.length) {
  //     if(left[0] < right[0]) {
  //       temp.push(left.shift()!);
  //     } else {
  //       temp.push(right.shift()!);
  //     }
  //   }
  //   return array = [...temp, ...left, ...right];
  // }
  // let mergeSort: (arr: number[]) => number[];
  // mergeSort = (arr: number[]) => {
  //   if(arr.length < 2) return arr;
  //   const half = arr.length / 2;
  //   const left = arr.splice(0, half);
  //   return merge(mergeSort(left), mergeSort(arr));
  // }

  // console.log('before')
  // console.log(array);

  // mergeSort(array);

  // console.log('after');
  // console.log(array);

  return <div></div>;
}


root.render(
  <RecoilRoot>
    <App />
    {/* <Test /> */}
  </RecoilRoot>
);

