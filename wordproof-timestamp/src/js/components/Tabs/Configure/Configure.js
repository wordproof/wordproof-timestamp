import React, {Component} from 'react'

export default class Configure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      network: wordproofSettings.network,
      storeContent: wordproofSettings.storeContent,
      storeRam: wordproofSettings.storeRam,
      hasAccount: window.localStorage.getItem('wordproof-has-account') === 'true' ? true : false,
    }
  }

  handleNetwork = (event) => {
    this.setState({network: event.target.value})
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

  renderAccountCreation(network) {
    switch (network) {
      case 'eos_jungle':
        return (
          <div>
            <p>You can use the guide &apos;<a href="https://steemit.com/eos/@ajose01/scatter-and-the-jungle-testnet"
                                              target="_blank" rel="noopener noreferrer">Scatter and the EOS JUNGLE
              (testnet)!</a>&apos; to create an account.</p>
          </div>
        );
      case 'eos_main':
        return (
          <div>
            <p>If you don&apos;t have an EOS account yet, you can purchase one at <a
              href="https://www.eosnameservice.io/" target="_blank"
              rel="noopener noreferrer">https://www.eosnameservice.io/</a>.</p>
          </div>
        );
      default: //telos_main
        return (
          <div>
            <p>To create a brand new Telos account, head over to <a href="https://wordproof.io/free-telos-account"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer">https://wordproof.io/free-telos-account</a>.
            </p>
          </div>
        );
    }
  }


  render() {
    return (
      <div className="vo-card">
        <p>This set-up consists out of two steps:</p>
        <ol>
          <li>Create an EOS or Telos account</li>
          <li>Download a wallet to manage your credentials</li>
        </ol>

        <h3>Step 1.1. Create an EOS or Telos account</h3>
        <p>EOS and Telos are both EOS.IO blockchains. If you are not sure what this means, no problem. We recommend you
          to choose the Telos blockchain to get started, since it is free to create an account.</p>

        <div className="form-group">
          <strong className="label">In what blockchain do you want to timestamp your content?</strong>
          <div>
            <input type="radio" id="wordproof_network_telos" name="wordproof_network" value="telos_main"
                   checked={this.state.network === "telos_main"} onChange={this.handleNetwork} />
            <label htmlFor="wordproof_network_telos">Telos</label>
          </div>
          <div>
            <input type="radio" id="wordproof_network_eos" name="wordproof_network" value="eos_main"
                   checked={this.state.network === "eos_main"} onChange={this.handleNetwork} />
            <label htmlFor="wordproof_network_eos">EOS</label>
          </div>
          <div>
            <input type="radio" id="wordproof_network_jungle" name="wordproof_network" value="eos_jungle"
                   checked={this.state.network === "eos_jungle"} onChange={this.handleNetwork} />
            <label htmlFor="wordproof_network_jungle">EOS Jungle Testnet</label>
          </div>
        </div>

        {this.renderAccountCreation(this.state.network)}

        <h3>Step 1.2. Download a wallet</h3>
        <strong><a href="https://get-scatter.com/" target="_blank" rel="noopener noreferrer">Go to Scatter.com and
          download the wallet.</a></strong>
        <p>Now, open Scatter and set a password. Save the passphrase! On the next screen, click &apos;Import Private
          Keys&apos; and enter your <strong>Active Private Key</strong> which you received. Now the hard part is over!
          You are ready to go to the next step. Remember: every time you want to time-stamp something, the Scatter
          application must be open.</p>

        <h3>Advanced settings</h3>
        <div className="form-group">
          <label htmlFor="" className="label">What information do you want to store on the blockchain?</label>
          <input type="checkbox" name="" id="" checked disabled/> A hash
          of <em>the_title()</em> and <em>the_content()</em> in a memo <br/>
          <input type="checkbox" name="wordproof_store_content" checked={this.state.storeContent}
                 onChange={this.handleStoreContent}/> <em>the_content()</em> <br/>
          <input type="checkbox" name="wordproof_store_ram" checked={this.state.storeRam}
                 onChange={this.handleStoreRam}/> A hash of <em>the_title()</em> and <em>the_content()</em> in RAM
          (WARNING: costs you RAM for every time-stamp)
        </div>

        <input type="submit" name="submit" id="submit" className="button button-primary"
               value={wordproofSettings.saveChanges}/>

      </div>

    )
  }
}
