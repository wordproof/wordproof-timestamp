import React, {Component} from 'react'

export default class Automate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: wordproofSettings.accessToken,
      siteId: wordproofSettings.siteId
    }
  }

  render() {
    return (
      <div>
        <div className="vo-card">
          <div className="form-group">
            <label htmlFor="" className="label" title="Access Token">Access Token</label>
            <input type="text" className="textinput" name="wordproof_access_token"
                   value={this.state.accessToken} onChange={e => this.setState({accessToken: e.target.value})}/>
          </div>

          <div className="form-group">
            <label htmlFor="" className="label" title="Access Token">Site Id</label>
            <input type="text" className="textinput" name="wordproof_site_id"
                   value={this.state.siteId} onChange={e => this.setState({siteId: e.target.value})}/>
          </div>

          <input type="submit" name="submit" id="submit" className="button is-primary"
                 value={wordproofSettings.saveChanges}/>

        </div>
      </div>
    )
  }
}
