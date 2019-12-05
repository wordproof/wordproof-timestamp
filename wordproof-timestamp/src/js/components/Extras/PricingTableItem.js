import React, {Component} from 'react';
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

    static capitalize([firstLetter, ...rest]) {
        return [firstLetter.toLocaleUpperCase(), ...rest].join('');
    }

    render() {
        const object = {
            'free' : {
                'timestamps': '10',
                'bonus': '0',
                'month' : {
                    'price': '0',
                },
                'annual' : {
                    'price': '0',
                }
            },
            'hobby' : {
                'timestamps': '25',
                'bonus': '100',
                'month' : {
                    'price': '7.50',
                },
                'annual' : {
                    'price': '6.50',
                }
            },
            'professional' : {
                'timestamps': '100',
                'bonus': '200',
                'month' : {
                    'price': '12.50',
                },
                'annual' : {
                    'price': '11.50',
                }
            },
            'business' : {
                'timestamps': '250',
                'bonus': '1000',
                'month' : {
                    'price': '25.00',
                },
                'annual' : {
                    'price': '22.00',
                }
            },
        };
        return (
            <div className={`w-1/4 shadow ${(this.props.recommended) ? 'shadow-lg border-solid border-2 border-wordproof' : ''}`}>
                <div className={'p-8'}>

                {(this.props.recommended) ?
                    <><span className="text-sm font-medium bg-orange-400 py-1 px-2 rounded text-white align-middle mb-4 inline-block">Recommended</span><br/></>
                    : '' }

                <strong className={'block'}>{ PricingTableItem.capitalize(this.props.plan) }</strong>

                <div className="flex flex-row items-baseline justify-center m-6">
                    <span className="text-2xl">€</span>
                    <span className="text-5xl font-bold px-3 tracking-tighter text-black">{ object[this.props.plan][this.state.period].price }</span>
                    <span className="text-lg">/mo</span>
                </div>

                <ul>
                    <PricingListItem><strong>{object[this.props.plan].timestamps} timestamps</strong> per month</PricingListItem>
                    <PricingListItem>Posts, pages and media files</PricingListItem>
                    <PricingListItem>View certificate text</PricingListItem>
                    <PricingListItem>Download certificates</PricingListItem>
                    <PricingListItem>Compare unlimited revisions</PricingListItem>
                    <PricingListItem icon={(this.state.period === 'annual' ? 'check' : 'cross')}>{object[this.props.plan].bonus} bonus timestamps</PricingListItem>
                </ul>

                <a href={''} className={`wbtn ${(this.props.recommended) ? 'wbtn-primary' : ''}`}>Sign Up Today</a>

            </div>
            </div>
        )
    }
}

