import React from 'react';
import Insertion from '../insertion/insertion'
import Bubble from '../bubble/bubble'
import './App.css';

function App() {
  let data1 = [];
  let data2 = [];
  for (let i = 0; i < 100; i++) {
    data1.push(Math.random())
  }

  data2 = [...data1]

  return (
    <div className="App">
      <Insertion data={data1} />
      <Bubble data={data2} />
    </div>
  );
}

export default App;
