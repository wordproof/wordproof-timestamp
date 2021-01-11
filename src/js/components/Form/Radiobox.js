import React from 'react'

export default class Radiobox extends React.Component {
  render() {
    return (
      <>
        <div className="mb-2">
          <label className="block">
            {this.props.question}
          </label>
          {this.props.extra && <span>{this.props.extra}</span>}

          <div className={'flex flex-col'}>
            {this.props.options.map((option, key) =>
              <label className={'font-normal my-1'} key={key}>
                <input required={true} name={`wordproof_options[${this.props.slug}]`} type="radio" data-slug={this.props.slug}
                       value={option.value} defaultChecked={this.props.get(this.props.slug) === option.value}
                       onChange={this.props.update}/>
                {option.name}
              </label>
            )}
          </div>
        </div>
      </>
    )
  }
}
