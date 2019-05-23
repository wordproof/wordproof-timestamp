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
          <div className="wordproof-popup is-active">
            <div className="overlay">
              <div className="modal">
                {/*<a className="modal-close" href="#">&times;</a>*/}
                <div className="modal-header">

                </div>
                <div className="modal-content">
                  <h2>Blockchain Certificate</h2>
                  <h3>Validated by WordProof</h3>

                  <section className="mockup-browser" data-url="http://www.bowie-to-bowie.io/this-is-the-url">
                    <div className="mockup-browser-content">
                      <h3>hi there</h3>
                      <p>Hehehe</p>
                    </div>
                    <div className="mockup-browser-footer">
                      <p>content</p>
                    </div>

                  </section>

                </div>
                <div className="modal-footer">

                </div>
              </div>
            </div>
          </div>
        </div>
      </ShadowDOM>
    )
  }
}
