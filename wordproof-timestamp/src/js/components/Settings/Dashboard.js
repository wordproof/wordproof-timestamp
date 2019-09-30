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
          <div className="vo-card vo-columns">
            <div className="vo-col">
                <h3>Welcome to WordProof Timestamp</h3>
                <p>The WordProof Timestamp for WordPress plugin lets you timestamp
                    content on the blockchain. Let&apos;s get you going quickly. Launch the Setup Wizard to get started.</p>

                <a className="button is-primary" href={wordproofSettings.urls.wizard}>Launch Setup Wizard</a>

              <h3>Mode</h3>
              <p>You can either timestamp content manually (using your own blockchain account and wallet) or automatically.</p>

                <p>{wordproofSettings.isWSFYActive
                    ? "🎉 You are automatically timestamping your content!"
                    : wordproofSettings.network
                    ? "🙌 You are manually timestamping your content!"
                    : "❌ No setup detected yet. Please start our Setup Wizard!"
                }</p>

            </div>
            <div className="vo-col">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/Wby7hsSuua0" frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen></iframe>
            </div>
          </div>
      </div>
    )
  }
}
