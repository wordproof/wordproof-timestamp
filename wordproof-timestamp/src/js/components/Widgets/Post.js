import React, {Component} from 'react';
import Metabox from "../Metabox/Metabox";

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'status': this.getStatus(),
        };
    }

    getStatus() {
        if (!wordproofPost.isActive)
            return 'not_configured';

        if (!wordproofPost.isWSFYActive)
            return 'manual';

        if (parseInt(wordproofPost.balance) === 0)
            return 'no_balance';

        if (!wordproofPost.autoStamped)
            return 'no_auto_stamp';

        return '';
    }

    renderView() {
        switch (this.state.status) {
            case 'not_configured':
                return (
                    <>
                        <p>To protect your content, increase trust and enjoy next generation SEO benefits, configure WordProof (for free).</p>
                        <a href={wordproofData.urls.wizard} className={'button button-primary'}>Configure WordProof</a>
                    </>
                );
            case 'manual':
                return <Metabox/>;
            case 'no_balance':
                return (
                    <>
                        <strong>This content is at risk, along with { wordproofPost.unprotectedAmount }  others. Upgrade
                            your WordProof plan to protect your content.</strong>
                        <a href={'wordproofData.urls.upgradeExternal'} className={'button button-primary'}>Choose a WordProof plan</a>
                    </>
                );
            case 'no_auto_stamp':
                return (<>
                    <strong className={'block mb-2'}>This post will not be timestamped automatically when you publish or update.</strong>
                    <p>Please <a href={wordproofData.urls.settings} target="_blank" rel="noopener noreferrer">update your settings</a> or timestamp your content on the overview page.</p>
                </>)
            case '':
                return (<>
                    <strong className={'block mb-2'}>This post will be timestamped automatically when you publish or update.</strong>
                    {(wordproofPost.isTimestamped === 'timestamped') && <p>✅ Timestamped (<a href={wordproofPost.permalink + '#wordproof'} target="_blank" rel="noopener noreferrer">view certificate</a>)</p>}
                    {(wordproofPost.isTimestamped === 'not_timestamped') && <p>⛔️ This content is not timestamped yet</p>}
                    {(wordproofPost.isTimestamped === 'awaiting_callback') && <p>⏳️ Awaiting callback</p>}
                    {(wordproofPost.isTimestamped === 'outdated') && <p>⛔️ The latest version of this content is not timestamped yet</p>}
                </>);
            default:
                return false;
        }
    }

    render() {
        return (
            <div className={'wordproof-post-widget-inner pt-2'}>
                {this.renderView()}
            </div>
        );
    }
}
