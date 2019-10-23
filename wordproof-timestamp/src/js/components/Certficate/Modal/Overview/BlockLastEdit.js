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
        return (
            <Block icon={<Clock/>} title={'Test'} description={'test'} showLink={this.props.articles.length > 1} linkText={'View Previous Versions'} onLinkClick={this.click}
                   endingIcon={<Check/>} endingText={'Hello Goodbye'}/>
        )
    }
}
