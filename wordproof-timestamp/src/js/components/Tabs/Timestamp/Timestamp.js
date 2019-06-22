import React, {Component} from 'react'
import initWallet from '../../../wallet';
import ConnectionWidget from '../../ConnectionWidget/ConnectionWidget';

export default class Timestamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAvailable: '',
      isLoading: true,
      boxClasses: 'box',
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
          <p>Both as an anti-SPAM measurement and to make sure every timestamp is valuable (all timestamps needs to be processed by nodes in the blockchain and stay there forever), WordProof uses WORD - The digital postage stamp. Think of <strong>1 WORD as 1 postage stamp</strong>. For every timestamp you place, you need 1 WORD.</p>
          <p>Every timestamp ‘costs’ 1 WORD, but you get 1 WORD back for every timestamp you place, up to 5 per day. In other words: <strong>you can timestamp 5 pieces of content per day for free</strong>strong>. This allows websites to get started with timestamping and is an effective measure against SPAM!</p>
          <p>To get started with WordProof Timestamp, you can claim <strong>100 WORD</strong> for free. Make sure you create a blockchain account first, because the WORD stamps will be added to your account.</p>
          <a href="https://stamps.wordproof.io" target="_blank" rel="noopener noreferrer" className="button is-primary">Claim 100 WORD for free</a>
          <h3>Scatter connection check & WORD balance</h3>
          <p>Open and unlock your Scatter wallet to check if the setup was successfull: the widget below should color GREEN. You can also see your WORD balance (after timestamping your first post).</p>

          <ConnectionWidget status={this.state.widgetStatus} balance={this.state.balance}
                            accountName={this.state.accountName}/>

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
