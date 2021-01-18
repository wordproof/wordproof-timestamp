import React, {Component} from 'react'

export default class SettingsRadioButtons extends Component {

    render() {
        return (<div>
            <p className={'mb-2 label'}>{this.props.label}</p>
            <div className={'mb-4'}>
                {Object.entries(this.props.options).map((value) => {
                    let optionValue = value[0];
                    let optionlabel = value[1];
                    let domKey = this.props.slug+'['+optionValue+']';

                    let initialValue = this.props.initialValue;
                    if (typeof this.props.initialValue === "boolean") {
                        initialValue = (this.props.initialValue) ? '1' : '0';
                    }

                    if (typeof this.props.initialValue === "number") {
                        initialValue = this.props.initialValue + '';
                    }

                    return (
                        <div key={domKey}>
                            <input key={domKey} type="radio" value={optionValue}
                                   id={domKey}
                                   name={`wordproof_settings[${this.props.slug}]`}
                                   defaultChecked={initialValue === optionValue}
                                   onChange={() => this.props.update(this.props.stateKey, optionValue)}
                            />
                            <label htmlFor={domKey}>{optionlabel}</label>
                        </div>
                    )
                })}
            </div>
        </div>);
    }
}
