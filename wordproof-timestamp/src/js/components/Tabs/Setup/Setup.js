import React, {Component} from 'react';

export default class Setup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      network: wordproofSettings.network,
      storeContent: wordproofSettings.storeContent,
      storeRam: wordproofSettings.storeRam,
      hasAccount: window.localStorage.getItem('wordproof-has-account') === 'true' ? true : false,
      hideAdvanced: true
    }
  }

  handleNetwork = (event) => {
    this.saveOption(event);
    this.setState({network: event.target.value});
  }

  handleStoreContent = () => {
    this.setState({storeContent: !this.state.storeContent})
  }

  handleStoreRam = () => {
    this.setState({storeRam: !this.state.storeRam})
  }

  handleYes = () => {
    document.querySelector('#wordproof_network').focus()
    this.closePopup()
  }

  closePopup = () => {
    window.localStorage.setItem('wordproof-has-account', 'true')
    this.setState({hasAccount: true})
  }

  handleWindowPopup = (event, url, network) => {
    event.preventDefault();
    window.open(
      url + '?b=' + network,
      'popUpWindow',
      'height=1000,width=900,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
    );
    this.registerSetupWizardOpened();
  }

  registerSetupWizardOpened = () => {
    return fetch(wordproofData.ajaxURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body:
      'action=wordproof_setup_start' +
      '&security='+ wordproofData.ajaxSecurity,
    }).then((response) => {
      return response.json();
    })
    .catch(error => console.error(error));
  }

  checkActiveRadio = (name) => {
    return this.state.network === name;
  }

  handleAdvancedOptions = (e) => {
    e.preventDefault();
    this.setState({hideAdvanced: false});
  }

  saveOption = (e) => {
    const option = e.target.name;
    const value = e.target.value;
    return fetch(wordproofData.ajaxURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body:
      'action=wordproof_save_option' +
      '&security='+ wordproofData.ajaxSecurity +
      '&option='+ option +
      '&value='+ value,
    }).then((response) => {
      return response.json();
    })
    .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="vo-card">
        <p>The WordProof Timestamp set-up consists of three steps and takes about 5 minutes. You only need to do this once using the Setup Wizard, which will guide you through the process!</p>
        <ol>
          <li>Create a blockchain account</li>
          <li>Download a Wallet to sign your content</li>
          <li>Configure the Wallet</li>
        </ol>

        <h3>Pick a Blockchain</h3>
        <p>Choose on which blockchain you want to timestamp your content. If you are not sure what this means, don’t worry! We recommend to start on the Telos blockchain, since accounts are free.</p>

        <div className="form-group">
          <label htmlFor="wordproof_network_telos"
                 className={`radio-box ${ this.checkActiveRadio('telos_main') ? 'selected' : '' }`}>
            <input type="radio" id="wordproof_network_telos" name="wordproof_network" value="telos_main"
                   checked={this.state.network === "telos_main"} onChange={this.handleNetwork} />
            <img src={`${wordproofData.pluginDirUrl}assets/images/telos.png`} alt="telos"/>
            <span>Telos</span>
          </label>
          <label htmlFor="wordproof_network_eos"
                 className={`radio-box ${ this.checkActiveRadio('eos_main') ? 'selected' : '' }`}>
            <input type="radio" id="wordproof_network_eos" name="wordproof_network" value="eos_main"
                   checked={this.state.network === "eos_main"} onChange={this.handleNetwork} />
            <img src={`${wordproofData.pluginDirUrl}assets/images/eos.png`} alt="telos"/>
            <span>EOS</span>
          </label>
          <label htmlFor="wordproof_network_jungle"
                 className={`radio-box ${ this.checkActiveRadio('eos_jungle') ? 'selected' : '' } ${ this.state.hideAdvanced ? 'hidden' : '' }`}>
            <input type="radio" id="wordproof_network_jungle" name="wordproof_network" value="eos_jungle"
                   checked={this.state.network === "eos_jungle"} onChange={this.handleNetwork} />
            <img src={`${wordproofData.pluginDirUrl}assets/images/eos.png`} alt="telos"/>
            <span>EOS Jungle<br/>Testnet</span>
          </label>
        </div>

        {(() => {
          switch(this.state.network) {
            case 'eos_main':
              return <p>To use EOS, you need to buy an EOS account. The Wizard will walk you through the entire process.</p>;
            case 'eos_jungle':
              return <p>To use the EOS Jungle testnet, you should have your wallet setup already. Headover to &apos;Timestamp&apos; to test your connection.</p>;
            default:
              return <p>Telos is the innovation district of the EOS.IO ecosystem. If you want to know more about Telos, read <a href="https://medium.com/goodblock-io/welcome-to-telos-wordproof-user-fd719b171341" target="_blank" rel="noopener noreferrer">this introduction article by Telos founder Douglas Horn</a>.</p>
          }
        })()}

        <p>After making your choice, you are ready to set up WordProof! Click the button below to open our wizard, which will guide you through the rest of our process.</p>

        <button className="button is-primary" onClick={(e) => this.handleWindowPopup(e, 'https://wordproof.io/setup', this.state.network)}>Launch the Setup Wizard</button>

        <button className={`button button-modest ${ this.state.hideAdvanced ? '' : 'hidden' }`} onClick={this.handleAdvancedOptions}>Show advanced settings</button>

      </div>

    )
  }
}
