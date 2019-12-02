import React, {Component} from 'react';

export default class Widget extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="wordproof-dashboard-widget">

                <div className={'not-configured'}>
                    <p>You didn&apos;t finish the setup of WordProof Timestamp yet. Get started with the free plan!</p>
                    <ul className={'mb-4'}>
                        <li className={'mb-1'}><strong>Protect your copyright</strong> - automatic content protection</li>
                        <li className={'mb-1'}><strong>Increase your trustworthiness</strong> - verifiable trust for your visitors</li>
                        <li className={'mb-1'}><strong>Structure your content</strong> - add timestamps to your structured data</li>
                    </ul>

                    <a href={wordproofData.urls.wizard} className={'button button-primary'}>Start the WordProof
                        Setup Wizard</a>
                </div>
            </div>
        )
    }
}
