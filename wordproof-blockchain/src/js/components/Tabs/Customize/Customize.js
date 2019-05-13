import React, {Component} from 'react'

export default class Configure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      certificateTemplate: wordproofSettings.certificateTemplate
    }
  }

  render() {
    return (
      <div>
        <div className="vo-card">
          <div className="form-group">
            <label htmlFor="" className="label"
                   title="CERTIFICATE_URL will be replaced by the URL to the WordProof certificate.">How do you want to
              refer to the WordProof blockchain certificate? </label>
            <input type="text" className="textinput" name="wordproof_certificate_template"
                   value={this.state.certificateTemplate}
                   onChange={e => this.setState({certificateTemplate: e.target.value})}/>
          </div>

          <input type="submit" name="submit" id="submit" className="button button-primary"
                 value={wordproofSettings.saveChanges}/>
        </div>
      </div>
    )
  }
}
