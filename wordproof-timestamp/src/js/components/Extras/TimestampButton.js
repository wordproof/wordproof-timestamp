import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';

export default class TimestampButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'status': this.getStatus(),
            'show': true,
            'message': '',
            'hideLabels': props.onlyShowActions
        };
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
                return <div><span hidden={this.state.hideLabels}>🚨 Not timestamped</span> {this.getTimestampButton()}</div>;
            case 'outdated':
                return <div><span hidden={this.state.hideLabels}>🚨 Timestamp is outdated</span> {this.getTimestampButton()}</div>;
            case 'awaiting_callback':
                return <div><span hidden={this.state.hideLabels}>🕓 Waiting for callback</span> {this.getRetryCallbackButton()}</div>;
            case 'timestamped':
                if (this.props.post.type === 'post' || this.props.post.type === 'page')
                    return <a href={this.props.post.permalink + '#wordproof'}>✅ Certificate</a>;
                return <span>✅ Timestamped</span>;
            default:
                return false;
        }
    }

    getRetryCallbackButton() {
        if (this.props.automate && this.state.show) {
            return (
                <button className={'button'} disabled={this.state.disabled}
                        onClick={() => this.request('wordproof_wsfy_retry_callback')}>Request new callback</button>
            );
        }
    }

    getTimestampButton() {
        if (this.props.automate && this.state.show) {
            return (
                <button className={'button block'} disabled={this.state.disabled}
                        onClick={() => this.request('wordproof_wsfy_save_post')}>Timestamp this {this.props.post.type}</button>
            );
        }
    }

    async request(action) {
        this.setState({disabled: true});

        const result = await axios.post(wordproofData.urls.ajax, qs.stringify({
            'action': action,
            'post_id': this.props.post.id,
            'security': wordproofData.ajaxSecurity
        }));

        this.setState({
            show: false,
            message: TimestampButton.retrieveMessage(result, this.props.post.type)
        });
    }

    static retrieveMessage(result, postType) {

        if (typeof result === 'string')
            result = JSON.parse(result);

        console.log(result);

        if (result.data && typeof result.data === 'string')
            result.data = JSON.parse(result.data);

        if (result.data.errors)
            return <span>🤭 Something went wrong {JSON.stringify(result.errors)}</span>;

        if (result.data && result.data.message === 'Unauthenticated.')
            return <span>🔐 <a href={wordproofData.urls.wizardConnect}>Please check if your Site Key if present and valid</a></span>;

        if (result.data && result.data.success)
            return <span>👍 {TimestampButton.uppercase(postType)} is sent to My WordProof</span>;

        return <span>🤭 Something went wrong.</span>;
    }

    static uppercase(string) {
        return string[0].toUpperCase() + string.substring(1)
    }

    render() {
        return (
            <div className={'wordproof-timestamp-button-inner'}>
                {(this.state.show) ? this.renderView() : ''}
                { this.state.message }
            </div>
        );
    }
}

