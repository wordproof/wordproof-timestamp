import React from 'react';

export default class Compare extends React.Component {

    constructor(props) {
        super(props);
        const amount = this.props.articles.length;

        this.state = {
            old: this.props.articles[amount-2],
            new: this.props.articles[amount-1],
        }
    }

    changeNew = () => {

    };

    changeOld = () => {

    };

    render() {
        return (
            <div className={'flex flex-row'}>
                <div className={''}>
                    <textarea value={this.state.old}/>
                </div>
                <div className={''}>
                    <textarea value={this.state.new}/>
                </div>
            </div>
        );
    }
}
