import React, {Component} from 'react'

export default class Configure extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className="vo-card">
          <h3>Need any help?</h3>
          <p>Thank you for using the WordProof Timestamp plugin! Blockchain is a difficult technology which requires the set-up of a wallet. This can be a daunting process, but we have a great community to help you out. The WordProof community is active in our Telegram groups, where we talk about new features and help each other. Please join these groups for any support requests:</p>
          <ul>
            <li><a href="https://wordproof.io/guide" target="_blank" rel="noopener noreferrer">How to: WordProof Timestamp Setup Guide</a></li>
            <li><a href="https://t.me/joinchat/DVuJAEfhf2QURBBjOWc2XA" target="_blank" rel="noopener noreferrer">Telegram User Group</a></li>
            <li><a href="https://t.me/WordProof" target="_blank" rel="noopener noreferrer">Telegram Community Group</a></li>
          </ul>
          <p>For other inquiries, <a href="mailto:info@wordproof.io" target="_blank" rel="noopener noreferrer">Send an email</a>.</p>
          <h3>Credits</h3>
          <p><a href="https://wordproof.io/wordpress-plugin-wordproof/credits/" target="_blank" rel="noopener noreferrer">WordProof Timestamp plugin Credits</a></p>
        </div>
      </div>
    )
  }
}
