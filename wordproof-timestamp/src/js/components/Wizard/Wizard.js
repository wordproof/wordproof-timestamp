import React, {Component} from 'react'
import StepWizard from 'react-step-wizard';

import './Wizard.scss';
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

export default class Wizard extends Component {

  constructor(props) {
    super(props);
    this.transitions = {};
  }

  render() {
    return (
      <div className="wordproof-onboarding-wizard bg-gray-300">
          <StepWizard transitions={this.transitions} isHashEnabled={true}>
            <Step1 hashKey={'mode'} />
            <Step2 hashKey={'connect'} />
            <Step3 hashKey={'customize'} />
          </StepWizard>
      </div>
    );
  }
}
