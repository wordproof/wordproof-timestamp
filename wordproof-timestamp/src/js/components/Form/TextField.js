import React from 'react'

export default class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.initial[this.props.slug]};
  }

  change(event) {
    this.setState({value: event.target.value});
  }

  update() {
    this.props.update(null, this.props.slug, this.state.value);
  }

  render() {
    return (
      <>
        <div className="mb-2">
          <label className="block" htmlFor={this.props.slug}>
           {this.props.question}
          </label>
          { this.props.extra && <span>{ this.props.extra }</span> }
          <input onClick={(e) => e.target.select()} onChange={(e) => this.change(e)} value={this.state.value} onBlur={() => this.update()}
                 data-slug={this.props.slug} id={`wordproof_options[${this.props.slug}]`} type="text" />
          { this.props.error && <span className={'text-red-600 mb-2 inline-block'}>{ this.props.error }</span> }
        </div>
      </>
    )
  }
}
