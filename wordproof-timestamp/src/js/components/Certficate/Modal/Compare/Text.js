import React from 'react';

export default class Text extends React.Component {
    render() {
        return (
            <div className={'w-full py-5 px-4 rounded-lg border-2 border-gray-300 overflow-y-scroll'} style={{'maxHeight': '320px'}}>
                <div className={'w-full'} dangerouslySetInnerHTML={ {__html: this.props.text } }/>
            </div>
        );
    }
}
