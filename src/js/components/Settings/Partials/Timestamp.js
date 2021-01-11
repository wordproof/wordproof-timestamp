import React, {Component} from 'react'
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';

import initWallet from '../../../lib/wallet';
import ConnectionWidget from '../../ConnectionWidget/ConnectionWidget';

class Timestamp extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

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
    const {cookies} = this.props;
    const networkChanged = cookies.get('admin_network_changed', {path: '/'});
    if (networkChanged) {
      cookies.remove('admin_network_changed', {path: '/'});
      this.getWallet(true);
    } else {
      this.getWallet();
    }  }

  getWallet = async ($terminateBeforeConnect = false) => {
    if (this.state.wallet === null) {
      const wallet = initWallet();
      try {
        await wallet.connect();

        if ($terminateBeforeConnect) {
          await wallet.terminate();
          await wallet.connect();
        }

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
          wallet: null,
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
           <h3>Scatter connection check & WORD stamps balance</h3>
          <p>Open and unlock your Scatter wallet to check if the setup was successfull: the widget below should color GREEN. If it does, you are ready to timestamp your content by going to any WordPress page/post. </p>

          <ConnectionWidget status={this.state.widgetStatus} balance={this.state.balance}
                            accountName={this.state.accountName}/>

          <h3>Help! WordProof Timestamp does not connect to my Scatter Wallet.</h3>
          <p>Blockchain is no easy technology and requires accounts, wallets and transactions. This is what makes the technology so safe, but also what makes it challenging to create easy-to-use blockchain applications. If the set-up did not work properly, here are a few steps you can take:</p>
          <ol>
            <li>Make sure the Scatter Wallet application is open on your computer and that you unlocked it (entered your passphrase).</li>
            <li>Run the Setup Wizard again and follow each step very carefully. Make sure to save your keys!</li>
            <li>Join the <a href="https://wordproof.io/telegram" target="_blank" rel="noopener noreferrer">WordProof Telegram</a> to ask fellow WordProof users for help.</li>
          </ol>

        <h3>Claim 100 WORD for free</h3>
        <p>Both as an anti-SPAM measurement and to make sure every timestamp is valuable, WordProof uses &apos;WORD&apos; stamps. Think of 1 WORD as 1 (digital) postage stamp. For every timestamp you place, you need 1 WORD stamp.</p>
        <p>You can timestamp 5 pieces of content per day without &apos;paying&apos; any WORD stamps. As soon as you timestamp your first content, your blockchain account will automatically reiceive 10 WORD stamps. Use the button below to claim 90 additional WORD stamps.</p>
        <a href="https://stamps.wordproof.io" target="_blank" rel="noopener noreferrer" className="wbtn mb-4">Claim 100 WORD for free</a>

      </div>
    )
  }
}

export default withCookies(Timestamp);
