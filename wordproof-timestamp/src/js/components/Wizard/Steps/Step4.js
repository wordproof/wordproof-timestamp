import React, {Component} from 'react'
import Intro from '../Intro';
import TextField from "../../Form/TextField";

export default class Step4 extends Component {

  constructor(props) {
    super(props);
  }

  save() {

  }

  render() {
    return (
      <div className="wordproof-wizard-step container">
        <Intro title="Certificate Link"
               subtitle="The link which opens the Blockchain Certificate pop-up is visable under all timestamped content."/>

        <TextField slug={'certificate_text'} question={'Link Text'} />

        <button className={'primary'} onClick={() => this.save()}>Finish Setup</button>
      </div>
    );
  }
}
