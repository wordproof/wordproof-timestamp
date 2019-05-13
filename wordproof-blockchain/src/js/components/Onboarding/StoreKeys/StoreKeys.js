import React, { Component } from 'react'

export default class StoreKeys extends Component {
  constructor(props) {
    super(props)
  }
  nextStep = () => {
    this.props.onNext()
  }

  render() {
    return (
      <div className="step-content">
        <div>
          <div className="information">
            Please save your newly created public and private keys below in safe location (offline storage is highly recommended). 
            WordProof generates these keys using EOSIO&apos;s cryptographic library. However, the keys never get saved. Therefore, if you lose the keys they cannot be recovered by WordProof.
          </div>
          <div className="input-group">
            <label className="label">Owner Public Key</label>
            {this.props.ownerKeys.public}
          </div>

          <div className="input-group">
            <label className="label">Owner Private Key</label> 
            {this.props.ownerKeys.private}
          </div>

          <div className="input-group">
            <label className="label">Active Public Key</label>
            {this.props.activeKeys.public}
          </div>

          <div className="input-group">
            <label className="label">Active Private Key</label>
            {this.props.activeKeys.private}
          </div>
        </div>
        <div className="final-row">
          <button className="button next" type="button" onClick={this.nextStep}>Keys are in a safe place</button>
        </div>
      </div>
    )
  }
}
