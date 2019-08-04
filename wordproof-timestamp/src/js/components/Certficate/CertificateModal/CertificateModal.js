import React, {Component} from 'react';
import ShadowDOM from 'react-shadow';

import MockupBrowser from "./MockupBrowser/MockupBrowser";
import Pagination from "./Pagination/Pagination";
// import styles from '../Certificate.scss';

export default class CertificateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'article',
      articles: this.props.articles
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({articles: this.props.articles, i: 'test2'});
    }
  }

  changeView(view) {
    this.setState({view});
  }

  render() {
    return (
      <ShadowDOM include={`${wproof.css}`}>

        <div className="shadowHost">
          <div className={`modal is-family-primary`}>
            <div onClick={this.props.close} className="modal-background wordproof-modal-background"></div>
            <div className="modal-card">
              <section className="modal-card-body">
                <button onClick={this.props.close} className="wordproof-modal-close">&times;</button>
                <h2 className="title has-text-centered">Timestamp Certificate</h2>
                <div className="subtitle-container">
                  <h3 className="subtitle has-text-centered">Protected with </h3>
                  <img src={(wproof.logo) ? wproof.logo : ''} alt="WordProof logo"/>
                </div>
                <MockupBrowser data={this.props.data} changeView={this.changeView.bind(this)} view={this.state.view}/>
              </section>
              <footer className="modal-card-foot">
                {(wproof.wsfy.noRevisions)
                  ? <a style={{textAlign: 'center'}} href="https://wordproof.io" target="_blank"
                       rel="noopener noreferrer nofollow">Protect your content on the blockchain with WordProof
                  Timestamp</a>
                  : <Pagination current={this.props.current} articles={this.state.articles} previous={this.props.previous}
                              next={this.props.next} set={this.props.set}/>
                }
              </footer>
            </div>
          </div>
        </div>
      </ShadowDOM>
    )
  }
}
