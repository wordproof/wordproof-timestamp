import React, {Component} from 'react'
import axios from 'axios';
import Intro from '../Intro';
import TextField from "../../Form/TextField";
import qs from "qs";

export default class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            hasKey: null,
        }
    }

    deactivate() {
        this.props.update(null, 'wsfy_is_active', false);
        this.props.nextStep();
    }

    hasSiteKey(val) {
        this.setState({hasKey: val})
    }

    async authorize() {
        axios.post(wordproof.ajax.url, qs.stringify({
            'action': 'wordproof_oauth_authorize',
            'security': wordproof.ajax.security
        })).then((response) => {
            window.location = response.data.redirect;
        });
    }
    //todo return after authorize and check connection
    async validate() {

        axios.post(wordproof.ajax.url, qs.stringify({
            'action': 'wordproof_validate_token',
            'security': wordproof.ajax.security
        })).then((response) => {
            // this.props.update(null, 'site_id', response.data.site_id);
            // this.props.update(null, 'wsfy_is_active', false);
            console.log(response.data);
        });


        // try {
        //     const response = await axios.get(wordproof.urls.api + wordproof.wsfyValidateTokenEndpoint, config);
        //
        //     if (response.status === 200 && response.data.success && response.data.site_id) {
        //         this.props.update(null, 'site_id', response.data.site_id);
        //         this.props.update(null, 'wsfy_is_active', true);
        //
        //         if (response.data.balance)
        //             this.props.update(null, 'balance', response.data.balance);
        //
        //         if (response.data.callback_successful)
        //             this.props.nextStep();
        //
        //         this.setState({
        //             error: <span>The callback to this site was not successful. Please <a
        //                 href={'https://wordproof.io/faq'} target="_blank"
        //                 rel="noopener noreferrer">check the FAQ</a> or <a
        //                 href={'https://wordproof.io/contact'} target="_blank" rel="noopener noreferrer">contact us</a>
        //                 to fix this problem.</span>
        //         });
        //
        //     } else {
        //         this.setState({error: 'This should not have happened. Please contact us.'});
        //     }
        //
        // } catch (error) {
        //     if (error.response.status === 401 && error.response.data && error.response.data.message === 'Unauthenticated.') {
        //         this.setState({error: 'The key you have filled in is not correct.'});
        //     }
        // }
    }

    render() {
        return (
            <div className="wordproof-wizard-step">
                <Intro title="Connect WordProof to your website"
                       subtitle="Paste your site key to connect your site to My WordProof. Create a free account if you don’t have one yet."/>

                {(this.state.hasKey === null) && <div>
                    <h3>Do you have a WordProof Site Key yet?</h3>
                    <div className={'flex flex-row'}>
                        <button onClick={() => this.hasSiteKey(true)} className={`wbtn wbtn-darkgreen px-16 mr-3`}>Yes
                        </button>
                        <button onClick={() => this.hasSiteKey(false)} className={`wbtn wbtn-darkgray px-16`}>No
                        </button>
                    </div>
                </div>
                }

                {(this.state.hasKey === false) && <div>
                    <h3>You need a WordProof account to set-up the automated version of WordProof Timestamp</h3>
                    <p className={'my-2'}>Set-up takes minutes and is free.</p>
                    <a onClick={() => this.hasSiteKey(true)}
                       className="wbtn wbtn-secondary mb-4 inline-block"
                       href={wordproof.urls.signup} target="_blank"
                       rel="noopener noreferrer">
                        Create My WordProof Account</a>
                </div>
                }

                {(this.state.hasKey) && <TextField
                    slug={'client_id'} question={'What is your client id?'}
                    extra={'Your client id is visible after you have created your account.'}
                    update={this.props.update} get={this.props.get} initial={this.props.initial}
                    error={this.state.error}/>
                }

                {(this.state.hasKey) && <TextField
                    slug={'client_secret'} question={'What is your client secret?'}
                    extra={'Your client secret is visible after you have created your account.'}
                    update={this.props.update} get={this.props.get} initial={this.props.initial}
                    error={this.state.error}/>
                }

                {(this.state.hasKey) && <button
                    className={'wbtn wbtn-primary'} onClick={() => this.authorize()}>Authorize</button>
                }

                <button className={'wbtn wbtn-primary'} onClick={() => this.validate()}>Validate</button>

                {(wordproof.currentValues.isWSFYActive) && <span
                    className={'block underline cursor-pointer text-xs text-gray-500 mb-3 mt-4'}
                    onClick={() => this.deactivate()}>Click here to deactivate automatic timestamping</span>
                }
            </div>
        );
    }
}
