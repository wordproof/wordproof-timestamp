import React, {Component} from 'react'
import StepWizard from 'react-step-wizard';

import './Wizard.scss';
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";

class Wizard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="wordproof-onboarding-wizard">
        <div className="container">
          <StepWizard isHashEnabled={true}>
            <Step1 hashKey={'mode'} />
            <Step2 hashKey={'connect'} />
          </StepWizard>
        </div>
      </div>
    );
  }
}

export default Wizard;
