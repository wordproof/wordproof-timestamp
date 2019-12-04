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
                        <strong>This piece of content is at risk, like { wordproofPost.unprotectedAmount } other pieces. Upgrade your WordProof plan
                            to protect your content.</strong>
                        <a href={''} className={'button button-primary'}>Choose a WordProof plan</a>
                    </>
                );
            case '':
                return (<>
                    <strong className={'block mb-2'}>This post will be timestamped automatically when you publish or update.</strong>
                    <p>Currently, this post is <i>{ wordproofPost.isTimestamped }</i>.</p>
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
