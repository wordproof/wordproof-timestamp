import React from 'react'

export default class Checkbox extends React.Component {
  update(e) {
    let values  = this.props.get(this.props.slug);
    let option  = e.target.getAttribute('data-option');
    let inArray = (values.indexOf(option) !== -1);
    if (e.target.checked && !inArray) {
      values.push(option);
    } else if(!e.target.checked && inArray) {
      values = values.filter(function(e) { return e !== option })
    }

    this.props.update(null, this.props.slug, values);
    this.save();
  }

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
                <input name={`wordproof_options[${this.props.slug}][${option}]`} type="checkbox" data-option={option}
                       defaultChecked={this.props.get(this.props.slug).includes(option)} onChange={(e) => this.update(e)} />
                {option}
              </label>
            )}
          </div>
        </div>
      </>
    )
  }
}
