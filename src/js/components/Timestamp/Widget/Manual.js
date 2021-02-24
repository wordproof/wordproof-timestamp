import React, {Component} from 'react';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import ConnectionWidget from '../../ConnectionWidget/ConnectionWidget';
import initWallet from '../../../lib/wallet';
import timestamp from '../../../lib/timestamp';

class Manual extends Component {

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
      timestampCertificateLink: null,
      errorMessage: null
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

    if (!wallet.connected) {
      await wallet.connect()
    }
    if (!wallet.authenticated) {
      await wallet.login()
    }

    timestamp(wallet).then(response => {
      try {
        let object = response.json;
        console.log(object);

        if (object.error) {
          console.log(object.error)
          console.log(object.error.what)
          throw object.error.what;
        }
  
          this.setState({
            timestampStatus: 'success',
            timestampCertificateLink: response.data.url
          });

      } catch (e) {
        this.setState({
          buttonsDisabled: false,
          widgetStatus: 'success',
          timestampStatus: null,
          errorMessage: e
        });
      }
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
                          accountName={this.state.accountName} provider={'scatter'}/>

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

        {this.state.errorMessage ?
            <div className="mt-2">
              <p><strong>Something went wrong:</strong> {this.state.errorMessage}</p>
            </div>
            : ''}

          </div>
    )
  }
}

export default withCookies(Manual);
