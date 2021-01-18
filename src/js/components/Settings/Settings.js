import React, {Component} from 'react'
import Template from "./Partials/Template";
import Automatic from "./Partials/Automatic";
import Manual from "./Partials/Manual";
import SettingsRadioButtons from "./Partials/SettingsRadioButtons";

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            certificateText: wordproofSettings.certificateText,
            certificateDOMSelector: wordproofSettings.certificateDOMSelector,
            customDomain: wordproofSettings.customDomain,
            showInfoLink: wordproofSettings.showInfoLink,
            hidePostColumn: wordproofSettings.hidePostColumn,
            sendTimestampsWithOrder: wordproofSettings.sendTimestampsWithOrder,
            timestampsOrderText: wordproofSettings.timestampsOrderText,
            hideOnHomepage: wordproofSettings.hideOnHomepage,
            hideAdvanced: true
        }
    }

    updateState = (key, value) => {
        this.setState({key: value});
    };

    handleAdvancedOptions = (e) => {
        e.preventDefault();
        this.setState({hideAdvanced: false});
    }

    renderAdditionalSettings = () => {
        const setting = (wordproofSettings.isWSFYActive) ? 'automatic' : (!wordproofSettings.isWSFYActive && wordproofSettings.walletIsConnected) ? 'manual' : '';

        switch (setting) {
            case 'automatic':
                return <Automatic hideAdvanced={this.state.hideAdvanced}/>;
            case 'manual':
                return <Manual hideAdvanced={this.state.hideAdvanced}/>;
            default:
                break;
        }
    }

    render() {
        return (
            <Template current={'settings'}>
                <h3>General Settings</h3>

                <div className="form-group">
                    <label htmlFor="wordproof_customize[certificate_text]" className="label" title="Certificate Text">How
                        do you want to
                        refer to the WordProof timestamp certificate? </label>
                    <input type="text" className="textinput" name="wordproof_customize[certificate_text]"
                           value={this.state.certificateText}
                           onChange={e => this.setState({certificateText: e.target.value})}
                           id="wordproof_customize[certificate_text]"/>
                </div>

                <SettingsRadioButtons
                    update={this.updateState}
                    initialValue={this.state.sendTimestampsWithOrder}
                    label={'Send timestamps of products and Terms & Conditions with the order confirmation email'}
                    slug={'send_timestamps_with_order'}
                    description={''}
                    options={{'never': 'Disable', 'always': 'Always', 'ask_user_to_disable': 'Ask the user, enabled by default', 'ask_user_to_enable': 'Ask the user, disabled by default'}}
                />

                {this.renderAdditionalSettings()}

                <div className={`form-group ${this.state.hideAdvanced ? 'hidden' : ''}`}>
                    <label htmlFor="wordproof_customize[certificate_dom_selector]" className="label"
                           title="Certificate DOM Selector">Certificate DOM Selector</label>
                    <input type="text" className="textinput" name="wordproof_customize[certificate_dom_selector]"
                           placeholder="eg. .entry-meta or #mydiv"
                           value={this.state.certificateDOMSelector}
                           onChange={e => this.setState({certificateDOMSelector: e.target.value})}
                           id="wordproof_customize[certificate_dom_selector]"/>
                </div>

                <div className={`form-group ${this.state.hideAdvanced ? 'hidden' : ''}`}>
                    <label htmlFor="wordproof_customize[custom_domain]" className="label" title="Custom Domain">Custom
                        Domain</label>
                    <input type="text" className="textinput" name="wordproof_customize[custom_domain]" placeholder=""
                           value={this.state.customDomain} onChange={e => this.setState({customDomain: e.target.value})}
                           id="wordproof_customize[custom_domain]"/>
                    <p>For some setups (eg. GetShifter.io), a custom URL should be supplied to correctly show the link
                        in the certificate.</p>
                </div>

                <div className={`form-group ${this.state.hideAdvanced ? 'hidden' : ''}`}>
                    <label htmlFor="wordproof_customize[show_info_link]" className="label" title="Show Info Link">Show
                        Info Link</label>
                    <input type="text" className="textinput" name="wordproof_customize[show_info_link]" placeholder=""
                           value={this.state.showInfoLink} onChange={e => this.setState({showInfoLink: e.target.value})}
                           id="wordproof_customize[show_info_link]"/>
                    <p>Enter HTML which will be displayed behind the WordProof Certificate Link. In most cases, this is
                        used to add a link to a page which explains what WordProof is. Please add your own classes and CSS. Leave empty to hide.</p>
                </div>

                <div className={`form-group ${this.state.hideAdvanced ? 'hidden' : ''}`}>
                    <label htmlFor="wordproof_customize[hide_post_column]" className="label" title="Display Revisions">Hide
                        Post Column</label>
                    <input type="checkbox" value="1" className="" name="wordproof_customize[hide_post_column]"
                           onChange={e => this.setState({hidePostColumn: e.target.value})}
                           defaultChecked={this.state.hidePostColumn}
                           id="wordproof_customize[hide_post_column]"/>
                </div>

                <h3>E-Commerce Settings</h3>
                <SettingsRadioButtons
                    update={this.updateState}
                    initialValue={this.state.sendTimestampsWithOrder}
                    label={'Send timestamps of products and Terms & Conditions with the order confirmation email'}
                    slug={'send_timestamps_with_order'}
                    description={''}
                    options={{'never': 'Disable', 'always': 'Always', 'ask_user_to_disable': 'Ask the user, enabled by default', 'ask_user_to_enable': 'Ask the user, disabled by default'}}
                />

                <div className={`form-group`}>
                    <label htmlFor="wordproof_customize[timestamps_order_text]" className="label"
                           title="Add message to the timestamps">Add message to the timestamps</label>
                    <input type="text" className="textinput" name="wordproof_customize[timestamps_order_text]"
                           placeholder=""
                           value={this.state.timestampsOrderText}
                           onChange={e => this.setState({timestampsOrderText: e.target.value})}
                           id="wordproof_customize[timestamps_order_text]"/>
                </div>

                <input type="submit" name="submit" id="submit" className="wbtn wbtn-primary"
                       value={wordproofSettings.saveChanges}/>

                <button
                    className={`block underline text-blue-500 bg-transparant border-0 p-0 mt-4 cursor-pointer ${this.state.hideAdvanced ? '' : 'hidden'}`}
                    onClick={this.handleAdvancedOptions}>Show advanced settings
                </button>

            </Template>
        )
    }
}
