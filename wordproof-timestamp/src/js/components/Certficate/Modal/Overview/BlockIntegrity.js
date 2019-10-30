import React from 'react';
import Block from './Block';
import {Pen, Check, Cross} from '../components/Icons';

export default class BlockIntegrity extends React.Component {
    click = () => {
        document.dispatchEvent(new Event('wordproof.modal.navigate.overview.importance'));
    };

    render() {
        return (
            <Block icon={<Pen />} title={this.props.valid ? wStrings.overview.block.importance.valid.title : wStrings.overview.block.importance.invalid.title}
                   description={this.props.valid ? wStrings.overview.block.importance.valid.description : wStrings.overview.block.importance.invalid.description}
                   linkText={wStrings.overview.block.importance.linkText} onLinkClick={this.click}
                   endingIcon={this.props.valid ? <Check/> : <Cross/>} endingText={wStrings.overview.block.importance.subText} />
        )
    }
}
