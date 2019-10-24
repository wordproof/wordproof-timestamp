import React from 'react';

export default class ButtonListItem extends React.Component {
    click(e) {
        if (this.props.navigate) {
            e.preventDefault();
            document.dispatchEvent(new Event('wordproof.modal.navigate.' + this.props.navigate));
        }
    }

    render() {
        return (
            <a className={'text-blue-600'} href={this.props.href} target="_blank" rel="noopener noreferrer"
               onClick={ (e) => this.click(e) }>{ this.props.children }</a>
        );
    }
}
