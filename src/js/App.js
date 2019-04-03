import React, { Component } from 'react';
import _ from 'lodash';
import PianoRoll from './PianoRoll'

const numRows = 12;
const numCols = 8;

class App extends Component {
  constructor(props) {
    super(props);

    this.onCompChange = this.onCompChange.bind(this);

    let composition = new Array(numRows)
      .fill(null)
      .map(() => new Array(numCols).fill(null)
        .map(() => ({ isActive: false }))
      );
    this.state = {
      composition: composition
    }
  }

  onCompChange(row, col) {
    this.setState((state) => {
      const newComp = _.cloneDeep(state.composition);
      newComp[row][col].isActive = !(newComp[row][col].isActive);
      return { composition: newComp };
    });
  }

  render() {
    return (
      <main className="app">
        <PianoRoll composition={this.state.composition}
          onClickStep={this.onCompChange} />
      </main>
    );
  }
}

export default App;
