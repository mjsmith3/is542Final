import React, { Component } from 'react';
import * as d3 from 'd3';
import './insertion.css';
import Graph from '../graph/graph';
import Button from '@material-ui/core/Button';


class Insertion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insertArray: [],
      color: "blue"
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
      this.setState({ insertArray: [...newdata], color: "blue" })
    }
  }

  step() {
    let data = this.state.insertArray
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        continue;
      }
      let j = i
      let change = false
      while (data[j] < data[j - 1] && j > 0) {
        let val1 = data[j]
        let val2 = data[j - 1]
        data[j] = val2
        data[j - 1] = val1
        j--
        change = true
        break
      }
      if (change) {
        break
      }
    }
    this.setState({ insertArray: data });
  }
  async run() {
    let data = this.state.insertArray;
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        continue;
      }
      let j = i
      while (data[j] < data[j - 1] && j > 0) {
        let val1 = data[j]
        let val2 = data[j - 1]
        data[j] = val2
        data[j - 1] = val1
        j--
        await this.delay(1).then(() => {
          this.setState({ insertArray: data });
        });

      }
    }
    this.setState({ insertArray: data, color: "green" });
  }

  delay(number) {
    return new Promise(resolve => setTimeout(resolve, number));
  }

  render() {
    return (
      <div className="insertion">
        <Graph
          data={this.state.insertArray}
          color={this.state.color}
          name="Insertion Sort"
          graphId="insertionGraph"
          svgId="insertionSVG"
        />
        <Button variant="contained" onClick={this.step}>Step</Button>
        <Button variant="contained" onClick={this.run}>Run</Button>
      </div>
    );
  }

}

export default Insertion;
