import React from 'react';

export default class Text extends React.Component {
    render() {
        return (
            <div className={'w-full max-w-full py-5 px-4 rounded-lg border-2 border-gray-300 overflow-y-scroll'} style={{'maxHeight': '280px'}}>
                {this.props.raw ? (
                    <div className={'w-full break-all'}>{this.props.text}</div>
                ) : (
                    <div className={'w-full break-all'} dangerouslySetInnerHTML={{__html: this.props.text}}/>
                )}
            </div>
        );
    }
}
