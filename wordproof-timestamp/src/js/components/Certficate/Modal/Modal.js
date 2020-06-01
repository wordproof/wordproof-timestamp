import React from 'react';
import axios from 'axios';
import qs from 'qs';
import root from 'react-shadow';
import {sha256} from 'js-sha256';

import './Modal.scss';
import getItems from "./schemaHelper";

import Overview from "./Overview/Overview";
import Compare from "./Compare/Compare";
import CompareRaw from "./Compare/CompareRaw";
import CompareExplanation from "./Compare/CompareExplanation";
import OverviewImportance from "./Overview/OverviewImportance";

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            items: null,
            view: 'overview',
            validTimestamp: null,
        };

        this.views = [
            'overview',
            'overview.importance',
            'compare',
            'compare.raw',
            'compare.explanation',
        ];
    }

    componentDidMount() {
        this.prepare();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items !== this.state.items) {
            const local = this.state.items[0].hash;
            const hashed = sha256(JSON.stringify(this.state.items[0].raw));

            const modified = new Date(this.state.items[0].date);
            const lastEdited = new Date(wordproof.modal.lastModified);

            const valid = (local === hashed) && (modified.getTime() === lastEdited.getTime());
            this.setState({validTimestamp: valid});
        }
    }

    changeView = (view) => {
        if (this.views.includes(view)) {
            this.setState({view: view});
        }
    };

    renderView = () => {
        switch (this.state.view) {
            case 'overview':
                return <Overview valid={this.state.validTimestamp} items={this.state.items}/>;
            case 'overview.importance':
                return <OverviewImportance valid={this.state.validTimestamp}/>;
            case 'compare':
                return <Compare items={this.state.items} noRevisions={this.state.items.length === 1}/>;
            case 'compare.explanation':
                return <CompareExplanation valid={this.state.validTimestamp}/>;
            case 'compare.raw':
                return <CompareRaw items={this.state.items} noRevisions={this.state.items.length === 1}/>;
            default:
                return null;
        }
    };

    prepare = () => {
        document.addEventListener('wordproof.modal.open', this.open);
        document.addEventListener('wordproof.modal.close', this.close);
        window.addEventListener('keydown', this.handleKey);

        this.navigation();
        this.getItemsFromSchema();

        if (window.location.hash.includes('wordproof'))
            this.open();
    };

    navigation = () => {
        document.addEventListener('wordproof.modal.navigate.overview', () => this.changeView('overview'));
        document.addEventListener('wordproof.modal.navigate.overview.importance', () => this.changeView('overview.importance'));
        document.addEventListener('wordproof.modal.navigate.compare', () => this.changeView('compare'));
        document.addEventListener('wordproof.modal.navigate.compare.raw', () => this.changeView('compare.raw'));
        document.addEventListener('wordproof.modal.navigate.compare.explanation', () => this.changeView('compare.explanation'));
    };

    handleKey = (e) => {
        if (e.key === 'Esc' || e.key === 'Escape') {
            this.close();
        }
    };

    close = () => {
        this.setState({
            view: 'overview',
            active: false
        });
    };

    open = () => {
        this.setState({active: true});
        this.getItemsFromMy();
    };

    getItemsFromSchema = () => {
        const schema = JSON.parse(document.querySelector('script.wordproof-schema').innerHTML);
        const items = getItems(schema);
        this.setState({items: items});
    };

    getItemsFromMy = async () => {
        if (wordproof.automate && wordproof.automate.active && wordproof.automate.options.show_revisions === true) {

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const body = {
                action: 'wordproof_get_articles', //TODO
                post_id: wordproof.postId,
                security: wordproof.ajaxSecurity
            };

            await axios.post(wordproof.ajaxURL, qs.stringify(body), config)
            .then((response) => {
               const schema = response.data;
                if (typeof schema === 'object' && !(schema instanceof Array)) {
                    const script = document.querySelector('script.wordproof-schema');
                    script.innerHTML = JSON.stringify(schema);
                    const items = getItems(schema);
                    this.setState({items: items});
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    render() {
        return (
            <root.div>
                <div
                    className={`modal ${(!this.state.active) ? 'opacity-0 pointer-events-none' : ''} fixed w-full h-full top-0 left-0 flex items-center justify-center`}>
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={this.close}
                         aria-hidden={true}>
                    </div>

                    <div
                        className="modal-container h-modal overflow-x-hidden overflow-y-auto bg-white w-11/12 md:max-w-4xl mx-auto rounded-lg shadow z-50 overflow-y-auto"
                        aria-modal={this.state.active} role={'modal'}
                        aria-describedby={'WordProof Timestamp Certificate'}>
                        <div className={'h-full'} role={'document'}>
                            {this.renderView()}
                        </div>
                    </div>
                </div>
                <link rel="preload" href={wordproof.modal.css} as="style" />
                <link rel="stylesheet" href={wordproof.modal.css} as="style" />
            </root.div>
        )
    }
}

export default Modal;
