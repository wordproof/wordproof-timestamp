import React, {Component} from 'react'
import {WordproofWithLogo} from '../../Extras/Images';

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <div className={'flex flex-row justify-center mb-10'}>
                    <WordproofWithLogo/>
                </div>
                <div className={'bg-white shadow px-6 mb-6 flex justify-between'}>
                    <a href={''} className={'block p-3'}>General</a>
                    <a href={''} className={'block p-3'}>General</a>
                    <a href={''} className={'block p-3'}>General</a>
                    <a href={''} className={'block p-3'}>General</a>
                </div>

                <div className={'bg-white shadow pt-3 pb-6 px-6'}>
                    { this.props.children }
                </div>
            </>
        )
    }
}
