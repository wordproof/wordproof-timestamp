import React, {Component} from 'react'

export default class EOS extends Component {
  render() {
    return (
      <div>
        <div className="vo-card">
          <h3>Step 1: Buy an EOS account</h3>
          <p>
            To time-stamp your content, you need an EOS account (or a <a href="#create-telos-account">free Telos
            account</a>). Buy your EOS account on EOS Name Service. Here’s how:
          </p>

          <iframe width="560" height="315" src="https://www.youtube.com/embed/rQkrrLXjZH8" frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>

          <p>
            Now, import your new private key into one of these EOS wallets:
          </p>

          <h3>Step 2: Created your account? Time to get a wallet!</h3>
          <ul className="bullet-list">
            <li><a href="https://get-scatter.com/" target="_blank" rel="noopener noreferrer">Scatter</a></li>
          </ul>

          <p>
            Please join the <a href="https://t.me/WordProof" target="_blank" rel="noopener noreferrer" >WordProof Telegram</a> for questions,
            suggestions or support related items.
          </p>

        </div>
      </div>
    )
  }
}
