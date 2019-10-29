import React from 'react';

export default class SelectArticle extends React.Component {

    dateToLocale = (iso, index) => {
        const locale = wordproof.modal.locale.replace('_', '-');
        const dateObject = new Date(iso);
        const date = dateObject.toLocaleDateString(locale);
        const time = dateObject.toLocaleTimeString(locale);

        let string = date + ' ' + wStrings.compare.at + ' ' + time;

        if (index === 0)
            string =  wStrings.compare.recent + ' ' + string;

        if (index === this.props.articles.length-1)
            string =  wStrings.compare.first + ' ' + string;

        return string;
    };

    change = (event) => {
        if (this.props.for === 'old') {
            this.props.setOld(event.target.value);
        } else if (this.props.for === 'new') {
            this.props.setNew(event.target.value);
        } else if (this.props.for === 'raw') {
            this.props.setArticle(event.target.value);
        }
        this.setState({value: event.target.value});
    };

    render() {
        return (
            <select className={'w-full bg-white border-2 border-gray-300 mb-3 py-2 px-3 h-10 max-h-full'} onChange={(e) => this.change(e)} value={this.props.selected}>
                {this.props.articles.map((article, index) => {
                    return (<option disabled={this.props.disabledIndexes.includes(index)} data-for={this.props.for} key={index} value={index}>{ this.dateToLocale(article.date, index) }</option>)
                })}
            </select>
        );
    }
}
