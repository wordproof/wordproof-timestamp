import React, {Component} from 'react'
import axios from 'axios';
import Intro from '../Intro';
import TextField from "../../Form/TextField";

export default class Step2 extends Component {

  constructor(props) {
    super(props);
    // this.handleChange = this.props.handleChange.bind(this);
  }

  async validate() {
    const token = this.props.get('site_token');
    console.log(token);
    const authorization = `Authorization: Bearer ${token}`;
    // try {
    //   const response = await axios.get(wordproof.wsfyApiUri + wordproof.wsfyValidateTokenEndpoint, { headers: { authorization } });
    //   console.log(response);
    //   // this.props.nextStep();
    // } catch (error) {
    //   console.error(error);
    // }
  }

  render() {
    return (
      <div className="wordproof-wizard-step container">
        <Intro title="Connect WordProof to your website"
               subtitle="Create a WordProof account and paste your site key. Start your 14-day trial today."/>

        <button className={'secondary mb-4'}>Create WordProof Account</button>

        <TextField slug={'site_token'} question={'What is your site key?'} extra={'Your site key is visible after you have created your account.'}
                   handleChange={this.props.update}/>

        <button className={'primary'} onClick={() => this.validate()}>Validate & Continue</button>
      </div>
    );
  }
}
