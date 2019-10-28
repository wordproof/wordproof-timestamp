import React from 'react'

const Nav = (props) => {
    const dots = [];
    for (let i = 1; i <= props.totalSteps; i += 1) {
        const isActive = props.currentStep === i;
        const isDone = props.currentStep > i;
        dots.push((
            <div className={`flex flex-col items-center`} key={`step-${i}`}>
                <span className={`text-gray-500 pb-3`}>{props.labels[i]}</span>
                <span className={`h-4 w-4 p-2 bg-blueish`}>
                    <span
                        className={`block rounded-full w-full h-full bg-gray-500 ${isDone ? 'bg-wordproof' : ''} ${isActive ? 'bg-wordproof' : ''}`}>
                </span>
                </span>
            </div>
        ));
    }

    return (
        <div className={`mt-16 mb-8`}>
            <div className={`flex flex-row justify-between`}>
                {dots}
            </div>
            <hr className={`relative m-0 border-gray-400`} style={{top: '-16px', zIndex: '-1'}} />
        </div>
    );
};

export default Nav;
