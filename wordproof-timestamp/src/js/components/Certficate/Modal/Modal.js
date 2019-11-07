import React from 'react';

import root from 'react-shadow';
import {sha256} from 'js-sha256';
import './Modal.scss';

import getArticles from "./schemaHelper";

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
            articles: null,
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
        if (prevState.articles !== this.state.articles) {
            //TODO: Check transaction on blockchain
            const local = this.state.articles[0].hash;
            const hashed = sha256(JSON.stringify(this.state.articles[0].raw));

            const modified = new Date(this.state.articles[0].date);
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
        switch(this.state.view) {
            case 'overview':
                return <Overview valid={this.state.validTimestamp} articles={this.state.articles}/>;
            case 'overview.importance':
                return <OverviewImportance valid={this.state.validTimestamp}/>;
            case 'compare':
                return <Compare articles={this.state.articles} noRevisions={this.state.articles.length === 1}/>;
            case 'compare.explanation':
                return <CompareExplanation valid={this.state.validTimestamp}/>;
            case 'compare.raw':
                return <CompareRaw articles={this.state.articles} noRevisions={this.state.articles.length === 1}/>;
            default:
                return null;
        }
    };

    prepare = () => {
        document.addEventListener('wordproof.modal.open', this.open);
        document.addEventListener('wordproof.modal.close', this.close);
        window.addEventListener('keydown', this.handleKey);

        this.navigation();
        this.getArticles();

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
        //TODO: Set focus
        this.setState({active: true});
    };

    getArticles = () => {
        const schema = JSON.parse(document.querySelector('script.wordproof-schema').innerHTML);
        const articles = getArticles(schema);
        this.setState({articles: articles});

        if (wordproof.automate.active) {
          fetch(wordproof.automate.api).then((response) => {
              if (response.ok) {
                  return response.json();
              }
          }).then((schema) => {
              if (typeof schema === 'object' && !(schema instanceof Array)) {
                  const script = document.querySelector('script.wordproof-schema');
                  script.innerHTML = JSON.stringify(schema);
                  const articles = getArticles(schema);
                  this.setState({articles: articles});
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

                    <div className="modal-container h-modal overflow-x-hidden overflow-y-auto bg-white w-11/12 md:max-w-4xl mx-auto rounded-lg shadow z-50 overflow-y-auto"
                         aria-modal={this.state.active} role={'modal'} aria-describedby={'WordProof Timestamp Certificate'}>
                        <div className={'h-full'} role={'document'}>
                            { this.renderView() }
                        </div>
                    </div>
                </div>
                <link rel="stylesheet" type="text/css" href={wordproof.modal.css}/>
            </root.div>
        )
    }
}

export default Modal;
