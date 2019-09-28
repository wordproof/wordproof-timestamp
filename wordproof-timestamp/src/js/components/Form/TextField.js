import React from 'react'

export default class TextField extends React.Component {
  render() {
    return (
      <>
        <div className="mb-2">
          <label className="block" htmlFor={this.props.slug}>
           {this.props.question}
          </label>
          { this.props.extra && <span>{ this.props.extra }</span> }
          <input onChange={this.props.handleChange} data-slug={this.props.slug} id={`wordproof_options[${this.props.slug}]`}
                 type="text" placeholder=""/>
        </div>
      </>
    )
  }
}
