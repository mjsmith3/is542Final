import React, { Component } from 'react';
import * as d3 from 'd3';
import './cycle.css';
import Graph from '../graph/graph';


class Cycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      color: "blue",
      sorting: false,
      arrStack: [],
    }

    this.cycleSort = this.cycleSort.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      this.setState({ array: [...newdata], color: "blue", sorting: false })
      // let t0 = performance.now()

      this.cycleSort([...newdata])

      // let t1 = performance.now()
      // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds. BUBBLE")
    }
    if (this.props.runAll && this.props.runAll !== nextProps.runAll) {
      this.setState({ sorting: true })
      this.BubbleSort([...newdata])
    }
  }

  cycleSort(array) {
    let arrayStack = [];
    // loop from the beginning of the array to the second to last item
    for (let currentIndex = 0; currentIndex < array.length - 1; currentIndex++) {
      // save the value of the item at the currentIndex
      let item = array[currentIndex]
  
      let currentIndexCopy = currentIndex
      // loop through all indexes that proceed the currentIndex
      for (let i = currentIndex + 1; i < array.length; i++)
        if (array[i] < item)
          currentIndexCopy++
  
      // if currentIndexCopy has not changed, the item at the currentIndex is already in the correct currentIndexCopy
      if (currentIndexCopy == currentIndex)
        continue
  
      // skip duplicates
      while (item == array[currentIndexCopy])
        currentIndexCopy++
  
      // swap
      let temp = array[currentIndexCopy]
      array[currentIndexCopy] = item
      item = temp
      
      let tempArr = [...array];
      arrayStack.push(tempArr)
  
      // repeat above steps as long as we can find values to swap
      while (currentIndexCopy != currentIndex) {
        currentIndexCopy = currentIndex
        // loop through all indexes that proceed the currentIndex
        for (let i = currentIndex + 1; i < array.length; i++)
          if (array[i] < item)
            currentIndexCopy++
  
        // skip duplicates
        while (item == array[currentIndexCopy])
          currentIndexCopy++
  
        // swap
        temp = array[currentIndexCopy]
        array[currentIndexCopy] = item
        item = temp
        tempArr = [...array];
        arrayStack.push(tempArr)
      }
    }
    this.setState({ arrStack: arrayStack });
  }

  render() {
    return (
      <div className="cycle">
        <Graph
          data={this.state.array}
          color={this.state.color}
          name="Cycle Sort"
          graphId="cycleGraph"
          svgId="cycleSVG"
          arrStack={this.state.arrStack}
          time={this.state.time}
        />
      </div>
    );
  }
}

export default Cycle;
