import React, {Component} from 'react'

export default class General extends Component {
  constructor(props) {
    super(props)
    this.state = {
      certificateText: wordproofSettings.certificateText,
      certificateDOMSelector: wordproofSettings.certificateDOMSelector,
      hidePostColumn: wordproofSettings.hidePostColumn,
      hideAdvanced: true
    }
  }

  handleAdvancedOptions = (e) => {
    e.preventDefault();
    this.setState({hideAdvanced: false});
  }

  render() {
    return (
      <div>
        <div className="vo-card">
          <h3>General Settings</h3>
          <p>The settings below apply to both the automatic and manual modes. Mode-specific settings can be found on the <a href={wordproofSettings.urls.automatic}>Automatic</a> & <a href={wordproofSettings.urls.manual}>Manual</a> pages.</p>

          <div className="form-group">
            <label htmlFor="wordproof_customize[certificate_text]" className="label" title="Certificate Text">How do you want to
              refer to the WordProof timestamp certificate? </label>
            <input type="text" className="textinput" name="wordproof_customize[certificate_text]"
                   value={this.state.certificateText} onChange={e => this.setState({certificateText: e.target.value})}
                   id="wordproof_customize[certificate_text]"/>
          </div>

          <div className={`form-group ${ this.state.hideAdvanced ? 'hidden' : '' }`}>
            <label htmlFor="wordproof_customize[certificate_dom_selector]" className="label" title="Certificate DOM Selector">Certificate DOM Selector</label>
            <input type="text" className="textinput" name="wordproof_customize[certificate_dom_selector]" placeholder="eg. .entry-meta or #mydiv"
                   value={this.state.certificateDOMSelector} onChange={e => this.setState({certificateDOMSelector: e.target.value})}
                   id="wordproof_customize[certificate_dom_selector]"/>
          </div>

          <div className={`form-group ${ this.state.hideAdvanced ? 'hidden' : '' }`}>
            <label htmlFor="wordproof_customize[hide_post_column]" className="label" title="Display Revisions">Hide Post Column</label>
            <input type="checkbox" value="1" className="" name="wordproof_customize[hide_post_column]"
                   onChange={e => this.setState({hidePostColumn: e.target.value})} defaultChecked={this.state.hidePostColumn}
                   id="wordproof_customize[hide_post_column]"/>
          </div>

          <input type="submit" name="submit" id="submit" className="button is-primary"
                 value={wordproofSettings.saveChanges}/>

          <button className={`button button-modest ${ this.state.hideAdvanced ? '' : 'hidden' }`}
                  onClick={this.handleAdvancedOptions}>Show advanced settings
          </button>

        </div>
      </div>
    )
  }
}
