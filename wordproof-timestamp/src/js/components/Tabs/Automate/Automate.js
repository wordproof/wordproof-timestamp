import React, {Component} from 'react'

export default class Automate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteToken: wordproofSettings.wsfy.site_token,
      siteId: wordproofSettings.wsfy.site_id,
      showRevisions: wordproofSettings.wsfy.show_revisions,
      allowedPostTypes: wordproofSettings.wsfy.allowed_post_types,
      hideAdvanced: true,
      registeredPostTypes: Object.values(wordproofSettings.registeredPostTypes),
    }
  }

  handleAdvancedOptions = (e) => {
    e.preventDefault();
    this.setState({hideAdvanced: false});
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

            <a href={''}>Configure your Site Token</a>

            <div className="form-group">
              <label htmlFor="wsfy_settings[show_revisions]" className="label" title="Display Revisions">Show Revisions</label>
              <input type="checkbox" value="1" className="" name="wsfy_settings[show_revisions]" id="wsfy_settings[show_revisions]"
                     onChange={e => this.setState({showRevisions: e.target.value})}
                     defaultChecked={this.state.showRevisions}/>
            </div>

            <div className={`form-group ${this.state.hideAdvanced ? 'hidden' : ''}`}>
              <label htmlFor="" className="label">Post Types to timestamp automatically</label>

              { this.state.registeredPostTypes.map((value) => {
                return <div key={value}>
                  <input key={value} type="checkbox" value={ value } name={`wsfy_settings[allowed_post_types][${value}]`}
                         id={`wsfy_settings[allowed_post_types][${value}]`} defaultChecked={this.state.allowedPostTypes.includes(value)}/>
                   <label htmlFor={`wsfy_settings[allowed_post_types][${value}]`}>{ value }</label>
              </div>
              })}
            </div>

            <div className={`form-group ${this.state.hideAdvanced ? 'hidden' : ''}`}>
              <label htmlFor="" className="label">Tools</label>
              <a href={`${wordproofSettings.adminUrl}admin.php?page=wordproof-autostamp`} target="_blank"
                 rel="noopener noreferrer">Auto Stamp your Posts</a>
            </div>

            {/*<p>We Stamp For You is {(wordproofSettings) ? 'active' : 'not activated'}</p>*/}

            <input type="submit" name="submit" id="submit" className="button is-primary"
                   value={wordproofSettings.saveChanges}/>

            <button className={`button button-modest ${this.state.hideAdvanced ? '' : 'hidden'}`}
                    onClick={this.handleAdvancedOptions}>Show advanced settings
            </button>

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
