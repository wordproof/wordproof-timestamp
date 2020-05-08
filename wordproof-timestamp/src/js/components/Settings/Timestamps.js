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
                <p>Some posts may have been timestamped more than once.</p>

                <div className="">
                    <div className="bg-white shadow-md rounded my-6">
                        <table
                            className="text-left w-full border-collapse">
                            <thead>
                            <tr>
                                <th className="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Last Timestamped</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Title</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">URL</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Post Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            {wordproofSettings.recentlyStampedItems.map((post, i) => {
                                return (
                                    <tr key={i} className="hover:bg-grey-lighter">
                                        <td className="py-4 px-6 border-b border-grey-light">{post.date}</td>
                                        <td className="py-4 px-6 border-b border-grey-light"><strong>{post.title}</strong></td>
                                        <td className="py-4 px-6 border-b border-grey-light"><a href={post.url} target="_blank" rel="noopener noreferrer">{post.url}</a></td>
                                        <td className="py-4 px-6 border-b border-grey-light">{ post.type }</td>
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
