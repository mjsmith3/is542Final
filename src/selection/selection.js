import React, { Component } from 'react';
import './selection.css';
import Graph from '../graph/graph';


class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStack: [],
    }

    this.selectionSort = this.selectionSort.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      let t0 = window.performance.now()
      for (let i = 0; i<1000;i ++) {
        this.selectionSortTime([...newdata])
      }
      
      let t1 = window.performance.now() 
      
      this.selectionSort([...newdata])
      this.setState({time: t1 - t0})
    }
  }

  selectionSort(arr) {
    let arrayStack = [];

    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
            let tempArr = [...arr];
            arrayStack.push(tempArr)
        }
    }
    this.setState({ arrStack: arrayStack });
  }

  selectionSortTime(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
  }

  render() {
    return (
      <div className="selection">
        <Graph
          name="Selection Sort"
          graphId="selectionGraph"
          svgId="selectionSVG"
          arrStack={this.state.arrStack}
          time={this.state.time}
          runAll = {this.props.runAll}
        />
      </div>
    );
  }
}

export default Selection;
