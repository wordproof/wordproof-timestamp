import React from 'react';
import {Icon} from '../Modal/components/Logo';

class Link extends React.Component {
    constructor(props) {
        super(props);
        this.containerStyle = {
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
        };

        this.linkStyle = {
            padding: 0,
            margin: 0,
            textDecoration: 'none',
            border: 'none',
            lineHeight: 1,
            boxShadow: 'none'
        };

        this.logoStyle = {

        };
    }

    openModal = () => {
        document.dispatchEvent(new Event('wordproof.modal.open'));
    };

    render() {
        return (
        <p onClick={this.openModal} style={this.containerStyle}>
            <Icon style={this.logoStyle}/>
            <a style={this.linkStyle} data-post-id={ this.props.postId } href={ this.props.url }>{ this.props.text }</a>
        </p>
        )
    }
}

export default Link;
