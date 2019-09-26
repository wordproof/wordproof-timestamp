import React, {Component} from 'react'
import Intro from '../Intro';

export default class Step1 extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="wordproof-wizard-step container">
        <Intro title="Welcome to WordProof Timestamp!" subtitle="Let's get you set up!" />

        <h3>Which mode do you want to use?</h3>
        <div className="flex flex-row my-4">
          <div className="border-2 rounded text-center p-4 mr-4">
            <h2 className="font-semibold my-2">Manuel</h2>
            <p>
              Tech-savy mode<br/>
              Configure you own blockchain account & wallet<br/>
              Set-up in 20 minutes
            </p>

            <button className="">
              Start Configuration
            </button>
          </div>

          <div className="border-2 rounded text-center p-4 ml-4">
            <h2 className="font-semibold my-2">Automatic</h2>
            <p>
              Activate & never look back<br/>
              Download your blockchain certificates<br/>
              Set-up in 5 minutes
            </p>

            <button className="primary" onClick={this.props.nextStep}>
              Start Trial
            </button>
          </div>
        </div>
      </div>
    );
  }
}