import React, { Component } from 'react';
import * as d3 from 'd3';
import './insertion.css';
import Graph from '../graph/graph';
import Button from '@material-ui/core/Button';


class Insertion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      color: "blue",
      sorting: false,
      arrStack: [],
    }

    this.delay = this.delay.bind(this);
    this.run = this.run.bind(this);
    this.step = this.step.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
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

    }
  }

  delay(number) {
    return new Promise(resolve => setTimeout(resolve, number));
  }

  insertionSort(data) {
    let arrayStack = [];

    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        continue;
      }
      let j = i
      while (data[j] < data[j - 1] && j > 0) {
        let val1 = data[j];
        let val2 = data[j - 1];
        data[j] = val2;
        data[j - 1] = val1;
        let tempArr = [...data];
        arrayStack.push(tempArr)
        j--;
      }
    }

    //console.log("insertion" + arrayStack[0])
    this.setState({ arrStack: arrayStack });
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
          arrStack={this.state.arrStack}
        />
      </div>
    );
  }

}

export default Insertion;
