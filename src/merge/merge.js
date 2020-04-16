import React, { Component } from 'react';
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
      return stack;
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
      this.mergeSort(newdata, 0, newdata.length-1)
      let sortedArr = newdata.sort()
      let stack = tStack.getStack();
      stack.push(sortedArr)

      this.setState({arrStack: tStack.getStack(), finished: true, time: (t1-t0)})
    } 
  }

  merge(arr, start, mid, end) { 
    let start2 = mid + 1; 
  
    // If the direct merge is already sorted 
    if (arr[mid] <= arr[start2]) { 
        return; 
    } 
  
    // Two pointers to maintain start 
    // of both arrays to merge 
    while (start <= mid && start2 <= end) { 
  
        // If element 1 is in right place 
        if (arr[start] <= arr[start2]) { 
            start++; 
        } 
        else { 
            let value = arr[start2]; 
            let index = start2; 
  
            // Shift all the elements between element 1 
            // element 2, right by 1. 
            while (index !== start) { 
                arr[index] = arr[index - 1]; 
                index--; 
                // let tempArry = [...arr]
                // tStack.add(tempArry)
            } 
            arr[start] = value; 
            
  
            // Update all the pointers 
            start++; 
            mid++; 
            start2++; 
        } 
    } 
  } 
  
  /* l is for left index and r is right index of the  
    sub-array of arr to be sorted */
  mergeSort(arr, l, r) { 
    if (l < r){
      let m = Math.floor(l + (r - l) / 2)
  
      // # Sort first and second halves 
      this.mergeSort(arr, l, m); 
      this.mergeSort(arr, m + 1, r);
      l = 0 
      tStack.add([...arr])
      this.merge(arr, l, m, r); 
    }
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
