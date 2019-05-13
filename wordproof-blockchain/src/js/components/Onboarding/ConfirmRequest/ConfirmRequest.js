import React, { Component } from 'react'

import { createAccount } from '../../../eos/eos'
import { getAccount } from '../../../eos/api'

export default class ConfirmRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonDisabled: false,
      loading: false
    }
  }

  confirm = async () => {
    this.setState({ buttonDisabled: true, loading: true })
    await createAccount(this.props.accountName, this.props.ownerKey, this.props.activeKey)
    const account = await this.pollAccount(10)
    if (account) {
      this.props.showMessage(`Account ${account.account_name} succesfully created.`, 'notice')
    } else {
      this.props.showMessage(`Something went wrong while creating your account.`)
    }
    this.setState({ loading: false })
  }

  pollAccount = async (tries) => {
    let account
    let amount = 0
    while(amount < tries) {
      const response = await getAccount(this.props.accountName)
      if (response !== null) {
        account = response
        break
      } else {
        await this.timeout(500)
      }
      amount++
    }
    return account
  }

  timeout = (ms) => {
    return new Promise(resolve => {
      setTimeout(() => { 
        console.log('Checking if account exists')
        resolve()
      }, ms)
    })
  }

  render() {
    return (
      <div className="step-content">
          <div className="information">
            Account requests are supported by the generous EOSIO community for the specific blockchain you&apos;ve selected, 
            by keeping the &apos;freesqrlacct&apos; funded with enough tokens to support account creation. 
            If this account doesn&apos;t have enough tokens, your account creation request may fail.
          </div>

          <div className="input-group">
            <label className="label">Account Name</label>
            {this.props.accountName}
          </div>

          <div className="input-group">
            <label className="label">Owner Public Key</label>
            {this.props.ownerKey}
          </div>

          <div className="input-group">
            <label className="label">Active Public Key</label> 
            {this.props.activeKey}
          </div>

          <div className="final-row">
            {this.state.loading ? 'Creating account...' : ''}
            <button className="button next" type="button" onClick={this.confirm} disabled={this.state.buttonDisabled}>Create Account</button>
          </div>
      </div>
    )
  }
}
