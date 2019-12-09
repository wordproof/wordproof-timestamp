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
        }
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

    getAmountOfPosts() {
        let amount = 0;
        this.state.selected.map((type) => {
            amount = amount + (wordproofSettings.bulk.counts[type]).length;
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

        let array = [];
        this.state.selected.map((type) => {
            let n = [];
            wordproofSettings.bulk.counts[type].map((id) => {
                n.push({type: type, id: id});
            });
            array = array.concat(n);
        });

        let promise = Promise.resolve();
        array.forEach((el) => {
            promise = promise.then(() => {

                this.sendRequest(el.id, el.type);
                this.setState({count: this.state.count + 1});

                return new Promise((resolve) => {
                    setTimeout(resolve, 1000);
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

    render() {
        return (
            <Template current={'bulk'}>
                <h3>Bulk</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><input id={'wordproof-bulk-posts'} onChange={(e) => this.setPostType(e)} value={'post'}
                                   type={'checkbox'}/></td>
                        <td><label htmlFor="wordproof-bulk-posts">Posts</label></td>
                        <td>{wordproofSettings.bulk.counts.post.length}</td>
                    </tr>
                    <tr>
                        <td><input id={'wordproof-bulk-pages'} onChange={(e) => this.setPostType(e)} value={'page'}
                                   type={'checkbox'}/></td>
                        <td><label htmlFor="wordproof-bulk-pages">Pages</label></td>
                        <td>{wordproofSettings.bulk.counts.page.length}</td>
                    </tr>
                    <tr>
                        <td><input id={'wordproof-bulk-attachments'} onChange={(e) => this.setPostType(e)}
                                   value={'attachment'} type={'checkbox'}/></td>
                        <td><label htmlFor="wordproof-bulk-attachments">Attachments</label></td>
                        <td>{wordproofSettings.bulk.counts.attachment.length}</td>
                    </tr>
                    </tbody>
                </table>

                {(this.state.running) ? <span className={'block mt-4'}>Timestamped {this.state.count } / { this.getAmountOfPosts()} items</span> : ''}

                <button disabled={this.state.running || this.state.done || this.getAmountOfPosts() > wordproofSettings.balance} onClick={(e) => this.startTimestamping(e)}
                        className={'wbtn wbtn-primary my-4'}>Start Timestamping
                </button>

                {(this.getAmountOfPosts() > wordproofSettings.balance) ? <span className={'block mt-2'}>You do not have enough timestamps. Please <a href={wordproofSettings.urls.upgradeExternal} target="_blank" rel="noopener noreferrer">upgrade your plan</a>.</span> : ''}

                <div className={'block'}>
                    {this.state.messages.map((message, key) => (
                    <span key={key} className={'block mb-2'}>{message}</span>
                ))}
                </div>

            </Template>
        )
    }
}
