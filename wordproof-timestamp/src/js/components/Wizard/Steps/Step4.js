import React, {Component} from 'react'
import Intro from '../Intro';
import TextField from "../../Form/TextField";

export default class Step4 extends Component {

  save() {
    this.props.nextStep();
  }

  render() {
    return (
      <div className="wordproof-wizard-step">
        <Intro title="Certificate Link"
               subtitle="The link which opens the Blockchain Certificate pop-up is visable under all timestamped content."/>

        <TextField slug={'certificate_text'} question={'Link Text'} update={this.props.update} get={this.props.get} initial={this.props.initial} />

        <button className={'wbtn wbtn-primary'} onClick={() => this.save()}>Save & Continue</button>
      </div>
    );
  }
}
