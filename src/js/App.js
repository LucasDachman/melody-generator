import React, { Component } from 'react';
import PianoRoll from './PianoRoll'

class App extends Component {
  render() {
    return (
      <main className="app">
        <PianoRoll numRows={12} numCols={8}></PianoRoll> 
      </main>
    );
  }
}

export default App;
