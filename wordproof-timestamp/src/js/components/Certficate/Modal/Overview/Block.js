import React from 'react';

export default class Block extends React.Component {
    render() {
        return (
            <div className={`border-2 border-solid border-gray-300 rounded-lg p-4 md:px-4 md:py-5 mb-3`}>
                <div className={`flex flex-col`}>
                    <div className={`flex flex-col md:flex-row text-base text-gray-700`}>
                        <div className={'mb-2 md:m-0 md:w-1/12'}>{this.props.icon}</div>
                        <div className={'md:pl-3'}>
                            <h3 className={`text-lg text-black font-medium`}>{this.props.title}</h3>
                            <p className={`mb-2`}>{this.props.description}</p>

                                <button className={`text-darkblue font-medium`}
                                        onClick={this.props.onLinkClick}>&gt; {this.props.linkText}</button>
                        </div>
                    </div>
                    <div className={`flex flex-row text-sm mt-4 text-gray-600`}>
                        <div className={'w-1/12'}><span className={`float-right`}>{this.props.endingIcon}</span></div>
                        <span className={'pl-3'}>{this.props.endingText}</span>
                    </div>
                </div>
            </div>
        );
    }
}
