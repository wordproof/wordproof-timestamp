import React from 'react';
import Block from './Block';
import {Pen, Check} from '../components/Icons';

export default class BlockIntegrity extends React.Component {
    click = () => {
        document.dispatchEvent(new Event('wordproof.modal.navigate.overview.importance'));
    };

    render() {
        return (
            <Block icon={<Pen />} title={'Test'} description={'test'} showLink={true} linkText={'text'} onLinkClick={this.click}
                endingIcon={<Check/>} endingText={'Hello Goodbye'} />
        )
    }
}
