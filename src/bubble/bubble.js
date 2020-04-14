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
    console.log("executing")
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      this.setState({ array: [...newdata], color: "blue", sorting: false })
      console.log("executing")

      this.BubbleSort([...newdata])
    }
    if (this.props.runAll && this.props.runAll !== nextProps.runAll) {
      this.setState({ sorting: true })
      this.run();
    }
  }

  BubbleSort(inputArr) {
    let arrayStack = [];
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
      console.log(inputArr)
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
    console.log("bubble: " + arrayStack[0]);
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
          step={this.step}
          run={this.run}
          arrStack={this.state.arrStack}
        />
      </div>
    );
  }
}

export default Bubble;
