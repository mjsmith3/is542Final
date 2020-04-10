import React, { Component } from 'react';
import * as d3 from 'd3';
import './merge.css';
import Graph from '../graph/graph';


class Merge extends Component {
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
    if (!this.state.sorting) {
      this.setState({ sorting: true })
      let inputArr = this.state.array
      let len = inputArr.length;

      this.setState({ array: inputArr, color: "green" });
    }
  }

  delay(number) {
    return new Promise(resolve => setTimeout(resolve, number));
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
          step={this.step}
          run = {this.run}
        />
      </div>
    );
  }
}

export default Merge;
