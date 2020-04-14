import React, { Component } from 'react';
import * as d3 from 'd3';
import './graph.css';
import Button from '@material-ui/core/Button';

const barBuffer = ".06"


class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      calculated: false,
      sortStack: [],
      sortingStep: 0,
    }
    this.stepBackward = this.stepBackward.bind(this);
    this.stepForward = this.stepForward.bind(this);
    this.run = this.run.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.calculateSVGSize();
      this.renderData();
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
      this.setState({ sortStack: newArray })
    }
    this.renderData();
  }

  calculateSVGSize() {
    let divWidth = document.getElementById(this.props.graphId).clientWidth;
    let divHeight = document.getElementById(this.props.graphId).clientHeight;
    this.setState({ height: (divHeight * .85), width: (divWidth * .85), calculated: true })
  }

  renderData() {
    var divWidth = document.getElementById(this.props.graphId).clientWidth;
    var divHeight = document.getElementById(this.props.graphId).clientHeight * .85;

    if (this.state.sortStack[this.state.sortingStep]) {

      let data = this.state.sortStack[this.state.sortingStep];

      //Create a scale for the height of your buildings (bars)
      let y = d3.scaleLinear()
        .domain([0,
          d3.max(data, function (d) { return d })
        ])
        .range([this.state.height, this.state.height * barBuffer])

      // Create a scale for the width of each bar
      let x = d3.scaleBand()
        .domain(data.map(function (d, index) {
          return index;
        }))
        .range([this.state.width * barBuffer, (this.state.width + this.state.width * barBuffer)])
        .paddingInner(0.2)
        .paddingOuter(0.3);

      //Add all of the bars to your graph
      if (d3.select("#" + this.props.graphId).selectAll("rect")._groups[0].length != 0) {
        d3.select("#" + this.props.graphId)
          .selectAll("rect")
          .remove()
      }
      d3.select("#" + this.props.graphId)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", function (d) {
          return y(d);
        })
        .attr("x", function (d, index) {
          return x(index)
        })
        .attr("height", function (d) {
          return divHeight - y(d) + (divHeight * barBuffer);
        })
        .attr("width", x.bandwidth)
        .attr("fill", this.props.color)
    }
  }

  getHeight() {
    return this.state.height;
  }

  stepForward() {
    if (this.state.sortingStep < this.state.sortStack.length - 1) {
      this.setState(prevState => ({
        sortingStep: prevState.sortingStep + 1
      }));
    }
  }

  stepBackward() {
    if (this.state.sortingStep > 0) {
      this.setState(prevState => ({
        sortingStep: prevState.sortingStep - 1
      }));
    }
  }

  async run() {
    for (let i = 0; i < this.state.sortStack.length; i++) {
      await this.delay(1).then(() => {
      });
      this.setState(prevState => ({
        sortingStep: prevState.sortingStep + 1
      }));
    }
  }

  delay(number) {
    return new Promise(resolve => setTimeout(resolve, number));
  }

  render() {
    return (
      <div className="graph">
        <div style={{ height: "100%" }}>

          <div id={this.props.svgId} style={{ height: "85%" }}>
            <p>{this.props.name}</p>
            <svg height="100%" width="100%" id={this.props.graphId}>
              <line id="xAxis" x1="5%" y1="5%" x2="5%" y2="90%" />
              <line id="yAxis" x1="5%" y1="90%" x2="90%" y2="90%" />
            </svg>
          </div>
          <Button id="controlButton" variant="contained" onClick={this.stepForward}>Step Forward</Button>
          <Button id="controlButton" variant="contained" onClick={this.stepBackward}>Step Backward</Button>
          <Button id="controlButton" variant="contained" onClick={this.run}>Run</Button>
        </div>

      </div>
    );
  }

}

export default Graph;
