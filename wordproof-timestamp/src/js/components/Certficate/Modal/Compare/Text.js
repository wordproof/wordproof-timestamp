import React from 'react';

export default class Text extends React.Component {
    render() {
        console.log(this.props.text);
        return (
            this.props.raw ? (
                <textarea
                    className={'w-full max-w-full py-5 px-4 rounded-lg border-2 border-gray-300 overflow-y-scroll resize-none'}
                    style={{'height': '280px'}}>
                        {this.props.text}
                    </textarea>
            ) : (
                <div className={'w-full max-w-full py-5 px-4 rounded-lg border-2 border-gray-300 overflow-y-scroll'}
                     style={{'maxHeight': '280px'}}>
                    <div className={'w-full break-all'} dangerouslySetInnerHTML={{__html: this.props.text}}/>
                </div>
            )

        );
    }
}
