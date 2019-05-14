import React, {Component} from 'react'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        {!this.state.hasAccount ?
          <div className="vo-card vo-columns">
            <div className="vo-col">
              <h3>What is WordProof Timestamp?</h3>
              <p>Welcome to the WordProof - Time-stamping beta plugin!:) We are thrilled to have you here as a tester. WordProof is the bridge between WordPress and Blockchain: we bring the benefits of blockchain to the WordPress ecosystem via various plugins.</p>
              <p>WordProof Time-stamping lets you time-stamp your content onto the EOS.IO ecosystem. You can choose between two blockchains:</p>
              <ul className="bullet-list">
                <li>Telos blockchain (free!)</li>
                <li>EOS blockchain</li>
              </ul>
              <p>After creating an account on one of the two blockchains above, you will need to download Scatter, which is a wallet that runs on your computer. We will walk you through every step of the way, no worries!</p>
              <br/>
              <a href="#configure" className="button button-primary">Go to Step 1: Configure</a>
            </div>
            <div className="vo-col">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/5GUlcfaKsyk" frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen></iframe>
            </div>
          </div> : ''
        }
      </div>
    )
  }
}
