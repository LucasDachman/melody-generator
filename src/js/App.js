import React, { Component } from 'react';
import _ from 'lodash';
import PianoRoll from './PianoRoll'
import { generateNotes } from './NotesUtil';

const numNotes = 12;
const numSteps = 8;

class App extends Component {
  constructor(props) {
    super(props);

    this.onCompChange = this.onCompChange.bind(this);

    this.notes = generateNotes(60, 60 + numNotes);

    let composition = new Array(numNotes)
      .fill(null)
      .map(() => new Array(numSteps).fill(null)
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
        <PianoRoll notes={this.notes}
          composition={this.state.composition}
          onClickStep={this.onCompChange} />
      </main>
    );
  }
}

export default App;
