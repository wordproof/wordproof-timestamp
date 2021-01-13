import React from 'react'
import ReactDOM from 'react-dom'
import Wizard from "./components/Wizard/Wizard";

if (document.querySelector('#wordproof-onboarding-wizard')) {
  ReactDOM.render(<Wizard/>, document.querySelector('#wordproof-onboarding-wizard'));
}