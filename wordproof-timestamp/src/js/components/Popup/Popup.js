import React, {Component} from 'react'
import ShadowDOM from 'react-shadow';
import './Popup.scss'

export default class Popup extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  //String HTML but keep linebreaks
  stripHtmlFromString = (string) => {
    //Remove linebreaks etc
    string = string.replace(/\r?\n|\r/g, '');
    //Replace </p> with our var
    string = string.replace('</p>', 'WORDPROOF_CONTENT_REPLACEMENT_MARKER');
    //Remove HTML entities
    string = string.replace(/(<([^>]+)>)/ig,"");
    //Replace the marker with line breaks
    string = string.replace('WORDPROOF_CONTENT_REPLACEMENT_MARKER', '\n\n');
    return string;
  }

  shortenString = (string) => {
    if (string.length > 500) {
      return string.substring(0, 500) + '...';
    }
    return string;
  }

  render() {
    return (
      <ShadowDOM include={`${wordproofData.wordProofCssDir}/frontend.css`}>
        <div className="shadowHost">

          <div className="modal is-family-primary">
            <div className="modal-background"></div>
            <div className="modal-card">
              <section className="modal-card-body">
                <h2 className="title has-text-centered">Blockchain Certificate</h2>
                <h3 className="subtitle has-text-centered">Validated by WordProof</h3>

                <section className="mockup-browser" data-url={wordproofData.postData.post_link}>
                  <div className="mockup-browser-content content">
                    <h3>{wordproofData.postData.post_title}</h3>
                    <p>{ this.shortenString(this.stripHtmlFromString(wordproofData.postData.post_content))}</p>
                  </div>
                  <div className="mockup-browser-footer">
                    <div className="columns">
                      <div className="column">
                        <a href={wordproofData.postData.transaction_url} target="_blank" rel="noopener noreferrer">View on the blockchain</a>
                      </div>
                      <div className="column">
                        <ul>
                          <li><span>Post Date: </span>{wordproofData.postData.dates.postDate}</li>
                          <li><span>Modified Date: </span>{wordproofData.postData.dates.modifiedDate}</li>
                          <li><span>Proof Date: </span>{wordproofData.postData.dates.proofDate}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

              </section>
              <footer className="modal-card-foot">
                <a href="https://wordproof.io" target="_blank" rel="noopener noreferrer">Learn more about this free WordProof Timestamp plugin</a>
              </footer>
            </div>
          </div>

        </div>
      </ShadowDOM>
    )
  }
}
