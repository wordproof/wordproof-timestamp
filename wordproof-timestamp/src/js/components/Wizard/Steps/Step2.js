import React, {Component} from 'react'
import axios from 'axios';
import Intro from '../Intro';
import TextField from "../../Form/TextField";

export default class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  deactivate() {
      this.props.update(null, 'wsfy_is_active', false);
      this.props.nextStep();
  }

  async validate() {
    const token = this.props.get('site_token');
    const config = {
      headers: {'Authorization': "Bearer " + token}
    };
    try {
      const response = await axios.get(wordproof.urls.api + wordproof.wsfyValidateTokenEndpoint, config);

      if (response.status === 200 && response.data.success && response.data.site_id) {
          this.props.update(null, 'site_id', response.data.site_id);
          this.props.update(null, 'wsfy_is_active', true);

          if (response.data.balance)
            this.props.update(null, 'balance', response.data.balance);

          //todo show error/success callback
          this.props.nextStep();
      } else {
        this.setState({error: 'This should not have happened. Please contact us.'});
      }

    } catch (error) {
      if (error.response.status === 401 && error.response.data && error.response.data.message === 'Unauthenticated.') {
        this.setState({error: 'The key you have filled in is not correct.'});
      }
    }
  }

  render() {
    return (
      <div className="wordproof-wizard-step">
        <Intro title="Connect WordProof to your website"
               subtitle="Paste your site key to connect your site to My WordProof. Create a free account if you don’t have one yet."/>

        <a className="wbtn wbtn-secondary mb-4 inline-block" href={`${wordproof.urls.signup}?source=${wordproof.urls.site}`} target="_blank" rel="noopener noreferrer">
            Create My WordProof Account
        </a>

        <TextField slug={'site_token'} question={'What is your site key?'} extra={'Your site key is visible after you have created your account.'}
                   update={this.props.update} get={this.props.get} initial={this.props.initial} error={this.state.error}/>

          {(wordproof.currentValues.isWSFYActive) &&
            <span className={'block underline cursor-pointer text-xs text-gray-500 mb-3'} onClick={() => this.deactivate()}>Click here to deactivate automatic timestamping</span>
          }

        <button className={'wbtn wbtn-primary'} onClick={() => this.validate()}>Validate & Continue</button>
      </div>
    );
  }
}
