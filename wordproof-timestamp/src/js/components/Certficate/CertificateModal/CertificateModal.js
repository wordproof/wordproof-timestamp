import React, {Component} from 'react'
import ShadowDOM from 'react-shadow';

import MockupBrowser from "../MockupBrowser/MockupBrowser";

export default class CertificateModal extends Component {

  render() {
    const schema = this.props.schema;
    return (
      <ShadowDOM include={`${wordproofData.wordProofCssDir}/frontend.css`}>
        <div className="shadowHost">

          <div className="modal is-family-primary">
            <div className="modal-background wordproof-modal-background"></div>
            <div className="modal-card">
              <section className="modal-card-body">
                <button className="wordproof-modal-close">&times;</button>
                <h2 className="title has-text-centered">Timestamp Certificate</h2>
                <div className="subtitle-container">
                  <h3 className="subtitle has-text-centered">Protected with </h3>
                  <img src={`${wordproofData.pluginDirUrl}assets/images/wordproof-logo.png`} alt="WordProof logo"/>
                </div>
                  <MockupBrowser schema={schema}/>
              </section>
              <footer className="modal-card-foot">
                <a href="https://wordproof.io" target="_blank" rel="noopener noreferrer nofollow">Protect your content
                  on the blockchain with WordProof Timestamp</a>
              </footer>
            </div>
          </div>

        </div>
      </ShadowDOM>
    )
  }
}
