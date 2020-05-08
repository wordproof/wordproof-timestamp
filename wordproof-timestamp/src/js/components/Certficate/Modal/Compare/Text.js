import React from 'react';

export default class Text extends React.Component {
    render() {
        return (
            this.props.raw ? (
                <textarea
                    className={'w-full max-w-full py-5 px-4 rounded-lg border-2 border-gray-300 overflow-y-scroll resize-none text-gray-700'}
                    style={{'height': '280px'}} defaultValue={this.props.text}/>
            ) : (
                <div className={'w-full max-w-full py-5 px-4 rounded-lg border-2 border-gray-300 overflow-y-scroll text-gray-800'}
                     style={{'maxHeight': '280px'}}>
                    <div className={'w-full break-all'} dangerouslySetInnerHTML={{__html: this.props.text}}/>
                </div>
            )

        );
    }
}
