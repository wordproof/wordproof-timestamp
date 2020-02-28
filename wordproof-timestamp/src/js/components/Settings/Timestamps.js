import React, {Component} from 'react'
import Template from "./Partials/Template";

export default class Timestamps extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Template current={'timestamps'}>
                <h3>Timestamps</h3>
                <p>Thank you for using the WordProof Timestamp plugin! Blockchain is a difficult technology which
                    requires the set-up of a wallet. This can be a daunting process, but we have a great community
                    to help you out. The WordProof community is active in our Telegram groups, where we talk about
                    new features and help each other. Please join these groups for any support requests:</p>

                <div className="">
                    <div className="bg-white shadow-md rounded my-6">
                        <table
                            className="text-left w-full border-collapse">
                            <thead>
                            <tr>
                                <th className="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Date</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Title</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Url</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">New Balance</th>
                            </tr>
                            </thead>
                            <tbody>
                            {wordproofSettings.recentlyStampedItems.map((post, i) => {
                                return (
                                    <tr className="hover:bg-grey-lighter">
                                        <td className="py-4 px-6 border-b border-grey-light">{post.date}</td>
                                        <td className="py-4 px-6 border-b border-grey-light"><strong>{post.title}</strong></td>
                                        <td className="py-4 px-6 border-b border-grey-light"><a href={post.url} target="_blank" rel="noopener noreferrer">{post.url}</a></td>
                                        <td className="py-4 px-6 border-b border-grey-light">{ parseInt(wordproofSettings.balance) - i }</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ul>

                </ul>
            </Template>
        )
    }
}
