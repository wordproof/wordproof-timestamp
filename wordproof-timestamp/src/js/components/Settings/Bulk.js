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
            messages: []
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

    addMessage(message) {
        console.log(message);
        let messages = this.state.messages;
        messages.push(message);
        this.setState({messages: messages});
    }

    startTimestamping(e) {
        e.preventDefault();
        this.state.selected.map((type) => {
            wordproofSettings.bulk.counts[type].map((id) => {
                console.log(id);
                this.sendRequest(id, type);
            })
        })
    }

    async sendRequest(id, type) {
        const result = await axios.post(wordproofData.urls.ajax, qs.stringify({
            'action': 'wordproof_wsfy_save_post',
            'post_id': id,
            'security': wordproofData.ajaxSecurity
        }));

        this.addMessage(TimestampButton.retrieveMessage(result, type));
    }

    renderMessages() {
        this.state.messages.map((message) => {
            console.log(message);
            return (message);
        })
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

                <button onClick={(e) => this.startTimestamping(e)} className={'wbtn wbtn-primary'}>Start Timestamping</button>

                {this.renderMessages()}

            </Template>
        )
    }
}
