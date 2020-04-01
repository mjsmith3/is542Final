import React, { Component } from 'react';
import Insertion from '../insertion/insertion'
import Bubble from '../bubble/bubble'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }

    this.runAll = this.runAll.bind(this);
    this.randomize = this.randomize.bind(this);
    this.nearlySorted = this.nearlySorted.bind(this);
    this.fewUnique = this.fewUnique.bind(this);
  }



  componentDidMount() {

  }


  runAll() {
    console.log("run all");
  }

  randomize() {
    let newdata = [];
    for (let i = 0; i < 50; i++) {
      newdata.push(Math.random())
    }

    this.setState({ data: newdata })
  }

  nearlySorted() {
    console.log("nearly Sorted");
  }

  fewUnique() {
    let fewUnique = [];
    for (let i = 0; i < 5; i++) {
      fewUnique.push(Math.random())
    }

    let newdata = [];
    for (let i = 0; i < 50; i++) {
      newdata.push(fewUnique[i % 5])
    }

    this.setState({ data: newdata })
  }



  render() {
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
              <Button variant="contained" className="headerButton" onClick={this.randomize}>Randomize</Button>
              <Button variant="contained" className="headerButton" onClick={this.fewUnique}>Few Unique</Button>
              <Button variant="contained" className="headerButton" onClick={this.nearlySorted}>Nearly Sorted</Button>
              <Button variant="contained" className="headerButton" onClick={this.runAll}>Run All</Button>
            </span>

          </Toolbar>
        </AppBar>
        <Insertion className="insertion" data={this.state.data} />
        <Bubble className="bubble" data={this.state.data} />


      </div>
    );
  }

}

export default App;
