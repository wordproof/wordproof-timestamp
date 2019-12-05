import React, {Component} from 'react';
import {Check} from "./Images";
import PricingListItem from "./PricingListItem";

export default class PricingTableItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'period': 'annual'
        }
    }

    changePeriod() {
        this.setState({'period': (this.state.period === 'annual' ? 'month' : 'annual')})
    }

    render() {
        const object = {
            'free' : {
                'timestamps': '10',
                'month' : {
                    'price': '0',
                    'bonus': '0',
                },
                'annual' : {
                    'price': '0',
                    'bonus': '0',
                }
            },
            'hobby' : {
                'timestamps': '25',
                'month' : {
                    'price': '7.50',
                    'bonus': '0',
                },
                'annual' : {
                    'price': '6.50',
                    'bonus': '100',
                }
            },
            'professional' : {
                'timestamps': '100',
                'month' : {
                    'price': '12.50',
                    'bonus': '0',
                },
                'annual' : {
                    'price': '11.50',
                    'bonus': '300',
                }
            },
            'business' : {
                'timestamps': '250',
                'month' : {
                    'price': '25.00',
                    'bonus': '0',
                },
                'annual' : {
                    'price': '22.00',
                    'bonus': '1000',
                }
            },
        };
        return (
            <div className={`w-1/4 shadow ${(this.props.recommended) ? 'shadow-lg border-solid border-2 border-wordproof' : ''}`}>
                <div className={'p-8'}>

                {(this.props.recommended) ?
                    <><span className="text-sm font-medium bg-orange-400 py-1 px-2 rounded text-white align-middle mb-4 inline-block">Recommended</span><br/></>
                    : '' }

                <strong className={'block'}>{ this.props.plan }</strong>

                <div className="flex flex-row items-baseline justify-center m-6">
                    <span className="text-2xl">€</span>
                    <span className="text-5xl font-bold px-3 tracking-tighter text-black">{ object[this.props.plan][this.state.period].price }</span>
                    <span className="text-lg">/mo</span>
                </div>

                <ul>
                    <PricingListItem text={'10 timestamps per month'}/>
                    <PricingListItem text={'10 timestamps per month'}/>
                    <PricingListItem text={'10 timestamps per month'}/>
                    <PricingListItem text={'10 timestamps per month'}/>
                    <PricingListItem text={'10 timestamps per month'}/>
                </ul>

                <a href={''} className={`wbtn ${(this.props.recommended) ? 'wbtn-primary' : ''}`}>Sign Up Today</a>

            </div>
            </div>
        )
    }
}

