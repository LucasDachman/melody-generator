import React from 'react'

class KeyRow extends React.Component {
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
            key={col}/>
          })}
        </div>
      </section>

    );
  }
}

const Step = ({ isBlack, isActive, onClick }) => {
  const className = ['piano-cell',
    isBlack ? 'black' : 'white',
    isActive ? 'active' : 'inactive'
  ].join(' ');
  return (
    <span className={className} onClick={onClick}></span>
  )
}

export default KeyRow;