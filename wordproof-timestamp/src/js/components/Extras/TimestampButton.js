import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';

export default class TimestampButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'status': this.getStatus(),
            'show': true,
            'message': ''
        };
        console.log(props.automate);
    }

    getStatus() {
        if (this.props.post.status !== 'publish' && this.props.post.status !== 'inherit')
            return 'not_published';

        if (!this.props.meta.date)
            return 'not_timestamped';

        if (this.props.meta.date !== this.props.post.date_modified)
            return 'outdated';

        if (!this.props.meta.blockchain)
            return 'awaiting_callback';

        return 'timestamped';
    }

    renderView() {
        switch (this.state.status) {
            case 'not_published':
                return <span>🕓 Not published yet</span>;
            case 'not_timestamped':
                return <div><span>🚨 Not timestamped</span> { this.getTimestampButton() }</div>;
            case 'outdated':
                return <div><span>🚨 Timestamp is outdated</span> { this.getTimestampButton() }</div>;
            case 'awaiting_callback':
                return <div><span>🕓 Waiting for callback</span> { this.getRetryCallbackButton() }</div>;
            case 'timestamped':
                return <a href={this.props.post.permalink + '#wordproof'}>✅</a>;
            default:
                return false;
        }
    }

    getRetryCallbackButton() {
        if (this.props.automate && this.state.show) {
            return (
                <div>
                    <button className={'button'} onClick={() => this.request('wordproof_wsfy_retry_callback')}>Request new callback</button>
                </div>
            );
        }
    }

    getTimestampButton() {
        if (this.props.automate && this.state.show) {
            return (
                <div>
                    <button className={'button'} onClick={(e) => this.request(e, 'wordproof_wsfy_save_post')}>Timestamp this post</button>
                </div>
            );
        }
    }

    request(event, action) {
        event.preventDefault();

        axios.post(wordproofData.urls.ajax, qs.stringify({
            'action': action,
            'post_id': this.props.post.id,
            'security': wordproofData.ajaxSecurity
        }));
    }

    render() {
        return (
            <div className={'wordproof-timestamp-button-inner'}>
                {this.renderView()}
                <span>{this.state.message}</span>
            </div>
        );
    }
}

