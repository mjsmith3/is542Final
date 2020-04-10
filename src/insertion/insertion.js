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
      color: "blue",
      sorting: false
    }

    this.delay = this.delay.bind(this);
    this.run = this.run.bind(this);
    this.step = this.step.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      this.setState({ insertArray: [...newdata], color: "blue", sorting: false })
    }
    if (this.props.runAll && this.props.runAll !== nextProps.runAll) {
      this.run();
    }
  }

  step() {
    if (!this.state.sorting) {
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
  }
  async run() {
    let x = 0
    if (!this.state.sorting) {
      this.setState({ sorting: true })
      let data = this.state.insertArray;
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          continue;
        }
        let j = i
        while (data[j] < data[j - 1] && j > 0) {
          await this.delay(1).then(() => {
            x += 1
          });
          let val1 = data[j];
          let val2 = data[j - 1];
          data[j] = val2;
          data[j - 1] = val1;
          j--;
          this.setState({ insertArray: data });

        }
      }
      this.setState({ insertArray: data, color: "green" });
      console.log(x)
    }
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
          step={this.step}
          run={this.run}
        />
      </div>
    );
  }

}

export default Insertion;
