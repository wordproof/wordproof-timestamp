import React, { Component } from 'react'
import './Onboarding.scss'
import StoreKeys from './StoreKeys/StoreKeys';
import ConfirmRequest from './ConfirmRequest/ConfirmRequest';
import GenerateKeys from './GenerateKeys/GenerateKeys';
import Message from './Message/Message';

export default class Onboarding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      accountName: '',
      ownerKeys: {
        private: '',
        public: ''
      },
      activeKeys: {
        private: '',
        public: ''
      },
      message: null
    }
  }

  incrementActiveStep = () => {
    let activeStep = this.state.activeStep + 1
    this.setState({activeStep: activeStep})
  }

  isActive = (index) => {
    return index === this.state.activeStep
  }

  setKeys = (owner, active) => {
    this.setState({
      ownerKeys: owner,
      activeKeys: active
    })
  }

  setAccountName = (account) => {
    this.setState({accountName: account})
  }

  showMessage = (message, status = 'error') => {
    this.setState({ message: { message: message, status: status} })
  }

  clearMessage = () => {
    this.setState({message: null})
  }

  showStep = () => {
    if (this.state.activeStep === 1) {
      return <StoreKeys ownerKeys={this.state.ownerKeys}
                        activeKeys={this.state.activeKeys}
                        onNext={this.incrementActiveStep} />
    } else if (this.state.activeStep === 2) {
      return <ConfirmRequest  accountName={this.state.accountName}
                              ownerKey={this.state.ownerKeys.public}
                              activeKey={this.state.activeKeys.public}
                              showMessage={this.showMessage}
                              clearMessage={this.clearMessage} />
    } else {
      return <GenerateKeys  onNext={this.incrementActiveStep}
                            onValidAccountName={this.setAccountName}
                            onGenerateKeys={this.setKeys}
                            showMessage={this.showMessage}
                            clearMessage={this.clearMessage} />
    }
  }

  render() {
    return (
      <div className="vo-card onboarding">
      <h3 className="inline">Step 1: Create your free Telos Account</h3>
	  <p>Be sure to keep your <strong>Private Keys</strong> in a safe place.</p>
        <div className="onboarding-container">
          <div className="steps">
            <div className={`step ${this.isActive(0) ? 'active' : ''}`}>
              <span className="title">Account Name & Keys</span>
              <div className="description">Pick a name and generate keys.</div>
            </div>
            <div className={`step ${this.isActive(1) ? 'active' : ''}`}>
              <span className="title">Save Private Keys</span>
              <div className="description">Backup your private keys.</div>
            </div>
            <div className={`step ${this.isActive(2) ? 'active' : ''}`}>
              <span className="title">Confirm Request</span>
              <div className="description">Confirm and submit account request.</div>
            </div>
          </div>
          <div className="content-container">
            <div className="message-area">
              { this.state.message ?  <Message message={this.state.message.message} status={this.state.message.status} clearMessage={this.clearMessage}/> : '' }
            </div>
            { this.showStep() }
          </div>
        </div>
      </div>
    )
  }
}
