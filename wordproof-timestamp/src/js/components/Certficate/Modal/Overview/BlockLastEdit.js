import React from 'react';
import Block from './Block';
import {Check, Clock} from '../components/Icons';

export default class BlockLastEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    click = () => {
        document.dispatchEvent(new Event('wordproof.modal.navigate.compare'));
    };

    render() {
        const withRevisions = this.props.articles.length > 1;
        return (
            <Block icon={<Clock/>}
                   title={withRevisions ? wStrings.overview.block.compare.withRevisions.title : wStrings.overview.block.compare.withoutRevisions.title}
                   description={withRevisions ? wStrings.overview.block.compare.withRevisions.description : wStrings.overview.block.compare.withoutRevisions.description}
                   linkText={withRevisions ? wStrings.overview.block.compare.withRevisions.linkText : wStrings.overview.block.compare.withoutRevisions.linkText}
                   onLinkClick={this.click} endingIcon={<Check/>} endingText={wStrings.overview.block.compare.subText}/>
        )
    }
}
