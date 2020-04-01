import React, { Component } from 'react';
import * as d3 from 'd3';
import './bubble.css';
import Graph from '../graph/graph';
import Button from '@material-ui/core/Button';


class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      color: "blue",
    }

    this.delay = this.delay.bind(this);
    this.run = this.run.bind(this);
    this.step = this.step.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      this.setState({ array: [...newdata], color: "blue" })
    }
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
        <Button variant="contained" onClick={this.step}>Step</Button>
        <Button variant="contained" onClick={this.run}>Run</Button>
      </div>
    );
  }

}

export default Bubble;
