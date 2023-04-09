import { atom, selector } from "recoil";

const bubbleInfo = `거품정렬은 쓰레기같은 성능을 보여줍니다!`

export const algorithms = [
    { name: 'Bubble sort', timeComplex: 'O(n\u00B2)',info: bubbleInfo, index: 0, func: () => {bubble()} },
    { name: 'Selection sort', timeComplex: 'O(n\u00B2)', index:1, func: () => {selection()}},
    { name: 'Insertion sort', timeComplex: 'O(n\u00B2)', index:2, func: () => {insertion()}},

    { name: 'Merge sort', timeComplex: 'O(n x logn)', index: 3, func: () => {merge()}},
    { name: 'Heap sort', timeComplex: 'O(n x logn)', index: 4, func: () => {heap()}},
    { name: 'Quick sort', timeComplex: 'O(n x logn)',index: 5, func: () => {quick()}},

    { name: 'Radix sort', timeComplex: 'O(kn)', index: 6, func: () => {radix()}},
    { name: 'Shell sort', timeComplex: 'Depends on gap sequence', index:7, func: () => {shell()}},
    { name: 'Counting sort', timeComplex: 'O(n+k)', index:8, func: () => {counting()}},
]

const algorithmsState = atom({
    key: 'algorithms',
    default: algorithms,
})
export const getAlgorithms = selector({
    key: 'getAlgorithms',
    get: ({get}) => { return get(algorithmsState) }
})

//1
const bubble = () => {
    console.log('1()');
}
//2
const selection = () => {
    console.log('2()');
}
//3
const insertion = () =>{
    console.log('3()');
}


//4
const merge = () => {
    console.log('4()');
}
//5
const heap = () => {
    console.log('5()');
}
//6
const quick = () => {
    console.log('6()');
}


//7
const radix = () => {
    console.log('7()');
}
//8
const shell = () => {
    console.log('8()');
}
//9
const counting = () => {
    console.log('9()');
}

