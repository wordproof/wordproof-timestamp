import React, {Component} from 'react'
import Intro from '../Intro';

export default class Step5 extends Component {
  render() {
    return (
      <div className="wordproof-wizard-step container">
        <Intro title="Great Job!"
               subtitle="The link which opens the Blockchain Certificate pop-up is visable under all timestamped content."/>

        <button className={'primary'} onClick={this.save}>Finish Setup</button>
      </div>
    );
  }
}
