import React, {Component} from 'react'
import Intro from '../Intro';

export default class Step1 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wordproof-wizard-step">
        <Intro title="Welcome to WordProof Timestamp!" subtitle="Let&apos;s get your set up!" />

        <strong className={'mb-2 block'}>Which mode do you want to use?</strong>
        <div className="flex flex-row">
          <div className="border-2 rounded shadow-lg bg-purple-600 text-center p-4 mr-4 w-1/2 text-white">
            <h2 className="font-semibold my-2 text-white">Manual</h2>
            <span className={'italic'}>tech-savvy</span>
            <p>
              Your own blockchain account & wallet<br/>
              Set-up in 15 minutes
            </p>

            <a className="wbtn inline-block mt-3" href={wordproof.urls.manual}>
              Start Configuration
            </a>
          </div>

          <div className="border-2 rounded shadow-lg bg-blue-600 text-center p-4 ml-4 w-1/2 text-white">
            <h2 className="font-semibold my-2 text-white">Automatic</h2>
            <span className={'italic'}>recommended</span>
            <p>
              Easy to use<br/>
              Set-up in 5 minutes
            </p>

            <button className="wbtn inline-block mt-3" onClick={this.props.nextStep}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }
}
