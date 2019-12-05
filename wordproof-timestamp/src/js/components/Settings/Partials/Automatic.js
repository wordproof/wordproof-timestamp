import React, {Component} from 'react'

export default class Automatic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wsfyIsActive: wordproofSettings.isWSFYActive,
            siteToken: wordproofSettings.wsfy.site_token,
            siteId: wordproofSettings.wsfy.site_id,
            showRevisions: wordproofSettings.wsfy.show_revisions,
            allowedPostTypes: wordproofSettings.wsfy.allowed_post_types,
            whitelistedIps: (wordproofSettings.wsfy.whitelisted_ips) ? wordproofSettings.wsfy.whitelisted_ips.toString() : '',
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
                    <label htmlFor="wsfy_settings[show_revisions]" className="label" title="Display Revisions">Show
                        Revisions</label>
                    <input type="checkbox" value="1" className="" name="wsfy_settings[show_revisions]"
                           id="wsfy_settings[show_revisions]"
                           onChange={e => this.setState({showRevisions: e.target.value})}
                           defaultChecked={this.state.showRevisions}/>
                </div>

                <div className={`form-group`}>
                    <label htmlFor="" className="label">Post Types to timestamp automatically</label>

                    {this.state.registeredPostTypes.map((value) => {
                        return <div key={value}>
                            <input key={value} type="checkbox" value={value}
                                   name={`wsfy_settings[allowed_post_types][${value}]`}
                                   id={`wsfy_settings[allowed_post_types][${value}]`}
                                   defaultChecked={this.state.allowedPostTypes.includes(value)}/>
                            <label htmlFor={`wsfy_settings[allowed_post_types][${value}]`}>{value}</label>
                        </div>
                    })}
                </div>

                <div className={`form-group ${this.props.hideAdvanced ? 'hidden' : ''}`}>
                    <label htmlFor="wsfy_settings[whitelisted_ips]" className="label" title="Whitelisted IPs">Whitelisted
                        IP&apos;s</label>
                    <input type="text" className="textinput" name="wsfy_settings[whitelisted_ips]" placeholder=""
                           value={this.state.whitelistedIps}
                           onChange={e => this.setState({whitelistedIps: e.target.value})}
                           id="wsfy_settings[whitelisted_ips]"/>
                    <p>DANGEROUS. For some server setups, callbacks are redirected through a different IP address. Add
                        this IP or IP&apos;s to this field to allow callbacks from this origin. Be careful with shared
                        hosting environments. Use a comma to separate multiple IP&apos;s. </p>
                </div>
            </>
        )
    }
}
