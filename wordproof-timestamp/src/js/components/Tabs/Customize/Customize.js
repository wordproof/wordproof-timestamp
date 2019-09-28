import React, {Component} from 'react'

export default class Customize extends Component {
  constructor(props) {
    super(props)
    this.state = {
      certificateText: wordproofSettings.certificateText,
      customDomainText: wordproofSettings.customDomainText,
      isToggleOn: false
    }
    this.handleCustomDomainToggle = this.handleCustomDomainToggle.bind(this)
  }

  handleCustomDomainToggle() {
    this.setState({isToggleOn: !this.state.isToggleOn})
  }

  render() {
    return (
      <div>
        <div className="vo-card">
          <div className="form-group">
            <p>You can customize the appearance of a few WordProof Timestamp aspects. More options will be added in the
              near future.</p>
            <label htmlFor="" className="label"
                   title="CERTIFICATE_URL will be replaced by the URL to the WordProof certificate.">How do you want to
              refer to the WordProof timestamp certificate? </label>
            <input type="text" className="textinput" name="wordproof_certificate_text"
                   value={this.state.certificateText}
                   onChange={e => this.setState({certificateText: e.target.value})}/>
          </div>
          <a className="collapsible" onClick={this.handleCustomDomainToggle}>Show advanced settings...</a>
          <div className="form-group">
            <div className={ this.state.isToggleOn ? '' : 'hidden' }>
              <label htmlFor="" className="label"
                    title="Replace URLs in the BlockChain Certificate permalink.">Replace URLs in the BlockChain Certificate permalink</label>
              <p>In some steps, the URL in the blockchain certificate does not match the URL of the website. You can enter a custom domain below which will be visible in the BlockChain Certificate pop-up. Do not add &#39;/&#39; at the end of your custom URL.</p>
              <input type="text" className="textinput" name="wordproof_custom_domain"
                  value={this.state.customDomainText}
                  onChange={e => this.setState({customDomainText: e.target.value})}/>
            </div>
          </div>
          <p />
          <input type="submit" name="submit" id="submit" className="button is-primary"
                 value={wordproofSettings.saveChanges}/>
        </div>
      </div>
    )
  }
}
