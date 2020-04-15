import React, { Component } from 'react';
import Insertion from '../insertion/insertion';
import Bubble from '../bubble/bubble';
import Quick from '../quick/quick';
import Selection from '../selection/selection';
import Merge from '../merge/merge';
import Cycle from '../cycle/cycle';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { merge } from 'd3';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      runAll: false
    }

    this.runAll = this.runAll.bind(this);
    this.randomize = this.randomize.bind(this);
    this.nearlySorted = this.nearlySorted.bind(this);
    this.fewUnique = this.fewUnique.bind(this);
  }

  componentDidMount() {

  }


  runAll() {
    if (this.setState.runAll) {
      return;
    }
    this.setState({ runAll: true })
  }

  randomize() {
    let newdata = [];
    for (let i = 0; i < 50; i++) {
      newdata.push(Math.random())
    }

    this.setState({ data: newdata, runAll: false })
  }

  nearlySorted() {
    let newdata = [];
    for (let i = 0; i < 50; i++) {
      newdata.push(Math.random())
    }

    newdata.sort()
    for (let x = 0; x < 8; x++) {
      let randIndex1 = this.getRandomInt(0, 49);
      let randIndex2 = this.getRandomInt(0, 49);

      let temp = newdata[randIndex1];
      newdata[randIndex1] = newdata[randIndex2];
      newdata[randIndex2] = temp;
    }

    this.setState({ data: newdata, runAll: false })
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  fewUnique() {
    let fewUnique = [];
    for (let i = 0; i < 5; i++) {
      fewUnique.push(Math.random())
    }

    let newdata = [];
    for (let i = 0; i < 50; i++) {
      let randIndex = this.getRandomInt(0, 4);
      newdata.push(fewUnique[randIndex])
    }

    this.setState({ data: newdata, runAll: false })
  }

  getSize() {
    let x = window.matchMedia("(max-width: 700px)");
    if (x.matches) { // If media query matches
      return "small";
    }
    return "large"
  }



  render() {
    let insertionData = [...this.state.data];
    let bubbleData = [...this.state.data];
    let quickData = [...this.state.data];
    let selectionData = [...this.state.data];
    let mergeData = [...this.state.data];
    let cycleData = [...this.state.data];
    return (
      <div className="container">
        <AppBar className="header">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h5" id="title">
              IS 542 Final - Sorting App
          </Typography>
            <span>
              <Button variant="contained" id="headerButton" size={this.getSize()} onClick={this.randomize} >Randomize</Button>
              <Button variant="contained" id="headerButton" size={this.getSize()} onClick={this.fewUnique} >Few Unique</Button>
              <Button variant="contained" id="headerButton" size={this.getSize()} onClick={this.nearlySorted} >Nearly Sorted</Button>
              <Button variant="contained" id="headerButton" size={this.getSize()} onClick={this.runAll} >Run All</Button>
            </span>

          </Toolbar>
        </AppBar>
        <Insertion className="insertion" data={insertionData} runAll={this.state.runAll} />
        <Bubble className="bubble" data={bubbleData} runAll={this.state.runAll} />
        <Quick className="quick" data={quickData} runAll={this.state.runAll} />
        <Selection className="selection" data={selectionData} runAll={this.state.runAll} />
        <Merge className="merge" data={mergeData} runAll={this.state.runAll} />
        <Cycle className="cycle" data={cycleData} runAll={this.state.runAll} />
      </div >
    );
  }

}

export default App;