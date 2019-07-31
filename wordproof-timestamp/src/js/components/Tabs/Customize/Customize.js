import React, {Component} from 'react'

export default class Customize extends Component {
  constructor(props) {
    super(props)
    this.state = {
      certificateText: wordproofSettings.certificateText,
      certificateDOMSelector: wordproofSettings.certificateDOMSelector,
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
          <p>You can customize the appearance of a few WordProof Timestamp aspects. More options will be added in the
            near future.</p>

          <div className="form-group">
            <label htmlFor="" className="label" title="Certificate Text">How do you want to
              refer to the WordProof timestamp certificate? </label>
            <input type="text" className="textinput" name="wordproof_certificate_text"
                   value={this.state.certificateText} onChange={e => this.setState({certificateText: e.target.value})}/>
          </div>

          <div className={`form-group ${ this.state.hideAdvanced ? 'hidden' : '' }`}>
            <label htmlFor="" className="label" title="Certificate DOM Selector">Certificate DOM Selector</label>
            <input type="text" className="textinput" name="wordproof_certificate_dom_selector"
                   value={this.state.certificateDOMSelector} onChange={e => this.setState({certificateDOMSelector: e.target.value})}/>
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
