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
      array: [],
      color: "blue",
      sorting: false,
      arrStack: [],
    }
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      this.setState({array: newdata})
      //figure out why the state won't reset
      tStack.clear()

      // let t0 = window.performance.now()

      this.mergeSort(newdata)

      // let t1 = window.performance.now()
      // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
      // console.log(t0)
      // console.log(t1)
      let stack = tStack.getStack();
      stack[stack.length-1] = stack[stack.length-1].slice(0,49);

      this.setState({arrStack: tStack.getStack(), finished: true})
    }
    if (this.props.runAll && this.props.runAll !== nextProps.runAll) {
      this.setState({ sorting: true })
      this.mergeSort(newdata);
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

  render() {
    return (
      <div className="merge">
        <Graph
          data={this.state.array}
          color={this.state.color}
          name="Merge Sort"
          graphId="mergeGraph"
          svgId="mergeSVG"
          arrStack={this.state.arrStack}
          time={this.state.time}
        />
      </div>
    );
  }
}

export default Merge;
