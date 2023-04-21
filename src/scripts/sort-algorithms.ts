import { atom, selector } from "recoil";

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


// DESCRIPTIONS
const bubbleInfo = [
`버블 정렬(Bubble Sort)은 데이터 구조를 반복하여 각 사이클에서 현재 요소를 다음 요소와 비교하고, 잘못된 순서에 있다면 서로 교환해줍니다.`,

`구현하기 쉬운 알고리즘이지만 효율성은 좋지 못해 평균적으로 선택 정렬이나 삽입 정렬과 같은 시간 복잡도를 가지는 이차 정렬 알고리즘들이 더 나은 성능을 보여줍니다.
Shaker Sort, Odd Even Sort, Comb Sort와 같은 여러 가지 변형이 있어 성능개선의 여지가 있습니다.
`]

const selectionInfo = [
`선택 정렬(Selection Sort)은 반복적이며 제자리에서 정렬하는 알고리즘으로 데이터 구조를 정렬된 부분과 정렬되지 않은 부분으로 두 개의 서브리스트로 분할합니다.`,

`데이터 구조의 모든 요소에 대해 반복하며, 각 사이클마다 정렬되지 않은 서브리스트에서 가장 작은 요소를 선택하여 정렬된 서브리스트에 추가하며 점차 정렬됩니다.`,

`선택 정렬은 추가적인 메모리가 필요하지 않는 매우 간단하고 직관적인 알고리즘이지만 큰 데이터 구조에 대해서는 효율적이지 못합니다.`
]

const insertionInfo = [
`삽입 정렬(Insertion Sort)은 배열의 모든 요소를 앞에서 부터 차례로 이미 정렬된 배열 부분과 비교하여 자신의 위치를 찾아 삽입함으로써 정렬이 점차 진행됩니다.`,

`삽입 정렬은 최종적으로 정렬된 배열을 하나의 항목씩 구축하는 간단한 알고리즘으로 거의 정렬된 데이터 구조에서 효율적입니다.`
]

const mergeInfo = [
`병합 정렬(Merge Sort)은 Divide et Impera 기법을 이용한 정렬 알고리즘으로, 데이터 구조를 재귀적으로 분할하여 각 부분 수열이 하나의 요소만 포함하도록 합니다. 그 다음, 부분 수열을 병합하여 순차적으로 정렬합니다.`,

`병합 정렬은 안정적이며 대부분의 경우 빠른 알고리즘이지만, 최악의 경우에는 시간 복잡도가 O(nlogn)이 됩니다. 이 알고리즘은 분할 및 병합에 대한 추가적인 메모리 공간이 필요하므로, 메모리 사용량이 많을 수 있습니다.`
]

const heapInfo = [
`힙 정렬(Heap Sort)은 힙(Heap) 자료구조를 이용한 정렬 알고리즘입니다.`,

`힙은 부모 노드가 자식 노드보다 항상 큰(혹은 작은) 완전 이진 트리 형태의 자료구조입니다.`,

`힙 정렬은 안정적이지 않습니다. 그러나, 평균적으로 O(nlogn)의 시간 복잡도를 가지며, 정렬된 결과가 바로 배열에 적용됩니다. 따라서 메모리 사용량이 적은 특징이 있습니다.`,

`힙 정렬은 대용량 데이터를 정렬하는 데 적합하며, 일반적으로 선택 정렬(Selection Sort)보다 우수한 성능을 보입니다.`
]

const quickInfo = [
`퀵 정렬(Quick Sort)은 분할 정복(Divide and Conquer) 방식을 이용한 정렬 알고리즘 중 가장 유명한 알고리즘 중 하나입니다.`,

`임의의 pivot값을 선택해 pivot값을 기준으로 왼쪽, 오른쪽으로 분할하고 다시 분할된 왼쪽과 오른쪽에 대해 더 이상 분할이 불가능할 때까지 퀵 정렬을 수행합니다.`,

`퀵 정렬은 평균적으로 O(nlogn)의 시간 복잡도를 가지며, 메모리 사용량이 작습니다. 그러나 최악의 경우에는 O(n^2)의 시간 복잡도를 가집니다. 이는 pivot 값의 선택이 매우 불량할 경우, 즉 배열이 이미 정렬되어 있거나 역순으로 정렬되어 있을 때 발생합니다.`,

`퀵 정렬은 대부분의 정렬 알고리즘 중에서 가장 빠르게 동작하는 알고리즘 중 하나이며, 대용량 데이터를 정렬하는 데 적합합니다.`
]

const radixInfo = [
`Radix Sort는 자릿수별로 데이터를 정렬하는 정렬 알고리즘입니다. 일반적으로 정수나 문자열을 정렬하는 데 사용됩니다.`,

`1. 정렬 대상 데이터 중 가장 큰 값을 찾습니다.`,
`2. 정렬 대상 데이터를 가장 작은 자릿수부터 가장 큰 자릿수까지 반복하여 정렬합니다.`,
`3. 각 자릿수마다 모든 데이터를 순회하면서, 해당 자릿수의 값을 기준으로 버킷(bucket)에 데이터를 저장합니다.`,
`4. 버킷에 저장된 데이터를 순서대로 다시 배열에 저장합니다.`,
`5. 모든 자릿수에 대해 위 과정을 반복합니다.`,

`Radix Sort는 안정 정렬(stable sort)이며, 비교 기반 정렬 알고리즘이 아니기 때문에 비교 연산이 필요하지 않습니다. 따라서 특정 조건에서 다른 알고리즘보다 더 빠른 속도를 보이며, 특히 정렬 대상 데이터의 크기가 작을 때 유용합니다. 그러나 데이터 크기가 매우 클 경우에는 메모리 사용량이 많아지는 문제가 있으며 정수가 아닌 수의 경우 적용이 어렵다는 문제점이 있습니다.`
]

const shellInfo = [
`Shell Sort는 삽입 정렬(Insertion Sort)의 변형으로, 데이터의 특성을 이용하여 성능을 개선한 정렬 알고리즘입니다.`,

`간격(interval)은 초기에는 배열의 길이를 반으로 나눈 값으로 시작하여, 반복마다 절반으로 줄어듭니다. 이렇게 간격을 조정하면서 정렬을 수행하면, 초기에는 먼 요소들끼리 비교하여 정렬하는 것보다, 가까운 요소들끼리 먼저 정렬되어 더 많은 요소들이 먼저 정렬될 수 있어 성능이 개선됩니다.`,

`Shell Sort는 안정 정렬(stable sort)이 아니지만, 비교 기반 정렬 알고리즘이기 때문에 일반적으로 다른 알고리즘보다는 빠른 속도를 보입니다. 하지만 최악의 경우에는 여전히 O(n^2)의 시간 복잡도를 가지므로, 큰 데이터셋에 대해 사용하기에는 적합하지 않습니다.`
]

const countingInfo = [
`Counting Sort는 각 요소의 개수를 세는 누적 카운트 방식을 이용하여 정렬하는 알고리즘입니다.`,

`1. 배열의 최대값(max)을 구합니다.`,
`2. 0부터 max까지의 카운트 배열(count)을 생성하고, 각 요소의 개수를 count 배열에 누적시킵니다.`,
`3. 정렬할 배열의 요소를 차례로 읽어가며, 해당 요소의 값이 count 배열의 인덱스와 일치하는 위치에 넣습니다.`,
`4. 해당 위치의 요소를 하나 감소시킵니다.`,
`5. 3, 4 과정을 모든 요소에 대해 수행합니다.`,

`Counting Sort는 안정 정렬(stable sort)이며, 시간 복잡도는 O(n + k)입니다. 단, 카운트 배열을 위해 O(k)의 공간 복잡도가 필요하며, max 값이 큰 경우에는 카운트 배열이 커져서 공간 복잡도가 높아질 수 있습니다. 또한, 정렬할 수 있는 요소의 범위가 제한적이어야 하며, 음수 요소의 경우에는 적용이 어렵습니다. Counting Sort는 대부분의 경우에 퀵 정렬(Quick Sort)이나 병합 정렬(Merge Sort)과 같은 알고리즘보다 빠른 속도를 보입니다.`
]


export const algorithms = [
    { name: 'Bubble sort', 
    timeComplex: {
        average: `O(n²)`,
        best: 'O(n)',
        worst: 'O(n²)',
        space: 'O(1)'
    }, info: bubbleInfo, index: 0},

    { name: 'Selection sort',
    timeComplex: {
        average: 'O(n²)',
        best: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)'
    }, info: selectionInfo, index:1},

    { name: 'Insertion sort',
    timeComplex: {
        average: 'O(n²)',
        best: 'O(n)',
        worst: 'O(n²)',
        space: 'O(1)'
    }, info: insertionInfo, index:2},



    { name: 'Merge sort', 
    timeComplex: {
        average: 'O(n × log n)',
        best: 'O(n × log n)',
        worst: 'O(n × log n)',
        space: 'O(n)'
    }, info: mergeInfo, index: 3},

    { name: 'Heap sort',
    timeComplex: {
        average: 'O(n × log n)',
        best: 'O(n × log n)',
        worst: 'O(n × log n)',
        space: 'O(1)'
    } , info: heapInfo, index: 4},

    { name: 'Quick sort',
    timeComplex: {
        average: 'O(n × log n)',
        best: 'O(n × log n)',
        worst: 'O(n²)',
        space: 'O(n)'
    }, info: quickInfo, index: 5},



    { name: 'Radix sort',
    timeComplex: {
        average: 'O(d × (n + b))',
        best: 'O(d × (n + b))',
        worst: 'O(d × (n + b))',
        space: 'O(n + 2^d)'
    }, info: radixInfo, index: 6},

    { name: 'Shell sort',
    timeComplex: {
        average: 'Depending on the gap sequence',
        best: 'O(n × log n)',
        worst: 'O(n²)',
        space: 'O(1)'
    }, info: shellInfo, index:7},

    { name: 'Counting sort',
    timeComplex: {
        average: 'O(n+k)',
        best: 'O(n+k)',
        worst: 'O(n+k)',
        space: 'O(n+k)'
    }, info: countingInfo, index:8},
]
const algorithmsState = atom({
    key: 'algorithms',
    default: algorithms,
})
export const getAlgorithms = selector({
    key: 'getAlgorithms',
    get: ({get}) => { return get(algorithmsState) }
})
