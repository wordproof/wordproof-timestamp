import React, {Component} from 'react'

export default class SettingsRadioButtons extends Component {

    render() {
        return (<div>
            <p className={'mb-2 label'}>{this.props.label}</p>
            <div className={'mb-4'}>
                {Object.entries(this.props.options).map((value) => {
                    let key = value[0];
                    let label = value[1];

                    return (
                        <div key={key}>
                            <input key={key} type="radio" value={key}
                                   id={key}
                                   name={`wordproof_customize[${this.props.slug}]`}
                                   defaultChecked={this.props.initialValue === key}
                                   onChange={() => this.props.update('sendTimestampsWithOrder', key)}
                            />
                            <label htmlFor={key}>{label}</label>
                        </div>
                    )
                })}
            </div>
        </div>);
    }
}
