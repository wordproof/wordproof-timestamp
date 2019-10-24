import React from 'react';

import root from 'react-shadow';
import './Modal.scss';

import getArticles from "./schemaHelper";

import Overview from "./Overview/Overview";
import Compare from "./Compare/Compare";
import CompareRaw from "./Compare/CompareRaw";
import OverviewImportance from "./Overview/OverviewImportance";

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: true,
            articles: null,
            view: 'overview'
        };

        this.views = [
            'overview',
            'overview.importance',
            'compare',
            'compare.raw',
        ];
    }

    componentDidMount() {
        this.prepare();
        /**
         * TODO: Is article secure? Set locks.
         */
    }

    changeView = (view) => {
        if (this.views.includes(view)) {
            this.setState({view: view});
        }
    };

    renderView = () => {
        switch(this.state.view) {
            case 'overview':
                return <Overview articles={this.state.articles}/>;
            case 'overview.importance':
                return <OverviewImportance/>;
            case 'compare':
                return <Compare articles={this.state.articles}/>;
            case 'compare.raw':
                return <CompareRaw articles={this.state.articles}/>;
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
    };

    navigation = () => {
        document.addEventListener('wordproof.modal.navigate.overview', () => this.changeView('overview'));
        document.addEventListener('wordproof.modal.navigate.overview.importance', () => this.changeView('overview.importance'));
        document.addEventListener('wordproof.modal.navigate.compare', () => this.changeView('compare'));
        document.addEventListener('wordproof.modal.navigate.compare.raw', () => this.changeView('compare.raw'));
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
          fetch(wordproof.automate.api + wordproof.modal.uid + '?site_id=' + wordproof.automate.options.site_id).then((response) => {
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

                    <div className="modal-container h-modal overflow-x-hidden overflow-y-auto bg-white w-11/12 md:max-w-4xl mx-auto rounded-lg rounded-bl-none shadow z-50 overflow-y-auto"
                         aria-modal={this.state.active} role={'modal'} aria-labelledby={''} aria-describedby={''}>

                        {this.renderView()}

                    </div>
                </div>
                <link rel="stylesheet" type="text/css" href={wordproof.modal.css}/>
            </root.div>
        )
    }
}

export default Modal;
