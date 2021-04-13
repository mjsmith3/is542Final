import React, { Component } from 'react';
import * as d3 from 'd3';
import './graph.css';
import Button from '@material-ui/core/Button';
import {VegaGraph} from '../vega-graph'
const barBuffer = ".06"


class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortStack: [],
      sortingStep: 0,
      color:"blue",
      sorted: false,
      time: 0,
    }
    this.stepBackward = this.stepBackward.bind(this);
    this.stepForward = this.stepForward.bind(this);
    this.run = this.run.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.calculateSVGSize();
    });
    if (!this.state.calculated) {
      this.setState({ calculated: true })
      this.calculateSVGSize()
    }
  }

  componentDidUpdate(currentProps) {
    let newArray = this.props.arrStack
    let currentArray = currentProps.arrStack
    if (currentArray !== newArray) {
      this.setState({ sortStack: newArray, sortingStep:0, color: "blue", time: this.props.time })
    }

    if (this.props.runAll && this.props.runAll !== currentProps.runAll && !this.state.sorted) {
      this.run()
    }
  }

  calculateSVGSize() {
    let divWidth = document.getElementById(this.props.svgId).clientWidth;
    let divHeight = document.getElementById(this.props.svgId).clientHeight;
    this.setState({ height: (divHeight * .85), width: (divWidth * .85), calculated: true })
  }


  stepForward() {
    if (this.state.sortingStep <= this.state.sortStack.length - 1) {
      if (this.state.sortingStep === this.state.sortStack.length - 1) {
        this.setState({color:"green"})
      } else {
        this.setState(prevState => ({
          sortingStep: prevState.sortingStep + 1
        }));
      }
    }
  }

  stepBackward() {
    if (this.state.sortingStep > 0) {
      this.setState(prevState => ({
        sortingStep: prevState.sortingStep - 1, color: "blue"
      }));
    }
  }

  async run() {
    //calculate the delay
    let delay = this.state.time * 500
    delay = delay / this.state.sortStack.length

    for (let i = this.state.sortingStep; i < this.state.sortStack.length; i++) {
      await this.delay(delay).then(() => {
      });
      if (i === this.state.sortStack.length-1) {
        this.setState({color:"green"})
      } else {
        this.setState(prevState => ({
          sortingStep: prevState.sortingStep + 1
        }));
      }
    }
  }

  delay(number) {
    return new Promise(resolve => setTimeout(resolve, number));
  }

  getSize() {
    let x = window.matchMedia("(max-width: 1250px)");
    if (x.matches) { // If media query matches
      return "small";
    }
    return "large"
  }
  

  render() {
    return (
      <div className="graph">
        <div style={{ height: "40vh" }}>
          <p>{this.props.name}</p>
          <p>Time to sort: {this.state.time.toFixed(2)} ms</p>
          <div id={this.props.svgId} style={{ height: "70%" }}>
            {this.state.sortStack[this.state.sortingStep] && <VegaGraph data={this.state.sortStack[this.state.sortingStep]} height={this.state.height} width={this.state.width} color={this.state.color}/>}
          </div>
          <div style={{marginBottom:"1em"}}>
            <Button id="controlButton" variant="contained" size={this.getSize()} onClick={this.stepForward}>Step Forward</Button>
            <Button id="controlButton" variant="contained" size={this.getSize()} onClick={this.stepBackward}>Step Backward</Button>
            <Button id="controlButton" variant="contained" size={this.getSize()} onClick={this.run}>Run</Button>

          </div>
        </div>
      </div>
    );
  }

}

export default Graph;
