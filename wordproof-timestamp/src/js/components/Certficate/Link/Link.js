import React from 'react';

class Link extends React.Component {
    openModal = () => {
        document.dispatchEvent(new Event('wordproof.modal.open'));
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
