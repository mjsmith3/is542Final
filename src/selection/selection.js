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
      sorting: false,
      color: "blue",
      arrStack: [],
    }

    this.selectionSort = this.selectionSort.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      this.setState({ array: [...newdata], color: "blue", sorting: false })
      // let t0 = performance.now()
      this.selectionSort([...newdata])
      // let t1 = performance.now()
      // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds. BUBBLE")
    }
    if (this.props.runAll && this.props.runAll !== nextProps.runAll) {
      this.setState({ sorting: true })
      this.selectionSort([...newdata])
    }
  }

  selectionSort(arr) {
    let arrayStack = [];

    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
            let tempArr = [...arr];
            arrayStack.push(tempArr)
        }
    }
    this.setState({ arrStack: arrayStack });
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
          arrStack={this.state.arrStack}
          time={this.state.time}
        />
      </div>
    );
  }
}

export default Selection;
