import React, {Component} from 'react';
import {Check, Cross} from "./Images";

export default class PricingListItem extends Component {
    render() {
        return (
            <li className={'flex flex-row items-center'}>{(this.props.icon === 'cross') ? <Cross/> : <Check/>}<span className={'pl-2'}>{ this.props.children }</span></li>
        )
    }
}

