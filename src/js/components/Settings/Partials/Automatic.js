import React, {Component} from 'react'

export default class Automatic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRevisions: wordproofSettings.wsfy.show_revisions,
            allowedPostTypes: wordproofSettings.wsfy.allowed_post_types,
            hideAdvanced: true,
            registeredPostTypes: Object.values(wordproofSettings.registeredPostTypes),
        }
    }

    handleAdvancedOptions = (e) => {
        e.preventDefault();
        this.setState({hideAdvanced: false});
    }

    render() {
        return (

            <>
                <div className="form-group">
                    <label htmlFor="wordproof_settings[show_revisions]" className="label" title="Display Revisions">Show
                        Revisions</label>
                    <input type="checkbox" value="1" className="" name="wordproof_settings[show_revisions]"
                           id="wordproof_settings[show_revisions]"
                           onChange={e => this.setState({showRevisions: e.target.value})}
                           defaultChecked={this.state.showRevisions}/>
                </div>

                <div className={`form-group`}>
                    <label htmlFor="" className="label">Post Types to timestamp automatically</label>

                    {this.state.registeredPostTypes.map((value) => {
                        return <div key={value}>
                            <input key={value} type="checkbox" value={value}
                                   name={`wordproof_settings[allowed_post_types][${value}]`}
                                   id={`wordproof_settings[allowed_post_types][${value}]`}
                                   defaultChecked={this.state.allowedPostTypes.includes(value)}/>
                            <label htmlFor={`wordproof_settings[allowed_post_types][${value}]`}>{value}</label>
                        </div>
                    })}
                </div>
            </>
        )
    }
}
