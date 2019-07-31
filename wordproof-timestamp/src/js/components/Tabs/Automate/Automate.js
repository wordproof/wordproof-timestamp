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
        <div className="vo-card vo-columns">
          <div className="vo-col">
            <h3>Never want you put your content at risk again?</h3>
            <p>Although it&apos;s easy to stamp for anyone familiair with blockchain, we can imagine that Timestamping
              yourself is not your favorite part of publishing. But ... we have a solution in place: WordProof
              Timestamp&apos;s We Stamp For You service.</p>
            <p>The same WordProof Timestamp, conform the <a target="_blank" rel="noopener noreferrer"
                                                            href="https://github.com/wordproof/timestamp-standard">open
              source protocol</a>, but then ... automagically!</p>
            <p>From now on, you never have to put your content at risk again, without the hassle of using a blockchain
              wallet.</p>
            <p>All you have to do is <a target="_blank" rel="noopener noreferrer"
                                        href="https://wordproof.io/we-stamp-for-you">request a WordProof Timestamp
              key</a> for your website, and paste it here:</p>

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
          <div className="vo-col">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/of0PlfqV5EM" frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
          </div>
        </div>
      </div>
    )
  }
}
