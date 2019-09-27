import React from 'react'

export default class Checkbox extends React.Component {
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
              <label className={'list'} key={key}>
                <input name={`wordproof_options[${this.props.slug}][${option}]`}
                       type="checkbox" placeholder=""/>
                {option}
              </label>
            )}
          </div>
        </div>
      </>
    )
  }
}
