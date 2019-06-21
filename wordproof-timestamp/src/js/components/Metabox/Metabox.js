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
      balance: null,
      buttonsDisabled: true,
      widgetStatus: 'connecting',
      timestampStatus: null
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
        this.setState({timestampStatus: 'success'});        // result.data
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
        const balance = this.getBalance(wallet.accountInfo.account_name);

        this.setState({
          balance: balance,
          wallet: wallet,
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
      console.log('hi')
    } else if (bonus.status === 'failed') {
      console.log('hi')

    }
  }


  getBalance = (accountName) => {
    if (accountName === wordproofData.accountName) {
      return wordproofData.wordBalance;
    } else {
      return false;
      //retrieve balance;
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
      this.setState({wallet: null, buttonsDisabled: false, widgetStatus: 'failed'});
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

        <ConnectionWidget status={this.state.widgetStatus}/>

        {this.state.timestampStatus !== 'success' ?
        <div className="buttons">
          {this.state.widgetStatus === 'success' && this.state.wallet !== null ?
            <div className="button-container">
              <button onClick={this.timestamp} disabled={this.state.buttonsDisabled} className={`button is-primary ${this.state.timestampStatus === 'connecting' ? 'is-loading' :''} `}>Timestamp</button>
              <button onClick={this.disconnect} disabled={this.state.buttonsDisabled} className={`button ${this.state.widgetStatus === 'connecting' ? 'is-loading' :''}`}>Logout</button>
            </div>
            :
            <button onClick={this.connect} disabled={this.state.buttonsDisabled} className={`button ${this.state.widgetStatus === 'connecting' ? 'is-loading' :''}`}>Login</button>
          }
        </div>
          :
          <div className="timestamped">
            <p>Congrats</p>
          </div>
        }
      </div>
    )
  }
}
