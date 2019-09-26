import React, {Component} from 'react'
import StepZilla from "react-stepzilla";

import './Wizard.scss';
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";

export default class Wizard extends Component {

  constructor(props) {
    super(props);
    this.steps = [
      {name: 'Step 1', component: <Step1 />},
      {name: 'Step 2', component: <Step2 />},
    ];
  }

  render() {
    return (
      <div className="wordproof-onboarding-wizard bg-gray-300">
        <div className="container p-12 bg-white rounded-lg max-w-3xl">
          <div className='step-progress'>
            <StepZilla steps={this.steps} showNavigation={false} />
          </div>
        </div>
      </div>
    );
  }
}