import React, {Component} from 'react'
import axios from 'axios';
import Intro from '../Intro';
import TextField from "../../Form/TextField";
import {Loader} from "../../Extras/Images";
import qs from "qs";

export default class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            hasKey: null,
            loading: false,
            disabled: false,
            connection: null,
        }
    }

    componentDidMount() {
        this.validate(false);
    }

    deactivate() {
        this.props.update(null, 'wsfy_is_active', false);
        this.props.nextStep();
    }

    setNewClient() {
        this.setState({hasKey: null, connection: false});
    }

    hasSiteKey(val) {
        this.setState({hasKey: val})
    }

    async validate(showError = true) {
        this.setState({disabled: true, loading: true});
        axios.post(wordproof.ajax.url, qs.stringify({
            'action': 'wordproof_validate_token',
            'security': wordproof.ajax.security
        })).then((response) => {
            this.setState({disabled: false, loading: false});
            if (response.data.success) {
                this.setState({connection: true});
                this.props.update(null, 'wsfy_is_active', true);
                this.props.update(null, 'balance', response.data.balance);
            } else {
                this.props.update(null, 'wsfy_is_active', false);
                if (showError) {
                    this.setState({error: 'No connection could be established. Please re-check your Site Key.'})
                }
            }
        });
    }

    saveSiteKey(a, b, value) {
        if (value !== undefined) {
            const data = value.split('&');
            if (data.length === 3) {

                axios.post(wordproof.ajax.url, qs.stringify({
                    'action': 'wordproof_update_settings',
                    'options': {
                        'client_id': '',
                        'client_secret': '',
                        'expiration': '',
                        'refresh_token': '',
                        'site_token': '',
                        'site_id': data[0],
                        'access_token': data[1],
                        'token_id': data[2],
                    },
                    'security': wordproof.ajax.security
                }));
                this.setState({error: null});
            } else {
                this.setState({error: 'This Site Key seems invalid. Please fetch a new one.'});
            }
        }
    }

    render() {
        return (
            <div className="wordproof-wizard-step">
                <Intro title="Connect WordProof to your website"
                       subtitle="Paste your site key to connect your site to My WordProof. Create a free account if you don’t have one yet."/>

                {(this.state.loading) && <div className={'flex items-center justify-center my-6'}>
                    <Loader color={`#00CBA9`}/>
                    <span className={`pl-3 text-center block`}><strong>Connecting with WordProof...</strong></span>
                </div>
                }

                {(this.state.connection) && <div className={'flex items-center justify-center my-6'}>
                    <span className={`pl-3 text-center block`}><strong>Great! Connected with WordProof.</strong></span>
                </div>
                }

                {(this.state.hasKey === null && !this.state.loading && !this.state.connection) && <div>
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
                    slug={'site_key'} question={'What is your Site Key?'}
                    extra={'Your Site Key is visible after you have created your account.'}
                    update={this.saveSiteKey.bind(this)} initial={''}
                    error={this.state.error}/>
                }

                {(this.state.hasKey && !this.state.connection) && <button
                    className={'wbtn wbtn-primary'} onClick={() => this.validate()} disabled={this.state.disabled}>Validate</button>
                }

                {(this.state.connection) && <div>
                    <button
                        className={'wbtn wbtn-secondary mr-4'} onClick={() => this.setNewClient()}>Replace Site Key</button>
                    <button className={'wbtn wbtn-primary'} onClick={() => this.props.nextStep()}>Save & Continue</button>
                </div>
                }

                {(wordproof.currentValues.isWSFYActive) && <span
                    className={'block underline cursor-pointer text-xs text-gray-500 mb-3 mt-4'}
                    onClick={() => this.deactivate()}>Click here to deactivate automatic timestamping</span>
                }
            </div>
        );
    }
}
