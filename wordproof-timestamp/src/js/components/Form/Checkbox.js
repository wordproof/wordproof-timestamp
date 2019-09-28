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
              <label className={'font-normal my-1'} key={key}>
                <input name={`wordproof_options[${this.props.slug}][${option}]`}
                       type="checkbox" placeholder="" value={true} defaultChecked={this.props.get(this.props.slug).includes(option)}/>
                {option}
              </label>
            )}
          </div>
        </div>
      </>
    )
  }
}
