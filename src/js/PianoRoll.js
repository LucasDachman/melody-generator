import React from 'react';
import KeyRow from './KeyRow';
import { isBlack } from './NotesUtil';

class PianoRoll extends React.Component {

  onClickStep(row, col) {

  }

  render() {
    const steps = this.props.composition;
    const { notes } = this.props;
    // C4 to A5

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