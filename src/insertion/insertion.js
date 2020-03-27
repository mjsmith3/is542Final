import React, {Component} from 'react';
import * as d3 from 'd3';
import './insertion.css';
import Graph from '../graph/graph' 

class Insertion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      color: "blue"
    }

    this.delay = this.delay.bind(this);
    this.run = this.run.bind(this);
    this.step = this.step.bind(this);
  }

  componentDidMount() {
    this.setState({array: this.props.data});
  }

  step() {
    let data = this.state.array
    for (let i = 0; i < data.length; i++) {
        if (i===0) {
            continue;
        }
        let j = i
        let change = false
        while (data[j]<data[j-1] && j>0) {
            let val1 = data[j]
            let val2 = data[j-1]
            data[j] = val2
            data[j-1] = val1
            j--
            change = true
            break
        }
        if (change) {
            break
        }
    }
    this.setState({array: data});
  }
  async run() {
    let data = this.state.array;
    for (let i = 0; i < data.length; i++) {
        if (i===0) {
            continue;
        }
        let j = i
        while (data[j]<data[j-1] && j>0) {
            let val1 = data[j]
            let val2 = data[j-1]
            data[j] = val2
            data[j-1] = val1
            j--
            await this.delay(100).then(() => {
              this.setState({array: data});
            });
            
        }
    }
    this.setState({array: data, color: "green"});
  }

  delay(number) {
      return new Promise( resolve => setTimeout(resolve, number) );
  }

  render() {
    return (
      <div className="insertion">
        <Graph 
          data={this.state.array} 
          color={this.state.color} 
          name= "Insertion Sort"
          graphId = "insertionGraph"
          svgId = "insertionSVG"
        />
        <button onClick={this.step}>step</button>
        <button onClick={this.run}>run</button>
      </div>
    );
  }
  
}

export default Insertion;
