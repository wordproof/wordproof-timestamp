import React, {Component} from 'react'
import Template from "./Partials/Template";
import axios from 'axios';
import qs from 'qs';
import TimestampButton from "../Extras/TimestampButton";

export default class Bulk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            messages: [],
            count: 0,
            running: false,
            done: false,
            postTypes: {},
            loading: false,
        }

        this.dismissNotice();
    }

    componentDidMount() {
        this.getPostTypeCounts();
    }

    dismissNotice() {
        axios.post(wordproofSettings.ajax.url, qs.stringify({
            'action': 'wordproof_dismiss_notice',
            'notice_key': 'wordproof_unprotected_posts_notice',
            'security': wordproofSettings.ajax.security
        }));
    }

    setPostType(e) {
        let selected = this.state.selected;
        let index = selected.indexOf(e.target.value);

        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(e.target.value);
        }
        this.setState({selected: selected});
    }

    getTotalAmountOfSelectedPosts() {
        let amount = 0;
        this.state.selected.map((type) => {
            amount = amount + this.state.postTypes[type].count;
        });
        return amount;
    }

    addMessage(message) {
        let messages = this.state.messages;
        messages.push(message);
        this.setState({messages: messages});
    }

    startTimestamping(e) {
        e.preventDefault();

        this.setState({running: true});

        let posts = [];
        this.state.selected.map((type) => {
            this.state.postTypes[type].ids.map((id) => {
                posts.push({type: type, id: id});
            });
        });

        let promise = Promise.resolve();
        posts.forEach((el) => {
            promise = promise.then(() => {

                this.sendRequest(el.id, el.type);
                this.setState({count: this.state.count + 1});

                return new Promise((resolve) => {
                    setTimeout(resolve, 1500);
                });
            });
        });

        promise.then(() => {
            this.setState({running: false, count: 0, done: true});
        });
    }

    async sendRequest(id, type) {
        const result = await axios.post(wordproofData.ajaxURL, qs.stringify({
            'action': 'wordproof_wsfy_save_post',
            'post_id': id,
            'security': wordproofData.ajaxSecurity
        }));

        this.addMessage(TimestampButton.retrieveMessage(result, type));
    }

    async getPostTypeCounts() {
        this.setState({loading: true});
        const response = await axios.post(wordproofData.ajaxURL, qs.stringify({
            'action': 'wordproof_get_unprotected_posts',
            'security': wordproofData.ajaxSecurity
        }));

        let postTypes = this.state.postTypes;
        let entries = Object.entries(response.data);

        for (const [type, data] of entries) {
            postTypes[type] = data;
        }

        console.log(postTypes);

        this.setState({postTypes: postTypes, loading: false});

    }

    render() {
        return (
            <Template current={'bulk'}>
                <h3>Bulk</h3>
                <table>
                    <tbody>

                    {(this.state.loading)
                        ? <tr>
                            <td>Retrieving post types...</td>
                        </tr>
                        : Object.entries(this.state.postTypes).map(([postType]) => (
                            <tr key={postType}>
                                <td><input id={'wordproof-bulk-' + postType} onChange={(e) => this.setPostType(e)}
                                           value={postType}
                                           type={'checkbox'}/></td>
                                <td><label htmlFor={'wordproof-bulk-' + postType}>{postType}</label></td>
                                <td>{this.state.postTypes[postType].count}</td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>

                {(this.state.running)
                    ? <span
                        className={'block mt-4'}>Timestamped {this.state.count} / {this.getTotalAmountOfSelectedPosts()} items. Please don&apos;t close this page.</span>
                    : ''
                }

                <button
                    disabled={this.state.running || this.state.loading || this.state.done || this.getTotalAmountOfSelectedPosts() > wordproofSettings.balance}
                    onClick={(e) => this.startTimestamping(e)}
                    className={'wbtn wbtn-primary my-4'}>Start Timestamping
                </button>

                {(this.getTotalAmountOfSelectedPosts() > wordproofSettings.balance) ?
                    <span className={'block mt-2'}>You do not have enough timestamps. Please <a
                        href={wordproofSettings.urls.upgradeExternal} target="_blank" rel="noopener noreferrer">upgrade your plan</a>.</span> : ''}

                <div className={'block'}>
                    {this.state.messages.map((message, key) => (
                        <span key={key} className={'block mb-2'}>{message}</span>
                    ))}
                </div>

            </Template>
        )
    }
}
