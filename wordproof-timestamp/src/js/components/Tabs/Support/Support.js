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
          <p>Thank you for using the WordProof Timestamp plugin. Even though we try to make everything simple, we are
            always ready to help if there are any questions.</p>
          <a href="https://t.me/WordProof" target="_blank" rel="noopener noreferrer">Join our Telegram group</a> <strong>(Recommended)</strong><br/>
          <a href="mailto:info@wordproof.io" target="_blank" rel="noopener noreferrer">Send an email</a>
        </div>
      </div>
    )
  }
}
