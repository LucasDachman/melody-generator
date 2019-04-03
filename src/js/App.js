import React, { Component } from 'react';
import _ from 'lodash';
import PianoRoll from './PianoRoll'
import { generateNotes } from './NotesUtil';
import Synth from './Synth';

const numNotes = 12;
const numSteps = 8;

class App extends Component {
  notes = generateNotes(60, 60 + numNotes);
  synth = new Synth();

  constructor(props) {
    super(props);
    let composition = new Array(numNotes)
      .fill(null)
      .map((_, i) => new Array(numSteps).fill(null)
        .map(() => ({ isActive: false, note: this.notes[i] }))
      );
    this.state = {
      composition: composition
    };
  }

  createSequence() {
    const chords = _.zip(...this.state.composition)
      .map((noteRow) => {
        return noteRow.reduce((acc, curr) => {
          return curr.isActive ? [...acc, curr.note.name] : acc;
        }, []);
      });
    this.synth.setNotes(chords);
  }

  onCompChange = (row, col) => {
    this.setState((state) => {
      const newComp = _.cloneDeep(state.composition);
      newComp[row][col].isActive = !(newComp[row][col].isActive);
      return { composition: newComp };
    }, () => {
      this.createSequence();
    });
  }

  playKey = (note) => {
    console.log(`playing note: ${note.name}`)
    this.synth.playNote(note.name);
  }

  render() {
    return (
      <main className="app">
        <PianoRoll notes={this.notes}
          composition={this.state.composition}
          onClickStep={this.onCompChange}
          onClickKey={this.playKey} />
        <button onClick={this.synth.start}>Play</button>
        <button onClick={this.synth.stop}>Stop</button>
      </main>
    );
  }
}

export default App;
