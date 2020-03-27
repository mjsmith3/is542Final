import React from 'react';
import Insertion from '../insertion/insertion'
import Bubble from '../bubble/bubble'
import './App.css';

function App() {
  let data = [];
  for (let i = 0; i < 100; i++) {
      data.push(Math.random())
  }

  return (
    <div className="App">
      <Insertion data={data}/>
      <Bubble data={data}/>
    </div>
  );
}

export default App;
