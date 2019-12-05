import React, {Component} from 'react'
import Template from "./Partials/Template";
import ModeDisplay from "../Extras/ModeDisplay";
import {Check} from "../Extras/Images";

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleWindowPopup = (event, url) => {
        event.preventDefault();
        window.open(
            url,
            'popUpWindow',
            'height=600,width=900,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
        );
    }

    render() {
        return (
            <Template current={'dashboard'}>
                <div className="flex flex-row">
                    <div className="w-1/2 pr-3">
                        <h3>Welcome to WordProof!</h3>
                        <p>By using WordProof Timestamp, you will...</p>
                        <ul>
                            <li><Check/> Protect your copyright</li>
                            <li><Check/> Increase your trustworthiness</li>
                            <li><Check/> Add timestamps to your structured data</li>
                        </ul>

                        <h3>How to timestamp your content</h3>
                        <p>After setting up WordProof with the Setup Wizard, here is how you timestamp:</p>
                        <ul>
                            <li>- New content will be timestamped automatically after publishing</li>
                            <li>- Existing content can be timestamped in two ways:
                            <ol className={'pt-2'}>
                                <li>Use the ‘Timestamp’ button in the WordProof Column on the Posts / Pages overview page</li>
                                <li>Use the Bulk Timestamp tool</li>
                            </ol></li>
                        </ul>

                        <h3>Mode</h3>
                        <p>We recommend you to use the Automatic mode. The manual mode is for tech-savvy blockchain users.</p>
                        <ModeDisplay/>

                        <span>To switch between modes, restart <a href={wordproofData.urls.wizard}>the Setup Wizard</a>.</span>

                    </div>
                    <div className="w-1/2 pl-3">
                        {wordproofSettings.isWSFYActive
                        &&
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/So_iNDb15-s" frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        }

                        <h3>Support</h3>
                        <p>The following resources might be helpful in case you need help:</p>
                        <ul>
                            <li><a href="https://wordproof.io/guide" target="_blank" rel="noopener noreferrer">How to: WordProof Timestamp Setup Guide</a></li>
                            <li><a href={'https://wordpress.org/support/plugin/wordproof-timestamp/'} target="_blank"
                                   rel="noopener noreferrer">Post a question on the WordPress forum</a></li>
                            <li><a href="https://t.me/joinchat/DVuJAEfhf2QURBBjOWc2XA" target="_blank"
                                   rel="noopener noreferrer">Join our Telegram User Group</a></li>
                        </ul>
                        <p>For other inquiries, please <a href="mailto:info@wordproof.io" target="_blank"
                                                   rel="noopener noreferrer">send an email</a>.</p>
                    </div>
                </div>
            </Template>
        )
    }
}
