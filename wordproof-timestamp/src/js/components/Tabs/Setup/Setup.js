import React, {Component} from 'react';
// import telosIcon from '../../../../../assets/images/telos.png';
// import { ReactComponent as EosIcon } from '../../../../assets/Eos.svg';


export default class Setup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      network: wordproofSettings.network,
      storeContent: wordproofSettings.storeContent,
      storeRam: wordproofSettings.storeRam,
      hasAccount: window.localStorage.getItem('wordproof-has-account') === 'true' ? true : false,
      selectedBlockchainIndex: 0
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

  handleWindowPopup = (event, url) => {
    event.preventDefault();
    window.open(
      url,
      'popUpWindow',
      'height=1000,width=900,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
    );
  }

  checkActiveRadio = (name) => {
    return this.state.network === name;
  }

  addClassToSelectedRadio = () => {
    console.log('hello');
    console.log('hello');
  }
  isActive = () => {
    console.log('hello');
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
          <label htmlFor="wordproof_network_telos" onChange={this.addClassToSelectedRadio}
                 className={`radio-box ${ this.checkActiveRadio('telos_main') ? 'selected' : '' }`}>
            <input type="radio" id="wordproof_network_telos" name="wordproof_network" value="telos_main"
                   checked={this.state.network === "telos_main"} onChange={this.handleNetwork} />
            <img src="https://i.ibb.co/RYg4MJZ/Telos-Icon-200px.png" alt="telos"/>
            <span>Telos</span>
          </label>
          <label htmlFor="wordproof_network_eos" onChange={this.addClassToSelectedRadio}
                 className={`radio-box ${ this.checkActiveRadio('eos_main') ? 'selected' : '' }`}>
          <input type="radio" id="wordproof_network_eos" name="wordproof_network" value="eos_main"
                   checked={this.state.network === "eos_main"} onChange={this.handleNetwork} />
            <img src="https://i.ibb.co/RYg4MJZ/Telos-Icon-200px.png" alt="telos"/>
            <span>EOS</span>
          </label>
          <label htmlFor="wordproof_network_jungle" onChange={this.addClassToSelectedRadio}
                 className={`radio-box ${ this.checkActiveRadio('eos_jungle') ? 'selected' : '' }`}>
            <input type="radio" id="wordproof_network_jungle" name="wordproof_network" value="eos_jungle"
                   checked={this.state.network === "eos_jungle"} onChange={this.handleNetwork} />
            <img src="https://i.ibb.co/RYg4MJZ/Telos-Icon-200px.png" alt="telos"/>
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
              return <p>Telos is the innovation district of the EOS.IO ecosystem. If you want to know more about Telos, read this introduction article by Telos founder Douglas Horn.</p>
          }
        })()}

        <p>After making your choice, you are ready to set up WordProof! Click the button below to open our wizard, which will guide you through the rest of our process.</p>

        <button className="button button-primary" onClick={(e) => this.handleWindowPopup(e, 'https://wordproof.io/timestamp-setup-wizard')}>Launch the Setup Wizard</button>

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
