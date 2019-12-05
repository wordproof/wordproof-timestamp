import React, {Component} from 'react';
import {Check} from "./Images";

export default class PricingListItem extends Component {
    render() {
        return (
            <li className={'flex flex-row items-center'}><Check/><span className={'pl-2'}>{ this.props.text }</span></li>
        )
    }
}

