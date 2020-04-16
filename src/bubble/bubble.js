import React, { Component } from 'react';
import './bubble.css';
import Graph from '../graph/graph';



class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStack: [],
      time: null
    }

    this.BubbleSort = this.BubbleSort.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      // get the time
      let t0 = window.performance.now()
      for (let i = 0; i<1000;i ++) {
        this.BubbleSortTime([...newdata])
      }
      
      let t1 = window.performance.now() 

      this.BubbleSort([...newdata])
      this.setState({time: t1 - t0})
    }
  }

  BubbleSort(inputArr) {
    let arrayStack = [];
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (inputArr[j] > inputArr[j + 1]) {
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
          let tempArr = [...inputArr];

          arrayStack.push(tempArr)
        }
      }
    }
    this.setState({ arrStack: arrayStack });
  }

  BubbleSortTime(inputArr) {
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (inputArr[j] > inputArr[j + 1]) {
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
        }
      }
    }
  }

  render() {
    return (
      <div className="bubble">
        <Graph
          name="Bubble Sort"
          graphId="bubbleGraph"
          svgId="bubbleSVG"
          arrStack={this.state.arrStack}
          time={this.state.time}
          runAll = {this.props.runAll}
        />
      </div>
    );
  }
}

export default Bubble;
