import React, {Component} from 'react'
import Intro from '../Intro';

export default class Step2 extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="wordproof-wizard-step container">
        <Intro title="Connect WordProof to your website"
               subtitle="Create a WordProof account and paste your site key. Start your 14-day trial today."/>

        <button className={'secondary mb-4'}>Create WordProof Account</button>

        <div className="mb-2">
          <label className="block" htmlFor="site-key">
            What is your site key?
          </label>
          <span>Your site key is visable after you have created your account.</span>
          <input className="" id="site-key" type="text" placeholder="ey123"/>
        </div>

        <button className={'primary'}>Validate Site Key</button>
      </div>
    );
  }
}