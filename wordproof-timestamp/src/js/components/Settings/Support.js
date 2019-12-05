import React, {Component} from 'react'
import Template from "./Partials/Template";

export default class Support extends Component {
    constructor(props) {
        super(props)
        this.state = {}
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
                <h3>Credits</h3>
                <p><a href="https://wordproof.io/wordpress-plugin-wordproof/credits/" target="_blank"
                      rel="noopener noreferrer">WordProof Timestamp plugin Credits</a></p>

                <h3>Learn</h3>
                <p>
                    Are you a WordPress developer? Developing with blockchain technology might spark your interest
                    too. <a href='https://eos.io/' rel="noopener noreferrer" target="_blank">EOS.IO</a> is open
                    source blockchain technology.
                    With WordProof you can timestamp your WordPress content for free in EOS.IO blockchains.
                </p>
                <p>
                    Want to learn how to develop smart contracts and decentralised applications with EOS.IO?
                    WordProof collaborates with Everything EOS and Cypherglass, to offer the course for free for
                    WordPress users.
                </p>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/EUcOY-UpRq0" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                <p>
                    Enter the course TODAY via <a href="https://www.everythingeos.io/eos-course-wordproof"
                                                  rel="noopener noreferrer" target="_blank">this link</a> to get
                    FREE access as a WordProof user.
                </p>
            </Template>
        )
    }
}
