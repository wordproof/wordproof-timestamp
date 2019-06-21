import React, {Component} from 'react';
import ConnectionWidget from '../ConnectionWidget/ConnectionWidget';
import initWallet from '../../wallet';
import timestamp from '../../timestamp';
import getBonus from '../../bonus';

export default class Metabox extends Component {
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
    this.getWallet();
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

  getWallet = async () => {
    if (this.state.wallet === null) {
      const wallet = initWallet();
      try {
        await wallet.connect();
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
            <p>Your post is timestamped! <a href={this.state.timestampCertificateLink}>View your certificate</a>.</p>
          </div>
        }
      </div>
    )
  }
}
