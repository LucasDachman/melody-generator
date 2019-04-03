import React from 'react';
import KeyRow from './KeyRow';
import { generateNotes, isBlack } from './NotesUtil';

class PianoRoll extends React.Component {

  onClickStep(row, col) {

  }

  render() {
    const steps = this.props.composition;
    // C4 to A5
    const notes = generateNotes(60, 60 + steps.length);

    return (
      <div className='piano-roll'>
        <section className='piano-roll-keys'>
          {notes.map((n) => {
            const className = ['piano-key', isBlack(n) ? 'black' : 'white'].join(' ');
            return (
              <div className={className}
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
              onClick={(col) => this.props.onClickStep(row, col)}
              key={row} />
          })}
        </section>
      </div>
    );
  }
}

export default PianoRoll;