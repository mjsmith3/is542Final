import React, {Component} from 'react';
import * as d3 from 'd3';
import './graph.css';

const margin = { left: 100, right: 10, top: 50, bottom: 100 }

//Set the width and the height of your chart
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

class Graph extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let svg = d3.select("#" + this.props.svgId).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

    //Create a group that will contain your chart
    let g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("id", this.props.graphId);

    //Create a scale for the height of your buildings (bars)
    let y = d3.scaleLinear()
    .domain([0,
        d3.max(this.props.data, function (d) { return d })
    ])
    .range([height, 0])

    // Create a scale for the width of each bar
    let x = d3.scaleBand()
    .domain(this.props.data.map(function (d) {
        return d;
    }))
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.3);

    //Add an x axis with labels  
    let xAxisCall = d3.axisBottom(x);
    g.append("g").call(xAxisCall)
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisCall)
    .selectAll("text")
    .remove()

    //add a y axis with labels
    let yAxisCall = d3.axisLeft(y)
    .ticks(0)

    g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall)
    .selectAll("text")
    .remove();

    //Add a chart title in the SVG
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .text(this.props.name)
    .attr("font-size", "20px")
    this.renderData()
  }

  componentDidUpdate() {
    this.renderData();
  }

  renderData() {

    //Create a scale for the height of your buildings (bars)
    let y = d3.scaleLinear()
    .domain([0,
        d3.max(this.props.data, function (d) { return d })
    ])
    .range([height, 0])

    // Create a scale for the width of each bar
    let x = d3.scaleBand()
    .domain(this.props.data.map(function (d) {
        return d;
    }))
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.3);

    //Add all of the bars to your graph
    console.log("printing rectangles")
    console.log(this.props.data)
    
    d3.select("#" + this.props.graphId)
    .selectAll("rect")
    .remove()
    .data(this.props.data)
    .enter()
    .append("rect")
    .attr("y", function (d) {
        return y(d);
    })
    .attr("x", function (d) {
        console.log("hello")
        return x(d)
    })
    .attr("height", function (d) {
        return height - y(d);
    })
    .attr("width", x.bandwidth)
    .attr("fill", this.props.color)
  }

  render() {
    return (
      <div className="graph">
        <div id={this.props.svgId}></div>
      </div>
    );
  }
  
}

export default Graph;
