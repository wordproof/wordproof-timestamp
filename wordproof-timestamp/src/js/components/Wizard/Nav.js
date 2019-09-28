import React from 'react'

const Nav = (props) => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    const isDone = props.currentStep > i;
    dots.push((
      <span
        key={`step-${i}`}
        className={`rounded-full h-3 w-3 bg-gray-500 ${isDone ? 'bg-green-400': ''} ${isActive ? 'bg-green-400': ''}`}>
      </span>
    ));
  }

  return (
    <div className={`flex flex-row justify-around mb-8`}>{dots}</div>
  );
};

export default Nav;
