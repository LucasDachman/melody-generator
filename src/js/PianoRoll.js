import React from 'react';
import _ from 'lodash';
import KeyRow from './KeyRow';
import { generateNotes, isBlack } from './NotesUtil';

class PianoRoll extends React.Component {
  constructor(props) {
    super(props);
    let steps = new Array(props.numRows)
      .fill(null)
      .map(() => new Array(props.numCols).fill(null)
        .map(() => ({ isActive: false }))
      );
    this.state = {
      steps: steps
    }
  }

  onClickStep(row, col) {
    console.log(row, col);

    this.setState((state) => {
      const newSteps = _.cloneDeep(state.steps);
      console.log(newSteps);
      newSteps[row][col].isActive = !(newSteps[row][col].isActive);
      return { steps: newSteps };
    }, () => {
    })
  }

  render() {
    const { steps } = this.state;
    const { numRows } = this.props;
    // C4 to A5
    const notes = generateNotes(60, 60 + numRows).reverse();

    return (
      <section className="piano-roll">
        {notes.map((n, row) => {
          return <KeyRow name={n.name}
            steps={steps[row]}
            black={isBlack(n)}
            onClick={(col) => this.onClickStep(row, col)}
            key={row} />
        })}
      </section>
    );
  }
}

export default PianoRoll;