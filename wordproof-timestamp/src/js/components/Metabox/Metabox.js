import React, {Component} from 'react';
import initWallet from '../../wallet';
import timestamp from '../../timestamp';
import getBonus from '../../bonus';

export default class Metabox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingClass: '',
      bonusStatus: null,
      bonusMessage: null,
      connected: false,
      disabled: true,
      wallet: null,
      accountName: null,
      noScatter: false,
      failed: false,
      success: false,
      successData: null,
    }
  }

  componentDidMount() {
    this.getWallet();
  }

  handleClick = async () => {
    this.startLoading();
    const wallet = await this.getWallet();
    await this.checkBonus(wallet.auth.accountName, wordproofData.network);

    try {
      if (!wallet.connected) {
        await wallet.connect()
      }
      if (!wallet.authenticated) {
        await wallet.login()
      }

      timestamp(wallet).then(response => response.json())
      .then((result) => {
        if (result.success) {
          this.stopLoading();
          this.setState({
            success: true,
            successData: result.data
          });
        }
      }) // JSON-string from `response.json()` call
      .catch(error => {
        this.stopLoading();
        console.error(error);
      });
    } catch (error) {
      this.stopLoading();
      this.setState({failed: true});
      console.log(error);
    }
  }

  handleDisconnectClick = async () => {
    const wallet = await this.getWallet()
    try {
      if (!wallet.connected) {
        await wallet.connect()
      }
      await wallet.terminate()
      this.setState({failed: false})
    } catch (error) {
      console.log(error)
    }
  }

  startLoading = () => {
    this.setState({loadingClass: 'loading', disabled: true})
  }

  stopLoading = () => {
    this.setState({loadingClass: '', disabled: false});
  }

  getBalance = (accountName) => {
    if (accountName === wordproofData.accountName) {
      return wordproofData.wordBalance;
    } else {
      return false;
      //retrieve balance;
    }
  }

  getWallet = async () => {
    if (this.state.wallet === null) {
      const wallet = initWallet();
      try {
        await wallet.connect();
        if (!wallet.authenticated) {
          await wallet.login();
        }

        console.log(wallet);

        this.registerWalletConnection();
        this.registerAccountname(wallet.accountInfo.account_name);
        const balance = this.getBalance(wallet.accountInfo.account_name);

        this.setState({
          accountName: wallet.accountInfo.account_name,
          balance: balance,
          wallet: wallet,
          disabled: false
        });
      } catch (error) {
        this.setState({noScatter: true});
        console.log(error);
      }
    }
    return this.state.wallet;
  }

  registerWalletConnection = () => {
    return fetch(wordproofData.ajaxURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body:
      'action=wordproof_wallet_connection' +
      '&security=' + wordproofData.ajaxSecurity,
    }).then((response) => {
      return response.json();
    })
    .catch(error => console.error(error));
  }

  registerAccountname = (accountName) => {
    return fetch(wordproofData.ajaxURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body:
      'action=wordproof_save_option' +
      '&security=' + wordproofData.ajaxSecurity +
      '&option=' + 'wordproof_accountname' +
      '&value=' + accountName,
    }).then((response) => {
      return response.json();
    })
    .catch(error => console.error(error));
  }

  checkBonus = async (accountName, chain) => {
    const bonus = await getBonus(accountName, chain);
    console.log(bonus);
    if (bonus.status === 'success') {
      this.setState({
        bonusStatus: 'success',
        bonusMessage: bonus.message,
      });
    } else if (bonus.status === 'failed') {
      this.setState({
        bonusStatus: 'failed',
        bonusMessage: bonus.message,
      });
    }
  }

  render() {
    return (
      <div className="wordproof-metabox">
        {this.state.noScatter ?
          <p>No EOSIO wallet detected. Open you wallet or <a href={wordproofData.settingsURL}>download an EOSIO wallet
            now</a>.</p> : ''
        }

        {this.state.failed ?
          <p>No EOSIO wallet detected. Open you wallet or <a href={wordproofData.settingsURL}>download an EOSIO wallet
            now</a>.</p> : ''
        }

        {this.state.accountName ?
          <div>Logged in as <strong>{this.state.wallet.accountInfo.account_name}</strong></div> : ''
        }
        {this.state.balance ?
          <div>You have <strong>{this.state.balance}</strong></div> : "It seems you don't have WORD stamps yet."
        }

        {(this.state.bonusStatus === 'success' || this.state.bonusStatus === 'failed') ?
          <p>{this.state.bonusMessage}</p> : ''}

        {this.state.disabled ?
          <div className="wordproof-connecting"><img className="loading-spinner" height="64px" width="64px"
                                                     src="/wp-admin/images/spinner-2x.gif" alt="loading"/>Connecting...
          </div> : ''
        }

        <br/>
        {!this.state.success ?
          <div>
            <button type="button" className={`button ${this.state.loadingClass}`} onClick={this.handleClick}
                    disabled={this.state.disabled}>Timestamp Post
            </button>
            <button type="button" className={`button ${this.state.loadingClass}`} onClick={this.handleDisconnectClick}
                    disabled={this.state.disabled}>Disconnect
            </button>
          </div>
          :
          <p>Success! <a target="_blank" rel="noopener noreferrer" href={this.state.successData.url}>Link to proof</a>
          </p>
        }
      </div>
    )
  }
}
