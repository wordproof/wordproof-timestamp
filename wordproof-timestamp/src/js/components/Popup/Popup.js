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

          <div className="modal">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head"></header>
              <section className="modal-card-body">
                <h2 className="title has-text-centered">Blockchain Certificate</h2>
                <h3 className="subtitle has-text-centered">Validated by WordProof</h3>

                <section className="mockup-browser" data-url="http://www.bowie-to-bowie.io/this-is-the-url">
                  <div className="mockup-browser-content">
                    <h3>hi there</h3>
                    <p>Hehehe</p>
                  </div>
                  <div className="mockup-browser-footer">
                    <p>content</p>
                  </div>
                </section>

              </section>
              <footer className="modal-card-foot">
                <button className="button is-success">Save changes</button>
                <button className="button">Cancel</button>
              </footer>
            </div>
          </div>

        </div>
      </ShadowDOM>
    )
  }
}
