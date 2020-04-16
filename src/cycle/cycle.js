import React, { Component } from 'react';
import './cycle.css';
import Graph from '../graph/graph';


class Cycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStack: [],
      time: null
    }

    this.cycleSort = this.cycleSort.bind(this);
  }

  componentDidUpdate(nextProps) {
    let newdata = this.props.data
    let currentData = nextProps.data
    if (currentData !== newdata) {
      // get the time
      let t0 = window.performance.now()
      for (let i = 0; i<1000;i ++) {
        this.cycleSortTime([...newdata])
      }
      
      let t1 = window.performance.now() 

      this.cycleSort([...newdata])
      this.setState({time: t1 - t0})
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
      if (currentIndexCopy===currentIndex)
        continue
  
      // skip duplicates
      while (item===array[currentIndexCopy])
        currentIndexCopy++
  
      // swap
      let temp = array[currentIndexCopy]
      array[currentIndexCopy] = item
      item = temp
      
      let tempArr = [...array];
      arrayStack.push(tempArr)
  
      // repeat above steps as long as we can find values to swap
      while (currentIndexCopy!==currentIndex) {
        currentIndexCopy = currentIndex
        // loop through all indexes that proceed the currentIndex
        for (let i = currentIndex + 1; i < array.length; i++)
          if (array[i] < item)
            currentIndexCopy++
  
        // skip duplicates
        while (item===array[currentIndexCopy])
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

  cycleSortTime(array) {
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
      if (currentIndexCopy===currentIndex)
        continue
  
      // skip duplicates
      while (item===array[currentIndexCopy])
        currentIndexCopy++
  
      // swap
      let temp = array[currentIndexCopy]
      array[currentIndexCopy] = item
      item = temp
  
      // repeat above steps as long as we can find values to swap
      while (currentIndexCopy!==currentIndex) {
        currentIndexCopy = currentIndex
        // loop through all indexes that proceed the currentIndex
        for (let i = currentIndex + 1; i < array.length; i++)
          if (array[i] < item)
            currentIndexCopy++
  
        // skip duplicates
        while (item===array[currentIndexCopy])
          currentIndexCopy++
  
        // swap
        temp = array[currentIndexCopy]
        array[currentIndexCopy] = item
        item = temp
      }
    }
  }

  render() {
    return (
      <div className="cycle">
        <Graph
          data={this.state.array}
          name="Cycle Sort"
          graphId="cycleGraph"
          svgId="cycleSVG"
          arrStack={this.state.arrStack}
          time={this.state.time}
          runAll = {this.props.runAll}
        />
      </div>
    );
  }
}

export default Cycle;
