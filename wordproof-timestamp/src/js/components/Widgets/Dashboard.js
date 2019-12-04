import React, {Component} from 'react';
import TimestampButton from "../Extras/TimestampButton";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'status': this.getStatus(),
        };
    }

    getStatus() {
        if (!wordproofDashboard.isActive)
            return 'not_configured';

        if (parseInt(wordproofDashboard.balance) === 0)
            return 'no_balance';

        if (parseInt(wordproofDashboard.timestampCount) === 0)
            return 'not_timestamped';

        return 'timestamp_overview';
    }

    renderView() {
        switch (this.state.status) {
            case 'not_configured':
                return (
                    <>
                        <p>You didn&apos;t finish the setup of WordProof Timestamp yet. Get started with the free
                            plan!</p>
                        <ul className={'mb-4'}>
                            <li className={'mb-1'}><strong>Protect your copyright</strong> - automatic content
                                protection
                            </li>
                            <li className={'mb-1'}><strong>Increase your trustworthiness</strong> - verifiable trust for
                                your visitors
                            </li>
                            <li className={'mb-1'}><strong>Structure your content</strong> - add timestamps to your
                                structured data
                            </li>
                        </ul>

                        <a href={wordproofData.urls.wizard} className={'button button-primary'}>Start the WordProof
                            Setup Wizard</a>
                    </>
                );
            case 'no_balance':
                return (
                    <>
                        <strong className={'block mb-3'}>You have used all your timestamps this period. Upgrade your
                            plan to protect your new
                            content and existing content.</strong>

                        <strong>Recently placed timestamps:</strong>
                        {this.getTable(wordproofDashboard.recentStampedItems)}

                        <a href={''} className={'button button-primary'}>Upgrade your plan for more timestamps</a>
                    </>
                );
            case 'not_timestamped':
                return (
                    <>
                        <p>Timestamp your first content!</p>
                        <strong>Recent posts</strong>

                        {this.getTable(wordproofDashboard.recentUnstampedPosts)}
                        <br/>
                        <strong>Recent pages</strong>
                        {this.getTable(wordproofDashboard.recentUnstampedPages)}

                        <a href={''} className={'button button-primary'}>Timestamp
                            all {wordproofDashboard.unprotectedAmount} pieces of content</a>
                    </>
                );
            case 'timestamp_overview':
                return (<>
                    <strong>Recently placed timestamps:</strong>
                    {this.getTable(wordproofDashboard.recentStampedItems)}

                    <span className={'block mb-2'}><strong>Tip: </strong>did you timestamp your T&C yet? If not, <a
                        href={'#'}>learn why you should!</a></span>

                    <strong>Unprotected content:</strong>
                    {this.getTable(wordproofDashboard.recentUnstampeditems)}

                    <span className={'block mb-3'}>{wordproofDashboard.unprotectedMessage}</span>

                    <a href={''} className={'button button-primary'}>Timestamp
                        all {wordproofDashboard.unprotectedAmount} pieces of content</a>
                </>);
            default:
                return false;
        }
    }

    getTable(posts) {
        return (posts.length === 0) ? <span className={'block mb-3'}><i>No posts found.</i></span> : <table className={'mb-3'}>
            <tbody>
            {posts.map((item, i) => {
                return (
                    <tr key={i}>
                        <td>{item.post.title}</td>
                        <td><TimestampButton automate={wordproofDashboard.isWSFYActive} post={item.post}
                                             meta={item.meta} onlyShowActions={true}/></td>
                    </tr>
                );
            })}
            </tbody>
        </table>;
    }

    render() {
        return (
            <div className={'wordproof-dashboard-widget-inner'}>
                {this.renderView()}
            </div>
        );
    }
}
