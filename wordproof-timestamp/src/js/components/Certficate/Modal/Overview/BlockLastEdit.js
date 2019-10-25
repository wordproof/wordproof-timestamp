import React from 'react';
import Block from './Block';
import {Check, Clock, Cross, Pen} from '../components/Icons';

export default class BlockLastEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    click = () => {
        document.dispatchEvent(new Event('wordproof.modal.navigate.compare'));
    };

    render() {
        return (
            <Block icon={<Clock/>} title={wStrings.overview.block.compare.title} description={wStrings.overview.block.compare.description}
                   showLink={this.props.articles.length > 1} linkText={wStrings.overview.block.compare.linkText} onLinkClick={this.click}
                   endingIcon={<Check/>} endingText={wStrings.overview.block.compare.subText}/>
        )
    }
}
