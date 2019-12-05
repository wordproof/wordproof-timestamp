import React, {Component} from 'react';
import PricingTableItem from "./PricingTableItem";

export default class PricingTable extends Component {
    render() {
        return (
            <div className="flex flex-row text-center items-center">
                <PricingTableItem plan={'free'}/>
                <PricingTableItem plan={'hobby'}/>
                <PricingTableItem plan={'professional'} recommended={true}/>
                <PricingTableItem plan={'business'}/>
            </div>
        )
    }
}

