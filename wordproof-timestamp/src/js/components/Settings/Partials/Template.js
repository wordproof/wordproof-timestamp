import React, {Component} from 'react'
import {WordproofWithLogo} from '../../Extras/Images';
import NavigationLink from "./NavigationLink";

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <div className={'flex flex-row justify-center mb-8'}>
                    <WordproofWithLogo/>
                </div>
                <div className={'bg-white shadow px-6 mb-6 flex justify-between'}>
                    <NavigationLink link={wordproofSettings.urls.dashboard} screen={'dashboard'} label={'Dashboard'} current={this.props.current} />
                    <NavigationLink link={wordproofSettings.urls.settings} screen={'settings'} label={'Settings'} current={this.props.current} />
                    <NavigationLink link={wordproofSettings.urls.bulk} screen={'bulk'} label={'Bulk'} current={this.props.current} />
                    <NavigationLink link={wordproofSettings.urls.wizard} screen={'wizard'} label={'Wizard'} current={this.props.current} />
                    <NavigationLink link={wordproofSettings.urls.upgrade} screen={'upgrade'} label={'Upgrade'} current={this.props.current} />
                    <NavigationLink link={wordproofSettings.urls.support} screen={'support'} label={'Support'} current={this.props.current} />
                </div>

                <div className={'bg-white shadow pt-3 pb-6 px-6'}>
                    { this.props.children }
                </div>
            </>
        )
    }
}
