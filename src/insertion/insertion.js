import React, { Component } from 'react';
import './insertion.css';
import Graph from '../graph/graph';


class Insertion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStack: [],
      time: null
    }

    this.insertionSort = this.insertionSort.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      // get the time
      let t0 = window.performance.now()
      for (let i = 0; i<1000;i ++) {
        this.insertionSortTime([...newdata])
      }
      
      let t1 = window.performance.now() 

      this.insertionSort([...newdata])
      this.setState({time: t1 - t0})
    }
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

    this.setState({ arrStack: arrayStack });
  }

  insertionSortTime(data) {
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
        j--;
      }
    }
  }

  render() {
    return (
      <div className="insertion">
        <Graph
          name="Insertion Sort"
          graphId="insertionGraph"
          svgId="insertionSVG"
          arrStack={this.state.arrStack}
          time={this.state.time}
          runAll = {this.props.runAll}
        />
      </div>
    );
  }

}

export default Insertion;
