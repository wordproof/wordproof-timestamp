import React from 'react';

import root from 'react-shadow';
import './Modal.scss';

import {LockUnsecure} from './components/Lock';
import BlockIntegrity from "./Dashboard/BlockIntegrity";
import BlockLastEdit from "./Dashboard/BlockLastEdit";
import Nav from "./components/Nav";

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: true,
            view: 'overview'
        };

        this.views = [
            'dashboard',
            'compare',
            'importance',
        ];

        this.prepare();
    }

    changeView = () => {

    };

    prepare = () => {
        document.addEventListener('wordproof.modal.open', this.open);
        document.addEventListener('wordproof.modal.close', this.close);
        window.addEventListener('keydown', this.handleKey);
        this.retrieveRevisions();
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
        //TODO: Set focus
        this.setState({active: true});
    };

    retrieveRevisions = () => {
      if (wordproof.automate.active) {
          fetch(wordproof.automate.api + wordproof.modal.uid + '?site_id=' + wordproof.automate.options.site_id).then((response) => {
              if (response.ok) {
                  return response.json();
              }
          }).then((schema) => {
              if (typeof schema === 'object' && !(schema instanceof Array)) {
                  const script = document.querySelector('script.wordproof-schema');
                  script.innerHTML = JSON.stringify(schema);
                  console.log(schema);
                  // document.dispatchEvent(new CustomEvent('newArticles', {detail: schema}));
              }
          });
      }
    };

    render() {
        return (
            <root.div>
                <div className={`modal ${(!this.state.active) ? 'opacity-0 pointer-events-none' : ''} fixed w-full h-full top-0 left-0 flex items-center justify-center`}>
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={this.close}
                        aria-hidden={true}>
                    </div>

                    <div className="modal-container bg-white w-11/12 md:max-w-3xl mx-auto rounded-lg rounded-bl-none shadow z-50 overflow-y-auto"
                         aria-modal={this.state.active} role={'modal'} aria-labelledby={''} aria-describedby={''}>

                        <Nav title={'This Content is WordProof'}/>

                        <div className={'flex flex-row'}>
                            <div className={'w-1/3'}>
                                <LockUnsecure className={'w-full'}/>
                            </div>
                            <div className={'w-2/3 py-4 text-left px-6'}>
                                <BlockIntegrity />
                                <BlockLastEdit />
                            </div>
                        </div>
                    </div>
                </div>
                <link rel="stylesheet" type="text/css" href={wordproof.modal.css}/>
            </root.div>
        )
    }
}

export default Modal;
