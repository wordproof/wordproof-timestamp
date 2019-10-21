import React from 'react';

import root from 'react-shadow';
import styles from './Modal.scss';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

        this.prepare();
    };

    prepare = () => {
        document.addEventListener('wordproof.modal.open', this.open);
        window.addEventListener('keydown', this.handleKey);
    };

    handleKey = (e) => {
        if (e.key === 'Esc' || e.key === 'Escape') {
            this.close();
        }
    };

    close = () => {
        this.setState({active: false});
    };

    open = () => {
        this.setState({active: true});
    };

    retrieveRevisions = () => {

    };

    render() {
        return (
            <root.div>
                <div className={`${(!this.state.active) ? 'opacity-0 pointer-events-none' : ''} fixed w-full h-full top-0 left-0 flex items-center justify-center`}>
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={this.close}>
                    </div>

                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

                        <div className="modal-content py-4 text-left px-6">
                            <p>Modal content can go here</p>
                        </div>
                    </div>
                </div>
                <link rel="stylesheet" type="text/css" href={wordproof.css}/>
            </root.div>
        )
    }
}

export default Modal;
