import React, {Component} from 'react'

export default class NavigationLink extends Component {
    render() {
        return (
            <a href={this.props.link}
               className={`block no-underline p-3 pt-4 border-solid border-0 text-gray-700 ${(this.props.current === this.props.screen) ? 'border-b-4 border-wordproof text-wordproof font-semibold' : ''}`}>{ this.props.label} </a>
        )
    }
}
