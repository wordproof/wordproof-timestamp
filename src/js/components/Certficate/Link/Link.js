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
        <p style={this.containerStyle}>
            <Icon onClick={this.openModal} style={this.logoStyle}/>
            <a onClick={this.openModal} style={this.linkStyle} data-post-id={ this.props.postId } href={ this.props.url }>{ this.props.text }</a>
            {(this.props.infoLink) && <div style={this.infoLinkStyle} dangerouslySetInnerHTML={{ __html: this.props.infoLink }} />}

        </p>
        )
    }
}

export default Link;
