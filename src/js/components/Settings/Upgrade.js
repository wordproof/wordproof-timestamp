import React, {Component} from 'react'
import Template from "./Partials/Template";
import PricingTable from "../Extras/PricingTable";

export default class Upgrade extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Template current={'upgrade'}>
                <h3>Upgrade</h3>
                <p className={'w-1/2'}>WordProof plans come with more timestamps and several features. You will receive bonus timestamps if
                    you choose for an annual plan.</p>
                <PricingTable/>
            </Template>
        )
    }
}
