import React, { Component } from 'react'

export default class Message extends Component {
  render() {
    return (
      <div id="setting-error-settings_updated" className={`updated settings-error ${ this.props.status === 'notice' ? 'notice' : 'error' }`}> 
        <strong>{this.props.message}</strong>
        <button type="button" className="notice-dismiss" onClick={this.props.clearMessage}><span className="screen-reader-text">Dismiss this notice.</span></button>
      </div>
    )
  }
}
