import React, {Component} from 'react'
import Template from "./Partials/Template";

export default class Timestamps extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Template current={'timestamps'}>
                <h3>Timestamps</h3>
                <p>Thank you for using the WordProof Timestamp plugin! Blockchain is a difficult technology which
                    requires the set-up of a wallet. This can be a daunting process, but we have a great community
                    to help you out. The WordProof community is active in our Telegram groups, where we talk about
                    new features and help each other. Please join these groups for any support requests:</p>

            </Template>
        )
    }
}
