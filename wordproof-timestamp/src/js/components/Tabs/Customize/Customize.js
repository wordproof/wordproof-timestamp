import React, {Component} from 'react'

export default class Customize extends Component {
  constructor(props) {
    super(props)
    this.state = {
      certificateText: wordproofSettings.certificateText
    }
  }

  render() {
    return (
      <div>
        <div className="vo-card">
          <div className="form-group">
            <p>You can customize the appearance of a few WordProof Timestamp aspects. More options will be added in the near future.</p>
            <label htmlFor="" className="label"
                   title="CERTIFICATE_URL will be replaced by the URL to the WordProof certificate.">How do you want to
              refer to the WordProof timestamp certificate? </label>
            <input type="text" className="textinput" name="wordproof_certificate_text"
                   value={this.state.certificateText}
                   onChange={e => this.setState({certificateText: e.target.value})}/>
          </div>

          <input type="submit" name="submit" id="submit" className="button is-primary"
                 value={wordproofSettings.saveChanges}/>
        </div>
      </div>
    )
  }
}
