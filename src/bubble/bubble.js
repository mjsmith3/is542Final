import React, { Component } from 'react';
import * as d3 from 'd3';
import './bubble.css';
import Graph from '../graph/graph'

class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      color: "blue"
    }

    this.delay = this.delay.bind(this);
    this.run = this.run.bind(this);
    this.step = this.step.bind(this);
  }

  componentDidMount() {
    this.setState({ array: this.props.data })
  }

  step() {
    let inputArr = this.state.array
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (inputArr[j] > inputArr[j + 1]) {
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
          break
        }
      }
      break
    }

    this.setState({ array: inputArr });
  }
  async run() {
    let inputArr = this.state.array
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (inputArr[j] > inputArr[j + 1]) {
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
          await this.delay(1).then(() => {
            this.setState({ insertArray: inputArr });
          });
        }
      }
    }

    this.setState({ array: inputArr, color: "green" });
  }

  delay(number) {
    return new Promise(resolve => setTimeout(resolve, number));
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
        />
        <button onClick={this.step}>step</button>
        <button onClick={this.run}>run</button>
      </div>
    );
  }

}

export default Bubble;
