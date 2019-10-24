import React from 'react';

export default class SelectArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.selected
        }
    }

    change = (event) => {
        if (this.props.for === 'old') {
            this.props.setOld(event.target.value);
        } else if (this.props.for === 'new') {
            this.props.setNew(event.target.value);
        }
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <select className={'w-full bg-white border-2 border-gray-300 mb-3 py-2 px-3 h-10 max-h-full'} onChange={(e) => this.change(e)} value={this.state.value}>
                {this.props.articles.map((article, index) => {
                    return (<option data-for={this.props.for} key={index} value={index}>{article.date}</option>)
                })}
            </select>
        );
    }
}
