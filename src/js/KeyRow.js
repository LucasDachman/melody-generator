import React from 'react';

class KeyRow extends React.PureComponent {

  onWheel = (e, col) => {
    const { updateProbability, steps } = this.props;
    let oldProb = steps[col].probability;
    if (e.deltaY > 0 && oldProb < 100) {
      updateProbability(col, oldProb + 1);
    } 
    else if (e.deltaY < 0 && oldProb > 1) {
      updateProbability(col, oldProb - 1);
    }
  }

  render() {
    const { steps, isBlack, onClick } = this.props;
    const className = this.props.black ? "black" : "white";
    return (
      <section className={`key-row ${className}`}>
        <div className='steps-row'>
          {steps.map((step, col) => {
            return <Step isBlack={isBlack}
              isActive={step.isActive}
              onClick={() => onClick(col)}
              onWheel={(e) => this.onWheel(e, col)}
              probability={step.probability}
              key={col} />
          })}
        </div>
      </section>
    );
  }
}

const Step = ({ isBlack, isActive, onClick, onWheel, probability}) => {
  const className = ['piano-cell',
    isBlack ? 'black' : 'white',
    isActive ? 'active' : 'inactive'
  ].join(' ');
  return (
    <span className={className}
      onClick={onClick}
      onWheel={isActive ? onWheel : null}>
      {isActive && <p>{probability}</p>}
    </span>
  )
};

export default KeyRow;