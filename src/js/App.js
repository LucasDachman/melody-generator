import React, { Component } from 'react';
import _ from 'lodash';
import PianoRoll from './PianoRoll'
import { generateNotes } from './NotesUtil';
import Synth from './Synth';

const numNotes = 24;
const numSteps = 8;
const startNote = 36;

class App extends Component {
  notes = generateNotes(startNote, startNote + numNotes);
  synth = new Synth();

  constructor(props) {
    super(props);
    let composition = new Array(numNotes)
      .fill(null)
      .map((_, i) => new Array(numSteps).fill(null)
        .map(() => ({
          isActive: false,
          note: this.notes[i],
          probability: 100
        }))
      );
    this.state = {
      composition: composition
    };
  }

  createSequence() {
    const chords = _.zip(...this.state.composition)
      .map((noteRow) => {
        return noteRow.reduce((acc, curr) => {
          return curr.isActive ? [...acc, _.pick(curr, ['note.name', 'probability'])] : acc;
        }, []);
      });

    this.synth.setNotes(chords);
  }

  toggleCell = (row, col) => {
    this.setState((state) => {
      const newComp = _.cloneDeep(state.composition);
      const cell = newComp[row][col];
      cell.isActive = !(cell.isActive);
      if (!cell.isActive) cell.probability = 100;
      return { composition: newComp };
    }, () => {
      this.createSequence();
    });
  }

  updateProbability = (row, col, value) => {
    this.setState((state) => {
      const newComp = _.cloneDeep(state.composition);
      newComp[row][col].probability = value;
      return { composition: newComp };
    }, () => {
      this.createSequence();
    })
  }

  playKey = (note) => {
    this.synth.playNote(note.name);
  }

  clear = () => {
    this.setState((state) => {
      const newComp = _.cloneDeep(state.composition);
      newComp.forEach(row => {
        row.forEach(el => {
          el.isActive = false;
          el.probability = 100;
        });
      });
      return { composition: newComp };
    }, () => {
      this.createSequence();
    });
  }

  render() {
    return (
      <main className="app">
        <PianoRoll notes={this.notes}
          composition={this.state.composition}
          onClickStep={this.toggleCell}
          updateProbability={this.updateProbability}
          onClickKey={this.playKey} />
        <button onClick={this.synth.start}>Play</button>
        <button onClick={this.synth.stop}>Stop</button>
        <button onClick={this.clear}>Clear</button>
      </main>
    );
  }
}

export default App;
