import React from 'react';

class Link extends React.Component {
    openModal = () => {
        const event = new Event('wordproof.modal.open');
        document.dispatchEvent(event);
    };

    render() {
        return (
        <p onClick={this.openModal}>
            <img src='' alt='WordProof timestamp certificate'/>
            <a data-post-id={ this.props.postId } href={ this.props.url }>{ this.props.text }</a>
        </p>
        )
    }
}

export default Link;
