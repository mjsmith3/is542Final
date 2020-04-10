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
    }

    this.delay = this.delay.bind(this);
    this.run = this.run.bind(this);
    this.step = this.step.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      this.setState({ array: [...newdata], color: "blue", sorting: false })
    }
    if (this.props.runAll && this.props.runAll !== nextProps.runAll) {
      this.setState({ sorting: true })
      this.run();
    }
  }


  step() {
    if (!this.state.sorting) {
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
  }

  async run() {
    let x = 0
    if (!this.state.sorting) {
      this.setState({ sorting: true })
      let inputArr = this.state.array
      let len = inputArr.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          await this.delay(1).then(() => {
            x +=1;
          });
          if (inputArr[j] > inputArr[j + 1]) {
            let tmp = inputArr[j];
            inputArr[j] = inputArr[j + 1];
            inputArr[j + 1] = tmp;
            this.setState({ insertArray: inputArr });
          }
        }
      }

      this.setState({ array: inputArr, color: "green" });
      console.log("bubble " + x);
    }
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
          step={this.step}
          run = {this.run}
        />
      </div>
    );
  }
}

export default Bubble;
