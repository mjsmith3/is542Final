import React, { Component } from 'react';
import * as d3 from 'd3';
import './quick.css';
import Graph from '../graph/graph';
import Button from '@material-ui/core/Button';

const tempStack = () => {
  let stack = [];
  return {
    add: (value) => {
      stack.push(value);
    },
    clear: () => {
      stack = [];
    },
    getStack: () => {
      return stack
    }
  }
}
const tStack = tempStack();

class Quick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStack: [],
      time: null,
    }

    this.swap = this.swap.bind(this);
    this.partition = this.partition.bind(this);
    this.quickSort = this.quickSort.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      // get the time
      let t0 = window.performance.now()
      for (let i = 0; i<1000;i ++) {
        this.quickSortTime([...newdata])
      }
      let t1 = window.performance.now()      
      
      tStack.clear()
      this.quickSort(newdata)
      this.setState({arrStack: tStack.getStack(), finished: true, time: (t1-t0)})
    }
  }

  swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;

    let tempArray = [...items]
    if (tStack.getStack().length == 0) {
      tStack.add(tempArray);
    } else {
      let currentStack = tStack.getStack()
      if (currentStack[currentStack.length-1] != tempArray) {
        tStack.add(tempArray);
      }
    }
  }

  partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)]; //middle element
    let i = left; //left pointer
    let j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            this.swap(items, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
  }

  quickSort(items, left =0, right = items.length -1) {
    let index;
    if (items.length > 1) {
        index = this.partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            this.quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            this.quickSort(items, index, right);
        }
    }
  }

  //These functions are simply for time
  swapTime(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }

  partitionTime(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)]; //middle element
    let i = left; //left pointer
    let j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            this.swapTime(items, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
  }

  quickSortTime(items, left =0, right = items.length -1) {
    let index;
    if (items.length > 1) {
        index = this.partitionTime(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            this.quickSortTime(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            this.quickSortTime(items, index, right);
        }
    }
  }



  render() {
    return (
      <div className="quick">
        <Graph
          name="Quick Sort"
          graphId="quickGraph"
          svgId="quickSVG"
          arrStack={this.state.arrStack}
          time={this.state.time}
          runAll={this.props.runAll}
        />
      </div>
    );
  }
}

export default Quick;
