import React, { Component } from 'react';
import * as d3 from 'd3';
import './bubble.css';
import Graph from '../graph/graph';



class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      color: "blue",
      sorting: false,
      arrStack: [],
    }

    this.BubbleSort = this.BubbleSort.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      this.setState({ array: [...newdata], color: "blue", sorting: false })
      // let t0 = performance.now()

      this.BubbleSort([...newdata])

      // let t1 = performance.now()
      // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds. BUBBLE")
    }
    if (this.props.runAll && this.props.runAll !== nextProps.runAll) {
      this.setState({ sorting: true })
      this.BubbleSort([...newdata])
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

  render() {
    return (
      <div className="bubble">
        <Graph
          data={this.state.array}
          color={this.state.color}
          name="Bubble Sort"
          graphId="bubbleGraph"
          svgId="bubbleSVG"
          arrStack={this.state.arrStack}
          time={this.state.time}
        />
      </div>
    );
  }
}

export default Bubble;
