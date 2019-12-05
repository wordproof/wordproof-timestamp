import React, {Component} from 'react';
import {Cookies, withCookies} from 'react-cookie';
import {instanceOf} from 'prop-types';
import qs from 'qs';
import Timestamp from './Timestamp';
import axios from 'axios';

class Manual extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.state = {
            network: wordproofSettings.network,
            notificationMessage: null,
            showTimestamp: false
        }
    }

    handleNetwork = async (e) => {
        this.setCookie('admin_network_changed', true);
        let network = e.target.value;
        wordproofData.network = network;
        this.updateRequest('network', network);
        this.setState({network: network});
    }

    updateRequest(slug, value) {
        axios.post(wordproofSettings.updateSettingsEndpoint, qs.stringify({
            'action': 'wordproof_update_setting',
            'key': slug,
            'value': value
        }));
    }

    handleSave = () => {
        this.setState({showTimestamp: true});
    }

    setCookie = (key, value) => {
        const {cookies} = this.props;
        cookies.set(key, value, {path: '/', maxAge: 3600})
    }

    handleWindowPopup = (event, url, network) => {
        event.preventDefault();
        window.open(
            url + '?b=' + network,
            'popUpWindow',
            'height=1000,width=900,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
        );
        this.registerSetupWizardOpened();
    }

    registerSetupWizardOpened = () => {
        return fetch(wordproofData.ajaxURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:
                'action=wordproof_setup_start' +
                '&security=' + wordproofData.ajaxSecurity,
        }).then((response) => {
            return response.json();
        })
        .catch(error => console.error(error));
    }

    checkActiveRadio = (name) => {
        return this.state.network === name;
    }

    render() {
        return (
            <>
                {!this.state.showTimestamp ?
                    <div className={'mb-4'}>
                        <p>The WordProof Timestamp set-up consists of three steps and takes about 15 minutes. You only
                            need to do this once using the WordProof Account Creator tool, which will guide you through
                            the process of creating a blockchain account and configuring your wallet.</p>

                        <p>Choose on which blockchain you want to timestamp your content. If you are not sure what this means, don’t worry! We recommend to start on the Telos blockchain, since accounts are free.</p>

                        <h3>Pick a Blockchain</h3>

                        <div className="form-group">
                            <label htmlFor="wordproof_network_telos"
                                   className={`radio-box ${this.checkActiveRadio('telos_main') ? 'selected' : ''}`}>
                                <input type="radio" id="wordproof_network_telos" name="wordproof_network"
                                       data-readable-name="Telos"
                                       value="telos_main"
                                       checked={this.state.network === "telos_main"} onChange={this.handleNetwork}/>
                                <img src={`${wordproofData.pluginDirUrl}assets/images/telos.png`} alt="telos"/>
                                <span>Telos</span>
                            </label>
                            <label htmlFor="wordproof_network_eos"
                                   className={`radio-box ${this.checkActiveRadio('eos_main') ? 'selected' : ''}`}>
                                <input type="radio" id="wordproof_network_eos" name="wordproof_network"
                                       data-readable-name="EOS"
                                       value="eos_main"
                                       checked={this.state.network === "eos_main"} onChange={this.handleNetwork}/>
                                <img src={`${wordproofData.pluginDirUrl}assets/images/eos.png`} alt="telos"/>
                                <span>EOS</span>
                            </label>
                            <label htmlFor="wordproof_network_jungle"
                                   className={`radio-box ${this.checkActiveRadio('eos_jungle') ? 'selected' : ''} ${this.props.hideAdvanced ? 'hidden' : ''}`}>
                                <input type="radio" id="wordproof_network_jungle" name="wordproof_network"
                                       data-readable-name="EOS Jungle"
                                       value="eos_jungle"
                                       checked={this.state.network === "eos_jungle"} onChange={this.handleNetwork}/>
                                <img src={`${wordproofData.pluginDirUrl}assets/images/eos.png`} alt="telos"/>
                                <span>EOS Jungle<br/>Testnet</span>
                            </label>
                        </div>

                        {(() => {
                            switch (this.state.network) {
                                case 'eos_main':
                                    return <p>To use EOS, you need to buy an EOS account. The Wizard will walk you
                                        through the entire
                                        process.</p>;
                                case 'eos_jungle':
                                    return <p>To use the EOS Jungle testnet, you should have your wallet setup already.
                                        Headover
                                        to &apos;Timestamp&apos; to test your connection.</p>;
                                case 'telos_main':
                                    return <p>Telos is the innovation district of the EOS.IO ecosystem. If you want to
                                        know more about
                                        Telos,
                                        read <a
                                            href="https://medium.com/goodblock-io/welcome-to-telos-wordproof-user-fd719b171341"
                                            target="_blank" rel="noopener noreferrer">this introduction article by Telos
                                            founder
                                            Douglas
                                            Horn</a>.</p>
                                default:
                            }
                        })()}

                        <p>After making your choice, you are ready to set up WordProof! Click the button below to open
                            our wizard,
                            which
                            will guide you through the rest of our process.</p>

                        <button className="wbtn mr-4"
                                onClick={(e) => this.handleWindowPopup(e, 'https://wordproof.io/setup', this.state.network)}>
                            Launch the Manual Setup Wizard
                        </button>

                        <button className="wbtn wbtn-primary" onClick={this.handleSave}>
                            Save and check connection
                        </button>
                    </div>

                    : //Switching Component
                    <div>
                        <Timestamp/>
                    </div>
                }

            </>

        )
    }
}

export default withCookies(Manual);
