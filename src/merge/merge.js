import React, { Component } from 'react';
import * as d3 from 'd3';
import './merge.css';
import Graph from '../graph/graph';

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

class Merge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStack: [],
      time:null
    }
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      let t0 = window.performance.now()

      for (let i = 0; i<1000;i ++) {
        this.mergeSortTime([...newdata])
      }

      let t1 = window.performance.now()

      tStack.clear()
      this.mergeSort(newdata)
      let stack = tStack.getStack();
      stack[stack.length-1] = stack[stack.length-1].slice(0,49);

      this.setState({arrStack: tStack.getStack(), finished: true, time: (t1-t0)})
    } 
  }

  merge(arr1,arr2) {
    let results = [];
    let i=0;
    let j=0;
    while(i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            results.push(arr1[i]);
            i++;
        } else {
           results.push(arr2[j]);
           j++
        }

    }
    while(i < arr1.length) {
        results.push(arr1[i]);
        i++;
    }
    while(j < arr2.length) {
        results.push(arr2[j]);
        j++;
    }
    return results;
  }

  mergeSort(arr){
      if (arr.length <= 1) {
          return arr
      }
      let mid=Math.floor(arr.length/2)
      let left=this.mergeSort(arr.slice(0,mid));
      let tempArray = [...left]
      tempArray = this.adjustArray(tempArray, arr)
      if (tStack.getStack().length == 0) {
        tStack.add(tempArray);
      } else {
        let currentStack = tStack.getStack()
        if (currentStack[currentStack.length-1] != tempArray) {
          tStack.add(tempArray);
        }
      }
      let right=this.mergeSort(arr.slice(mid));
      tempArray = [...right]
      tempArray = this.adjustArray(tempArray)
      if (tStack.getStack().length == 0) {
        tStack.add(tempArray, arr);
      } else {
        let currentStack = tStack.getStack()
        if (currentStack[currentStack.length-1] != tempArray) {
          tStack.add(tempArray);
        }
      }
      tempArray = this.merge(left,right)
      tempArray = this.adjustArray(tempArray)
      if (tStack.getStack().length == 0) {
        tStack.add(tempArray);
      } else {
        let currentStack = tStack.getStack()
        if (currentStack[currentStack.length-1] != tempArray) {
          tStack.add(tempArray);
        }
      }
      return this.merge(left,right);
  }

  adjustArray(tempArray) {
    let realArray = this.props.data
    let used = {}
    for (let i=0; i< realArray.length; i++) {
      used[realArray[i]] = 0
    }
    for (let i = 0; i < realArray.length; i++) {
      if (tempArray.includes(realArray[i]) && used[realArray[i]] != 0) {
        used[realArray[i]] = used[realArray[i]] - 1
      } else {
        tempArray.push(realArray[i]);
      }
    }

    return tempArray
  }

  //These are used to get an accurate time recording
  mergeTime(arr1,arr2) {
    let results = [];
    let i=0;
    let j=0;
    while(i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            results.push(arr1[i]);
            i++;
        } else {
           results.push(arr2[j]);
           j++
        }

    }
    while(i < arr1.length) {
        results.push(arr1[i]);
        i++;
    }
    while(j < arr2.length) {
        results.push(arr2[j]);
        j++;
    }
    return results;
  }

  mergeSortTime(arr){
      if (arr.length <= 1) {
          return arr
      }
      let mid=Math.floor(arr.length/2)
      let left=this.mergeSortTime(arr.slice(0,mid));
      let right=this.mergeSortTime(arr.slice(mid));
      return this.mergeTime(left,right);
  }

  render() {
    return (
      <div className="merge">
        <Graph
          name="Merge Sort"
          graphId="mergeGraph"
          svgId="mergeSVG"
          arrStack={this.state.arrStack}
          time={this.state.time}
          runAll = {this.props.runAll}
        />
      </div>
    );
  }
}

export default Merge;
