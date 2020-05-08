import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';

export default class TimestampButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'status': null,
            'show': true,
            'message': '',
            'hideLabels': props.hideLabels,
            'post': (props.post) ? props.post : null,
            'meta': (props.meta) ? props.meta : null,
            'loading': (props.loading) ? props.loading : false,
            'loopTill': false
        };
    }

    componentDidMount() {

        if (this.state.post === null || this.state.meta === null) {
            this.refreshPostData();
        } else {
            this.setState({status: this.getStatus()});
        }

    }

    async refreshPostData() {
        const result = await axios.post(wordproofData.urls.ajax, qs.stringify({
            'action': 'wordproof_get_post_data',
            'post_id': (this.state.post.id) ? this.state.post.id : wordproofPost.postId,
            'security': wordproofData.ajaxSecurity
        }));

        this.setState({
                post: result.data.post,
                meta: result.data.meta,
            }, () => this.setState({status: this.getStatus(), show: true, message: ''})
        );
    }

    getStatus() {
        if (this.state.post.status !== 'publish' && this.state.post.status !== 'inherit')
            return 'not_published';

        if (!this.state.meta.date)
            return 'not_timestamped';

        if (this.state.meta.date !== this.state.post.date_modified)
            return 'outdated';

        if (!this.state.meta.blockchain)
            return 'awaiting_callback';

        return 'timestamped';
    }

    renderView() {
        switch (this.state.status) {
            case 'not_published':
                return <span>🕓 Not published yet</span>;
            case 'not_timestamped':
                return <div><span hidden={this.state.hideLabels}>🚨 Not timestamped</span> {this.getTimestampButton()}
                </div>;
            case 'outdated':
                return <div><span
                    hidden={this.state.hideLabels}>🚨 Timestamp is outdated</span> {this.getTimestampButton()}</div>;
            case 'awaiting_callback':
                return <div><span
                    hidden={this.state.hideLabels}>🕓 Waiting for callback...</span> {this.getRetryCallbackButton()}</div>;
            case 'timestamped':
                if (this.state.post.type === 'post' || this.state.post.type === 'page' || this.state.post.type === 'product')
                    return <a href={this.state.post.permalink + '#wordproof'}>✅ Certificate</a>;
                return <span>✅ Timestamped</span>;
            default:
                return false;
        }
    }

    getRetryCallbackButton() {
        if (this.props.automate && this.state.show) {
            let now = Math.ceil(Date.now() / 1000);
            let lastTimestamped = parseInt(this.state.meta.timestampedOn) + 20;
            if (!this.state.meta.timestampedOn || now > lastTimestamped) {
                return (
                    <button className={'button block'} disabled={this.state.disabled}
                            onClick={() => this.request('wordproof_wsfy_retry_callback')}>Request new callback</button>
                );
            }
        }
    }

    getTimestampButton() {
        if (this.props.automate && this.state.show) {
            return (
                <button className={'button block'} disabled={this.state.disabled}
                        onClick={() => this.request('wordproof_wsfy_save_post')}>Timestamp
                    this {this.state.post.type}</button>
            );
        }
    }

    async request(action) {
        this.setState({disabled: true});

        const result = await axios.post(wordproofData.urls.ajax, qs.stringify({
            'action': action,
            'post_id': this.state.post.id,
            'security': wordproofData.ajaxSecurity
        }));

        this.setState({
            show: false,
            message: TimestampButton.retrieveMessage(result, this.state.post.type)
        });

        this.startLoop();
    }

    startLoop() {
        this.setState({loopTill: Date.now() + 16000, hideLabels: false}, () => {

            const interval = setInterval(() => {

                if (!this.state.loopTill || Date.now() > this.state.loopTill || this.state.status === 'timestamped') {
                    this.setState({loopTill: false, disabled: false});
                    clearInterval(interval);
                }

                this.refreshPostData().then(() => {
                    if (this.state.status === 'timestamped')
                        this.setState({loopTill: false});
                });

            }, 3000);

        });
    }

    static retrieveMessage(result, postType) {

        if (typeof result === 'string')
            result = JSON.parse(result);

        if (result.data && typeof result.data === 'string')
            result.data = JSON.parse(result.data);

        if (result.data.errors && 'is_duplicate' in result.data.errors)
            return <span>🚚 This article already exists on the server</span>;

        if (result.data.errors && 'content' in result.data.errors)
            return <span>✍️ Add some content first!</span>;

        if (result.data.errors && 'cron_scheduled' in result.data.errors)
            return <span>⏰ This article is already scheduled to be timestamped</span>;

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
                {(this.state.loopTill) ?
                    <img className={`loading-spinner`} src={wordproofData.images.loading} alt={`loading`}/> : ''}
                {(this.state.show) ? this.renderView() : ''}
                {this.state.message}
            </div>
        );
    }
}

