import React, { Component } from 'react'

import { accountNameValid, checkAccountAvailability, generateKeyPair } from '../../../eos/eos'

export default class GenerateKeys extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextable: false, //TODO: Set back to false
      accountName: '',
      ownerKeys: {
        private: '',
        public: ''
      },
      activeKeys: {
        private: '',
        public: ''
      }
    }
  }

  nextStep = () => {
    this.props.onNext()
  }

  validateName = async (event) => {
    this.setState({nextable: false, accountName: event.target.value})
    this.props.clearMessage()
    const account = event.target.value
    if (!accountNameValid(account)) { return false }

    let available = await checkAccountAvailability(account)
    if (!available) {
      this.showMessage('Account is unavailable.', 'error') 
      return false 
    }

    this.setState({nextable: true})
    this.props.onValidAccountName(account)
    return true
  }

  generateOwnerPair = async () => {
    const keys = await generateKeyPair()
    this.setState({ownerKeys: keys})
    this.props.onGenerateKeys(this.state.ownerKeys, this.state.activeKeys)
  }

  generateActivePair = async () => {
    const keys = await generateKeyPair()
    this.setState({activeKeys: keys})
    this.props.onGenerateKeys(this.state.ownerKeys, this.state.activeKeys)
  }

  showMessage = (message, status) => {
    this.props.showMessage(message, status)
  }

  render() {
    return (
      <div className="step-content">
        <div>
          <div className="information">
            Enter the account name you would like and we&apos;ll let you know if it&apos;s available. 
            It cannot exceed 12 characters in length and can only consist of the letters a-z and numbers 1-5.
          </div>
          <div className="input-group">
            <label className="label" htmlFor="account-name">Account Name</label>
            <input name="account-name" id="account-name" className="regular-text" onChange={this.validateName} type="text"/>
            <span>{this.state.accountName.length}/12</span>
          </div>

          <div className="input-group">
            <label className="label" htmlFor="owner-public-key">Owner Public Key</label>
            <input name="owner-public-key" id="owner-public-key" className="regular-text" type="text" value={this.state.ownerKeys.public}/>
            <button className="button" type="button" onClick={this.generateOwnerPair}><i className="dashicons dashicons-controls-repeat"></i></button>
          </div>

          <div className="input-group">
            <label className="label" htmlFor="active-public-key">Active Public Key</label>
            <input name="active-public-key" id="active-public-key" className="regular-text" type="text" value={this.state.activeKeys.public}/>
            <button className="button" type="button" onClick={this.generateActivePair}><i className="dashicons dashicons-controls-repeat"></i></button>
          </div>
        </div>

        <div className="final-row">
          <button className="button next" type="button" onClick={this.nextStep} disabled={!this.state.nextable}>Next</button>
        </div>
      </div>
    )
  }
}
