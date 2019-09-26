import React, {Component} from 'react'
import StepWizard from 'react-step-wizard';

import './Wizard.scss';
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";

export default class Wizard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="wordproof-onboarding-wizard bg-gray-300">
        <div className="container p-12 bg-white rounded-lg max-w-3xl">
          <StepWizard isHashEnabled={true}>
            <Step1 hashKey={'mode'} />
            <Step2 hashKey={'connect'} />
          </StepWizard>
        </div>
      </div>
    );
  }
}