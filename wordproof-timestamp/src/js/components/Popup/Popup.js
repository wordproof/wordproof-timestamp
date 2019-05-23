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

  render() {
    return (
      <ShadowDOM include={`${wordproofData.wordProofCssDir}/frontend.css`}>
        <div className="shadowHost">

          <div className="modal is-family-primary">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head"></header>
              <section className="modal-card-body">
                <h2 className="title has-text-centered">Blockchain Certificate</h2>
                <h3 className="subtitle has-text-centered">Validated by WordProof</h3>

                <section className="mockup-browser" data-url={wordproofData.postData.post_link}>
                  <div className="mockup-browser-content content">
                    <h3>{wordproofData.postData.post_title}</h3>
                    <p>{wordproofData.postData.content}</p>
                  </div>
                  <div className="mockup-browser-footer">
                    <p>View on blockchain</p>
                  </div>
                </section>

              </section>
              <footer className="modal-card-foot">

              </footer>
            </div>
          </div>

        </div>
      </ShadowDOM>
    )
  }
}
