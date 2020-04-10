import React, { Component } from 'react';
import * as d3 from 'd3';
import './selection.css';
import Graph from '../graph/graph';
import { green } from '@material-ui/core/colors';


class Selection extends Component {
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
            let min = i;
            for (let j = i + 1; j < len; j++) {
                if (inputArr[min] > inputArr[j]) {
                    min = j;
                }
            }
            if (min !== i) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[min];
                inputArr[min] = tmp;
                break
            }
        }
      this.setState({ array: inputArr });
    }
  }

  async run() {
    let x = 0
    if (!this.state.sorting) {
      let inputArr = this.state.array
      let len = inputArr.length;
        for (let i = 0; i < len; i++) {
            let min = i;
            for (let j = i + 1; j < len; j++) {
                await this.delay(1).then(() => {
                  x +=1
                });
                if (inputArr[min] > inputArr[j]) {
                    min = j;
                }
            }
            if (min !== i) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[min];
                inputArr[min] = tmp;
                this.setState({ insertArray: inputArr });
            }
        }
      this.setState({ array: inputArr, color:"green" });
      console.log("selection " + x)
    }
  }

  delay(number) {
    return new Promise(resolve => setTimeout(resolve, number));
  }

  render() {
    return (
      <div className="selection">
        <Graph
          data={this.state.array}
          color={this.state.color}
          name="Selection Sort"
          graphId="selectionGraph"
          svgId="selectionSVG"
          step={this.step}
          run = {this.run}
        />
      </div>
    );
  }
}

export default Selection;
