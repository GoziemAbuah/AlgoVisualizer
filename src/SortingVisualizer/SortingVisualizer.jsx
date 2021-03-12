import React from 'react';
import {getMergeSortAnimations} from '../sortAlgos/sortAlgorithms.js';
import './SortingVisualizer.css';

const ANIMATE_SPEED = 3; 
const COMPARISON_COLOR = 'red';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
            sorted: true,
            solving: false

        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        if (this.state.solving===false){
        const array = [];
        let len = document.getElementById("myRange").value;
        for(let i = 0; i < len; i++){
            array.push(randomIntFromInterval(5, 700));
        }
        this.setState({array});
        let sorted = false;
        this.setState({sorted})
    }}

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const color_swap = i % 3 !== 2;
      if (color_swap) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? COMPARISON_COLOR : 'turquoise';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATE_SPEED); //scale the speed of animation by index 
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATE_SPEED);
      }
    }
    }

    async partition(input,start,end){
  
        let partitionI = start;
        let pivot = input[end];
        await sleep(10)
        //document.getElementById(end).id = "green";
      // document.getElementById(partitionI).id = "red"
        for (let i = start; i < end ; i++){
            if (input[i] < pivot){
                if (document.getElementById(i)){
                document.getElementById(i).id = "red";}
                
                await this.swap(input,partitionI,i)
                
                if (document.getElementById("red")){
                document.getElementById("red").id = i;}
    
                if(document.getElementById("blue")){
                document.getElementById("blue").id = partitionI;}
                partitionI++
                
                if (document.getElementById(partitionI)){
                document.getElementById(partitionI).id = "blue";}
            }
        }
        await this.swap(input,partitionI,end);
    // document.getElementById("green").id = end
        if(document.getElementById("blue")){
            document.getElementById("blue").id = partitionI;}
        return partitionI
    }

    async swap(arr,x,y){
        await sleep(3);
        let temp = arr[x];
        arr[x] = arr[y];
        arr[y] = temp;
        this.setState({bars:arr})
    }


   async quickSort(input, start, end) {
        if (end <= start){
            return;
        }
        await sleep(10)
        let new_index =  await this.partition(input, start, end);
        this.setState({array:input})
        await sleep(10)
        await this.quickSort(input,start,new_index-1);
        this.setState({array:input})
        await sleep(10)
        await this.quickSort(input,new_index+1,end);
        this.setState({array:input})
       

    }

    async sort(){
        if (!this.state.solving && !this.state.sorted){
         this.setState({solving:true})
        await this.quickSort(this.state.array, 0, this.state.array.length-1);
        this.setState({sorted:true})
        this.setState({solving:false})
        }
        
           
    }

   
    render(){
        const {array} = this.state;
        let width;
        if(array.length > 120){
            width = 1;
        }else if(array.length > 100){
            width = 1.75;
        }else if(array.length > 50){
            width= 3;
        }else if(array.length > 20){
            width = 10;
        }else if(array.length > 10){
            width= 50;
        }else {
            width = 80;
        }

        return (
            <div>
             <nav>
        Sorting Algorithm Visualizer
        <input type="range" min="10" max="200" className="slider" id="myRange" defaultValue="100" onClick={()=>this.resetArray()}></input>
        <button onClick= {() => this.resetArray()}>Create New Array</button>
        <button onClick= {() => this.mergeSort()}>Merge Sort</button>
        <button onClick= {() => this.sort()}>quick sort</button>
        </nav>
        <span className="divide"></span>
            <div className= "array-container">
            {array.map((value, idx) => (
                <div className= "array-bar" key={idx} 
                style={{height: `${value}px`, width: `${width}px`}}>
                    
                </div>
            ))}
            </div>
            
           

            </div>

        );
    }
}
// helpers (lol)

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
} 

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}



