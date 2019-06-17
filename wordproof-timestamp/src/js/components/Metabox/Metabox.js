import React, {Component} from 'react'
import initWallet from '../../wallet'
import timestamp from '../../timestamp'

export default class Metabox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingClass: '',
      connected: false,
      disabled: true,
      wallet: null,
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

    try {
      if (!wallet.connected) {
        await wallet.connect()
      }
      if (!wallet.authenticated) {
        await wallet.login()
      }

      this.registerWalletConnection();

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

  getWallet = async () => {
    if (this.state.wallet === null) {
      const wallet = initWallet();
      try {
        await wallet.connect();
        if (!wallet.authenticated) {
          await wallet.login();
        }
        this.registerWalletConnection();
        this.setState({
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
      '&security='+ wordproofData.ajaxSecurity,
    }).then((response) => {
      return response.json();
    })
    .catch(error => console.error(error));
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

        {this.state.wallet && this.state.wallet.authenticated ?
          <div>Logged in as <strong>{this.state.wallet.accountInfo.account_name}</strong></div> : ''
        }

        {this.state.disabled ?
          <div className="connecting-to-wallet"><img className="loading-spinner" height="64px" width="64px"
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
