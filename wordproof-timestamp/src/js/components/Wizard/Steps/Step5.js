import React, {Component} from 'react'
import Intro from '../Intro';

export default class Step5 extends Component {
  render() {
    return (
      <div className="wordproof-wizard-step container">
        <Intro title="Great Job!"
               subtitle="You've completed all the steps!"/>

        <a className={'wproof-button primary inline-block'} href={wordproof.urls.dashboard}>Finish Setup</a>
      </div>
    );
  }
}
