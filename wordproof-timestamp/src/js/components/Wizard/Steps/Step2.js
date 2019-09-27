import React, {Component} from 'react'
import Intro from '../Intro';
import TextField from "../../Form/TextField";

export default class Step2 extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  validate() {
    this.props.nextStep();
  }

  render() {
    return (
      <div className="wordproof-wizard-step container">
        <Intro title="Connect WordProof to your website"
               subtitle="Create a WordProof account and paste your site key. Start your 14-day trial today."/>

        <button className={'secondary mb-4'}>Create WordProof Account</button>

        <TextField slug={'site-key'} question={'What is your site key?'} extra={'Your site key is visible after you have created your account.'} />

        <button className={'primary'} onClick={() => this.validate()}>Validate Site Key</button>
      </div>
    );
  }
}
