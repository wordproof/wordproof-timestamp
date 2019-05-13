import React, { Component } from 'react'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      network: wordproofSettings.network,
      storeContent: wordproofSettings.storeContent,
      storeRam: wordproofSettings.storeRam,
      hasAccount: window.localStorage.getItem('wordproof-has-account') === 'true' ? true : false,
      certificateTemplate: wordproofSettings.certificateTemplate
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
    this.setState({ hasAccount: true })
  }


  render() {
    return (
      <div>
        { !this.state.hasAccount ?
          <div className="vo-card">
		  	<h3>Welcome, WordProof tester!</h3>
			<button type="button" className="button dismiss" onClick={this.closePopup}><span className="dashicons dashicons-no-alt"></span></button>
			<iframe width="560" height="315" src="https://www.youtube.com/embed/5GUlcfaKsyk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			<br /><br />
            <label className="label">Do you already have an EOS or Telos blockchain account?</label>
			<ul className="bullet-list">
              <li><a href="#create-telos-account">No, I want to create a free Telos account</a></li>
              <li><a href="#create-eos-account">No, I want to buy an EOS account</a></li>
              <li><a href="#" onClick={this.handleYes}>Yes (select the blockchain you want to use below)</a></li>
			</ul>
          </div> : ''
        }

        <div className="vo-card">
            <div className="form-group">
              <label className="label" id="label_wordproof_network" htmlFor="wordproof_network">In what blockchain do you want to timestamp your content?</label>
              <select name="wordproof_network" id="wordproof_network" value={this.state.network} onChange={this.handleNetwork}>
                <option value="eos_main">EOS</option>
                <option value="telos_main">Telos</option>
                <option value="eos_jungle">EOS Jungle Testnet</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="" className="label">What information do you want to store on the blockchain?</label>
              <input type="checkbox" name="" id="" checked disabled/> A hash of <em>the_title()</em> and <em>the_content()</em> in a memo <br/>
              <input type="checkbox" name="wordproof_store_content" checked={this.state.storeContent} onChange={this.handleStoreContent}/> <em>the_content()</em> <br/>
              <input type="checkbox" name="wordproof_store_ram" checked={this.state.storeRam} onChange={this.handleStoreRam}/> A hash of <em>the_title()</em> and <em>the_content()</em> in RAM (WARNING: costs you RAM for every time-stamp)
            </div>

            <div className="form-group">
              <label htmlFor="" className="label" title="CERTIFICATE_URL will be replaced by the URL to the WordProof certificate.">How do you want to refer to the WordProof blockchain certificate? </label>
              <input type="text" className="textinput" name="wordproof_certificate_template" value={this.state.certificateTemplate} onChange={e => this.setState({ certificateTemplate: e.target.value })}/>
            </div>

            <input type="submit" name="submit" id="submit" className="button button-primary" value={wordproofSettings.saveChanges}/>
        </div>
      </div>
    )
  }
}
