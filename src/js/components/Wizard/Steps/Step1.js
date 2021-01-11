import React, {Component} from 'react'
import Intro from '../Intro';

export default class Step1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  setManual() {
    this.props.update(null, 'wallet_connected', true);
    this.props.update(null, 'wsfy_is_active', false);
    this.setState({loading: true});
    setTimeout(function () {
      window.location.href = wordproof.urls.settings;
    }, 1500);
  }

  render() {
    return (
      <div className="wordproof-wizard-step">
        <Intro title="Welcome to WordProof Timestamp!" subtitle="Let&apos;s get you set up!" />

        <strong className={'mb-2 block text-center'}>Which mode do you want to use?</strong>
        <div className="flex flex-row justify-center">
          <div className="border-2 rounded shadow-lg bg-blue-600 text-center p-4 ml-4 w-1/2 text-white">
            <h2 className="font-semibold my-2 text-white">Automatic</h2>
            <span className={'italic'}>recommended</span>
            <p>
              Easy to use<br/>
              Set-up in 5 minutes
            </p>

            <button disabled={this.state.loading} className="wbtn inline-block mt-3" onClick={this.props.nextStep}>
              Start the set-up
            </button>
          </div>
        </div>

        <div className={`mt-6`}>
          {(this.state.loading)
              ? <span>Redirecting to manual setup...</span>
              : <span>Advanced: <a onClick={() => this.setManual()} className="inline-block cursor-pointer">I want to timestamp manually with my own blockchain account and Scatter</a></span>
          }
        </div>
      </div>
    );
  }
}
