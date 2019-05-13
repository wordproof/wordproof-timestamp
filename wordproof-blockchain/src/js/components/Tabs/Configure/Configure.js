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
    switch(network) {
      case 'eos_main':
        return 'main';
      case 'eos_jungle':
        return 'jungle';
      default: //telos_main
        return 'telos';
    }
  }


  render() {
    return (
      <div>
        <p>This set-up consists out of two steps:</p>
        <ol>
          <li>Create an EOS or Telos account</li>
          <li>Download a wallet to manage your credentials</li>
        </ol>

        <h3>Step 1.1. Create an EOS or Telos account</h3>
        <p>EOS and Telos are both EOS.IO blockchains. If you are not sure what this means, no problem. We recommend you
          to choose the Telos blockchain to get started, since it is free to create an account.</p>

          <div className="vo-card">
            <div className="form-group">
              <label className="label" id="label_wordproof_network" htmlFor="wordproof_network">In what blockchain do
                you want to timestamp your content?</label>
              <select name="wordproof_network" id="wordproof_network" value={this.state.network}
                      onChange={this.handleNetwork}>
                <option value="telos_main">Telos</option>
                <option value="eos_main">EOS</option>
                <option value="eos_jungle">EOS Jungle Testnet</option>
              </select>
            </div>

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
            
            { this.renderAccountCreation(this.state.network) }

            <input type="submit" name="submit" id="submit" className="button button-primary"
                   value={wordproofSettings.saveChanges}/>
          </div>
      </div>
  )
  }
  }
