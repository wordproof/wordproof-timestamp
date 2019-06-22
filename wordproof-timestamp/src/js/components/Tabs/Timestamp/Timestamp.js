import React, {Component} from 'react'
import initWallet from '../../../wallet';
import getBonus from '../../../bonus';
import ConnectionWidget from '../../ConnectionWidget/ConnectionWidget';

export default class Timestamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAvailable: '',
      isLoading: true,
      boxClasses: 'box',
      bonusStatus: null,
      bonusIsLoading: null,
      bonusMessage: null,
      bonusBoxClasses: 'box',
      wallet: null,
      accountName: null,
      balance: null,
      buttonsDisabled: true,
      widgetStatus: 'connecting',
      timestampStatus: null,
      timestampCertificateLink: null
    }
  }

  componentDidMount() {
    this.getWallet();
  }

  getWallet = async () => {
    if (this.state.wallet === null) {
      const wallet = initWallet();
      try {
        await wallet.connect();
        if (!wallet.authenticated) {
          await wallet.login();
        }

        this.registerWalletConnection();
        this.setBalance(wallet.accountInfo.account_name);

        this.setState({
          wallet: wallet,
          accountName: wallet.accountInfo.account_name,
          widgetStatus: 'success',
          buttonsDisabled: false
        });
      } catch (error) {
        this.setState({
          widgetStatus: 'failed',
        });
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
      '&security='+ wordproofData.ajaxSecurity,
    }).then((response) => {
      return response.json();
    })
    .catch(error => console.error(error));
  }

   checkBonus = async(accountName, chain) => {
    const bonus = await getBonus(accountName, chain);
    switch(bonus.status) {
      case 'success':
        this.setState({
          bonusStatus: 'success',
          bonusBoxClasses: 'box box-success',
          bonusMessage: bonus.message,
          bonusIsLoading: false
        });
        break;
      case 'failed':
        this.setState({
          bonusStatus: 'failed',
          bonusBoxClasses: 'box box-success',
          bonusMessage: bonus.message,
          bonusIsLoading: false
        });
        break;
      default: //no_change
        this.setState({
          bonusStatus: 'no_change',
          bonusBoxClasses: 'box',
          bonusMessage: bonus.message,
          bonusIsLoading: false,
        });
    }
    console.log('bonus', bonus);
  }

  setBalance = async (accountName) => {
    let result = await fetch(wordproofData.ajaxURL, {
      method: "POST",
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
      body:
      'action=wordproof_get_balance' +
      '&security=' + wordproofData.ajaxSecurity +
      '&accountName=' + accountName,
    }).then((response) => {
      return response.json();
    })
    .catch(error => console.error(error));

    if (result.success) {
      const word = result.balance.replace('.0000', '');
      this.setState({balance: word});
    }
  }

  render() {
    return (
      <div>
        <div className="vo-card">
          <h3>You need WORD to Timestamp (it’s free!)</h3>
          <p>Both as an anti-SPAM measurement and to make sure every timestamp is valuable (all timestamps needs to be processed by nodes in the blockchain and stay there forever), WordProof uses WORD - The digital postage stamp. Think of 1 WORD as 1 postage stamp. For every timestamp you place, you need 1 WORD.</p>
          <p>Every timestamp ‘costs’ 1 WORD, but you get 1 WORD back for every timestamp you place, up to 5 per day. In other words: you can timestamp 5 pieces of content per day for free. This allows websites to get started with timestamping and is an effective measure against SPAM!</p>
          <p>To get started with WordProof Timestamp, you can claim 100 WORD for free. Make sure you create a blockchain account first, because the WORD stamps will be added to your account.</p>
          <a href="https://stamps.wordproof.io" target="_blank" rel="noopener noreferrer" className="button is-primary">Claim 100 WORD for free</a>
          <h3>Scatter connection check & WORD balance</h3>

          <ConnectionWidget status={this.state.widgetStatus} balance={this.state.balance}
                            accountName={this.state.accountName}/>

          { (this.state.bonusIsLoading !== null) ?
          <div className={this.state.bonusBoxClasses}>
            { this.state.bonusIsLoading ?
              <div><div className="wordproof-connecting"><img className="loading-spinner" height="64px" width="64px" src="/wp-admin/images/spinner-2x.gif" alt="loading" />Connecting...</div></div> : ''
            }
            { this.state.bonusStatus !== null ?
              <p>
                { (this.state.bonusStatus !== 'failed') ? <span className="dashicons dashicons-yes-alt"></span> : <span className="dashicons dashicons-no-alt"></span>}
                { this.state.bonusMessage }
                { (this.state.bonusStatus !== 'failed') ? " You are ready to time-stamp. Make sure to keep your Scatter wallet open and unlocked!" : "" }</p> : ''
            }
          </div> : ''}

          <h3>Help! WordProof Timestamp does not connect to my Scatter Wallet!</h3>
          <p>Blockchain is not an easy subject and uses accounts, wallets and transactions. This is what makes the technology so safe, but also what makes it challenging to create easy-to-use blockchain applications. If the set-up did not work properly, here are a few steps you can take:</p>
          <ol>
            <li>Make sure the Scatter Wallet application is open on your computer and that you unlocked it (entered your passphrase).</li>
            <li>Run the Setup Wizard again and follow each step very carefully. Make sure to save your keys!</li>
          </ol>
        </div>
      </div>
    )
  }
}
