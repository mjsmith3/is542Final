import React, { Component } from 'react';
import * as d3 from 'd3';
import './graph.css';
import Button from '@material-ui/core/Button';

const margin = { left: 20, right: 20, top: 50, bottom: 0 }

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:0,
      width:0,
      calculated:false
    }
  }

  componentDidMount() {
    if (!this.state.calculated) {
      this.setState({calculated:true})
      this.calculateSVGSize()
    }
    
    
    this.renderData()
  }

  calculateSVGSize() {
    let divWidth = document.getElementById(this.props.graphId).clientWidth;
    let divHeight = document.getElementById(this.props.graphId).clientHeight;    
    console.log(divHeight * .85)
    console.log(divWidth * .85)
    this.setState({height:(divHeight * .85), width:(divWidth*.85), calculated:true})
  }

  componentDidUpdate() {
    this.renderData();
  }

  renderData() {
    var divWidth = document.getElementById(this.props.graphId).clientWidth *.85;
    var divHeight = document.getElementById(this.props.graphId).clientHeight*.85; 


    //Create a scale for the height of your buildings (bars)
    let y = d3.scaleLinear()
      .domain([0,
        d3.max(this.props.data, function (d) { return d })
      ])
      .range([this.state.height, this.state.height*.05])

    // Create a scale for the width of each bar
    let x = d3.scaleBand()
      .domain(this.props.data.map(function (d, index) {
        return index;
      }))
      .range([this.state.width*.05, this.state.width])
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
      .data(this.props.data)
      .enter()
      .append("rect")
      .attr("y", function (d) {
        return y(d);
      })
      .attr("x", function (d, index) {
        return x(index)
      })
      .attr("height", function (d) {
        return divHeight - y(d) + (divHeight*.05);
      })
      .attr("width", x.bandwidth)
      .attr("fill", this.props.color)
  }

  getHeight() {
    return this.state.height;
  }

  render() {
    return (
      <div className="graph">
        <div style={{height: "100%"}}>
          <div id={this.props.svgId} style={{height: "85%"}}>
            <svg height="100%" width="100%" id={this.props.graphId}>
              <line id="xAxis" x1="5%" y1="5%" x2="5%" y2="90%" />
              <line id="yAxis" x1="5%" y1="90%" x2="90%" y2="90%" />
            </svg>
          </div>
          <Button id="controlButton" variant="contained" onClick={this.props.step}>Step</Button>
          <Button id="controlButton" variant="contained" onClick={this.props.run}>Run</Button>
        </div>
        
      </div>
    );
  }

}

export default Graph;
