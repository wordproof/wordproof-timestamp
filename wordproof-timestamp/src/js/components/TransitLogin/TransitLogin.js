import React, { Component } from 'react'
import getWallet from '../../wallet'

export default class TransitLogin extends Component {

  logWallet = () => {
    const wallet = getWallet()
    console.log(wallet)
  }

  handleClick = async () => {
    const wallet = getWallet()
    try {
      await wallet.connect()
      const accountInfo = await wallet.login()
      console.log('Logged in!', accountInfo)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <button type="button" className="button" onClick={this.handleClick}>Login with Scatter</button>
        <button type="button" className="button" onClick={this.logWallet}>Log Wallet</button>
      </div>
    )
  }
}
