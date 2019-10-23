import React from 'react';

export default class ButtonList extends React.Component {
    toRaw() {
        document.dispatchEvent(new Event('wordproof.modal.navigate.compare.raw'));
    }

    render() {
        return (
            <div>
                <span onClick={this.toRaw}>Raw</span>
            </div>
        );
    }
}
