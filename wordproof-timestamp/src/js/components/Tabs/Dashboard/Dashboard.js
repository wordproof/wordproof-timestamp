import React, {Component} from 'react'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleWindowPopup = (event, url) => {
    event.preventDefault();
    window.open(
      url,
      'popUpWindow',
      'height=600,width=900,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
    );
  }

  render() {
    return (
      <div>
        {!this.state.hasAccount ?
          <div className="vo-card vo-columns">
            <div className="vo-col">
              <p>Welcome to the WordProof Timestamp plugin! WordProof brings the benefits of blockchain to WordPress. If you are new, head to the Setup to get started!</p>
              <h3>What is WordProof Timestamp?</h3>
              <p>WordProof Timestamp lets you timestamp your content on the blockchain. By doing so, you claim ownership and responsibility (it is impossible for someone to claim they were first, since the URL, date and content is published to the blockchain). In addition, you show transparency to your visitors: this content is real and has not been tampered with (or it would be visible in the blockchain!).</p>
              <h3>One time setup</h3>
              <p>The Set-Up takes 5 minutes: 1) Create a blockchain account 2) Download a ‘Wallet’ 3) Configure the Wallet. You only need to do the set-up once!</p>
              <button className="button button-primary" onClick={(e) => this.handleWindowPopup(e, 'https://wordproof.io/timestamp-setup-wizard')}>Launch Setup Wizard</button>
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
