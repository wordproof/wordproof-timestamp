import React, {Component} from 'react'
import Template from "./Partials/Template";

export default class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.textRef = React.createRef();
        this.selectTextarea = this.selectText.bind(this);
    }

    componentDidMount() {
        this.textRef.current.scrollTop = this.textRef.current.scrollHeight;
    }

    selectText() {
        this.textRef.current.select();
    }

    render() {
        return (
            <Template current={'support'}>
                <h3>Support</h3>
                <p>Thank you for using the WordProof Timestamp plugin! Blockchain is a difficult technology which
                    requires the set-up of a wallet. This can be a daunting process, but we have a great community
                    to help you out. The WordProof community is active in our Telegram groups, where we talk about
                    new features and help each other. Please join these groups for any support requests:</p>
                <ul>
                    <li><a href="https://wordproof.io/guide" target="_blank" rel="noopener noreferrer">How to:
                        WordProof Timestamp Setup Guide</a></li>
                    <li><a href={'https://wordpress.org/support/plugin/wordproof-timestamp/'} target="_blank"
                           rel="noopener noreferrer">The WordPress support forum</a></li>
                    <li><a href="https://t.me/joinchat/DVuJAEfhf2QURBBjOWc2XA" target="_blank"
                           rel="noopener noreferrer">Telegram User Group</a></li>
                    <li><a href="https://t.me/WordProof" target="_blank" rel="noopener noreferrer">Telegram
                        Community Group</a></li>
                </ul>
                <p>For other inquiries, <a href="mailto:info@wordproof.io" target="_blank"
                                           rel="noopener noreferrer">Send an email</a>.</p>
                <h3>What to send along</h3>

                <p>To help you, we need some information about your system.
                    <span>
                        Please copy your <a href={wordproofSettings.debugging.siteHealthUrl} target="_blank"
                                            rel="noopener noreferrer">relevant site info</a> and include the log below.
                    </span>
                </p>

                <textarea ref={this.textRef} readOnly={true} onClick={() => this.selectText()} rows={`10`} cols={`100`}
                          defaultValue={wordproofSettings.debugging.log}></textarea>

                <h3>Credits</h3>
                <p><a href="https://wordproof.io/wordpress-plugin-wordproof/credits/" target="_blank"
                      rel="noopener noreferrer">WordProof Timestamp plugin Credits</a></p>
            </Template>
        )
    }
}
