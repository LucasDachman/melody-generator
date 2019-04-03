import React from 'react';
import KeyRow from './KeyRow';
import { isBlack } from './NotesUtil';

class PianoRoll extends React.Component {

  onClickStep(row, col) {

  }

  render() {
    const steps = this.props.composition;
    const { notes, onClickStep, onClickKey, updateProbability } = this.props;
    // C4 to A5

    return (
      <div className='piano-roll'>
        <section className='piano-roll-keys'>
          {notes.map((n) => {
            const className = ['piano-key', isBlack(n) ? 'black' : 'white'].join(' ');
            return (
              <div className={className}
                onClick={() => onClickKey(n)}
                key={n.name}>
                <p>{n.name}</p>
              </div>
            );
          })}
        </section>
        <section className="piano-roll-editor">
          {notes.map((n, row) => {
            return <KeyRow name={n.name}
              steps={steps[row]}
              black={isBlack(n)}
              onClick={(col) => onClickStep(row, col)}
              updateProbability={(col, value) => updateProbability(row, col, value)}
              key={row} />
          })}
        </section>
      </div>
    );
  }
}

export default PianoRoll;