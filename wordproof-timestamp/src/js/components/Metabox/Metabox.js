import React, {Component} from 'react';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import ConnectionWidget from '../ConnectionWidget/ConnectionWidget';
import initWallet from '../../lib/wallet';
import timestamp from '../../lib/timestamp';
import getBonus from '../../lib/bonus';

class Metabox extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
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
    }
  }

  timestamp = async () => {
    this.setState({timestampStatus: 'connecting', buttonsDisabled: true});
    const wallet = await this.getWallet();
    await this.checkBonus(wallet.auth.accountName, wordproofData.network);

    if (!wallet.connected) {
      await wallet.connect()
    }
    if (!wallet.authenticated) {
      await wallet.login()
    }

    timestamp(wallet).then(response => response.json())
    .then((result) => {
      if (result.success) {
        this.setState({
          timestampStatus: 'success',
          timestampCertificateLink: result.data.url
        });        // result.data
      }
    })
    .catch(error => {
      this.setState({timestampStatus: 'failed'});
      console.error(error);
    });
  }

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
        this.registerAccountname(wallet.accountInfo.account_name);
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
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
      body: 'action=wordproof_wallet_connection&security=' + wordproofData.ajaxSecurity,
    }).then((response) => {
      return response.json();
    })
    .catch(error => console.error(error));
  }

  registerAccountname = (accountName) => {
    return fetch(wordproofData.ajaxURL, {
      method: "POST",
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
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
    if (bonus.status === 'success') {
      console.log('You received your bonus');
    } else if (bonus.status === 'failed') {
      console.log('Something went wrong');
    }
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

  disconnect = async () => {
    this.setState({buttonsDisabled: true});
    const wallet = await this.getWallet();
    try {
      if (!wallet.connected) {
        await wallet.connect()
      }
      await wallet.terminate();
      this.setState({wallet: null, accountName: null, buttonsDisabled: false, widgetStatus: 'failed'});
    } catch (error) {
      console.log(error)
    }
    console.log('done');

  }

  connect = async () => {
    this.setState({widgetStatus: 'connecting', buttonsDisabled: true});
    await this.getWallet();
  }

  render() {
    return (
      <div className="wordproof-metabox">

        <ConnectionWidget status={this.state.widgetStatus} balance={this.state.balance}
                          accountName={this.state.accountName}/>

        {this.state.timestampStatus !== 'success' ?
          <div className="buttons">
            {this.state.widgetStatus === 'success' && this.state.wallet !== null ?
              <div className="button-container">
                <button onClick={this.timestamp} disabled={this.state.buttonsDisabled}
                        className={`button is-primary ${this.state.timestampStatus === 'connecting' ? 'is-loading' : ''} `}>Timestamp
                </button>
                <button onClick={this.disconnect} disabled={this.state.buttonsDisabled}
                        className={`button ${this.state.widgetStatus === 'connecting' ? 'is-loading' : ''}`}>Logout
                </button>
              </div>
              :
              <button onClick={this.connect} disabled={this.state.buttonsDisabled}
                      className={`button ${this.state.widgetStatus === 'connecting' ? 'is-loading' : ''}`}>Login</button>
            }
          </div>
          :
          <div className="timestamped">
            <p>Your post is timestamped! <a rel="noopener noreferrer" target="_blank" href={this.state.timestampCertificateLink}>View your certificate</a>.</p>
          </div>
        }
      </div>
    )
  }
}

export default withCookies(Metabox);
