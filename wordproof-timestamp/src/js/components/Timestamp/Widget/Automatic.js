import React, {Component} from 'react';
import ConnectionWidget from '../../ConnectionWidget/ConnectionWidget';
// import Button from "../Button";

export default class Automatic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            status: props.status,
            post: props.post,
            text: null,
            widgetStatus: 'connecting',
            loading: props.loading,
            buttonsDisabled: true,
            timestampStatus: null,
            timestampCertificateLink: null
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status}, () => {
                this.setTextAndStatusState();
            });
        }

        if (prevProps.post !== this.props.post)
            this.setState({post: this.props.post});

        if (prevProps.loading !== this.props.loading)
            this.setState({loading: this.props.loading});
    }

    componentDidMount() {
        this.setTextAndStatusState();
    }

    setTextAndStatusState = () => {
        const widgetStatus = this.getWidgetStatus();
        const text = this.getText();
        this.setState({
            text: {message: text.message, messageStrong: text.messageStrong},
            widgetStatus: widgetStatus
        });
    }

    getWidgetStatus = () => {
        if (this.state.status === 'timestamped')
            return 'success';

        if (this.state.loading)
            return 'connecting';

        switch (this.state.status) {
            case 'awaiting_webhook':
            case 'not_published':
                return 'connecting'
            case 'timestamped':
                return 'success';
            case 'no_auto_stamp':
            case 'not_configured':
            case 'outdated':
            case 'not_timestamped':
            case 'no_balance':
            default:
                return 'failed';
        }
    }

    getText = () => {
        switch (this.state.status) {
            case 'not_configured':
                return {
                    message: <span>WordProof is not configured yet.</span>,
                    messageStrong: <a href={wordproofData.urls.wizard}>Start the Setup</a>
                };
            case 'outdated':
                return {
                    message: <span>The timestamp is outdated.</span>,
                    messageStrong: ''
                };
            case 'not_published':
                return {
                    message: <span>This {(this.state.post.type) ? this.state.post.type : 'post'} is not published yet</span>,
                    messageStrong: ''
                };
            case 'not_timestamped':
                return {
                    message: <span>This {(this.state.post.type) ? this.state.post.type : 'post'} is not timestamped.</span>,
                    messageStrong: ''
                };
            case 'no_balance':
                return {
                    message: <span>It seems you don&apos;t have WORD tokens left.</span>,
                    messageStrong: ''
                };

            case 'awaiting_webhook':
                return {
                    message: <span>🕓 Waiting for callback...</span>,
                    messageStrong: ''
                };
            case 'timestamped':
                return {
                    message: <span>This {(this.state.post.type) ? this.state.post.type : 'post'} is timestamped.</span>,
                    messageStrong: (this.state.post)
                        ? <a target="_blank" rel="noopener noreferrer"
                           href={this.state.post.permalink + '#wordproof'}>Certificate</a>
                        : ''
                };
            case 'no_auto_stamp':
                return {
                    message: <span>This {(this.state.post.type) ? this.state.post.type : 'post'} will not be timestamped automatically.</span>,
                    messageStrong: ''
                };
            default:
                return {
                    message: <span>Something went wrong</span>,
                    messageStrong: ''
                };
        }
    }

    render = () => {
        return (
            <div className="wordproof-metabox">
                <ConnectionWidget status={this.state.widgetStatus} provider={'wordpress'}
                                  text={this.state.text}/>

            </div>
        )
    }
}

