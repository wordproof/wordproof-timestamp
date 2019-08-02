import React, {Component} from 'react';

import striptags from 'striptags'
import CertificateModal from './CertificateModal/CertificateModal';
import getJSON from "../../lib/WebArticleTimestamp";

export default class Certificate extends Component {

  constructor(props) {
    super(props);

    const articles = this.getArticles();
    articles.forEach((article, key) => {
      // articles[key].json = getJSON(article);
      // articles[key].content = this.prepareContent(article.content);
      // articles[key].transactionUrl = this.getTransactionUrl(article.blockchain, article.transactionId);
    });

    this.state = {
      isActive: false,
      currentArticle: 0,
      articles: articles
    };

    //TODO: ATTRIBUTES
  }

  componentDidMount() {
    console.log(this.state.articles);

  }

  getArticles() {
    let articles;
    const schema = document.querySelector('script.wordproof-schema');
    if (schema.revisions) {
      const revisions = schema.revisions;
      delete schema.revisions;
      articles = [schema, ...revisions];
    } else {
      articles = [schema];
    }
    return articles;
  }

  getTransactionUrl = (network, transactionId) => {
    switch (network) {
      case 'telos':
        return 'https://telos.bloks.io/transaction/' + transactionId;
      case 'eos':
        return 'https://bloks.io/transaction/' + transactionId;
      case 'eos_main':
        return 'https://bloks.io/transaction/' + transactionId;
      case 'eosJungle':
        return 'https://jungle.bloks.io/transaction/' + transactionId;
      case 'eos_jungle':
        return 'https://jungle.bloks.io/transaction/' + transactionId;
      default:
        return transactionId;
    }
  }

  prepareContent = (content) => {
    content = content.replace(/<\/p>/g, 'WORDPROOF_PARAGRAPH_END');
    content = content.replace(/(\r\n|\n|\r)/gm, "");
    content = striptags(content);
    content = content.replace(/WORDPROOF_PARAGRAPH_END/g, '\n\n');
    return content;
  }

  openModal = () => {
    this.setState({isActive: true});
  }

  previousArticle = () => {
    this.setState({currentArticle: this.state.currentArticle + 1});
  }

  nextArticle = () => {
    this.setState({currentArticle: this.state.currentArticle - 1});
  }

  setArticle = (article) => {
    this.setState({currentArticle: article});
  }

  closeModal = () => {
    this.setState({isActive: false});
  }

  render() {
    return (
      <>
        {/*<a onClick={this.openModal} className="wordproof-certificate-link" href="#wordproof" style={`display: flex;align-items: center;`}>*/}
          {/*<img src={(this.props.settings.icon) ? this.props.settings.icon : ''} alt="wordproof logo" style="max-width: 40px; padding-right: 10px;"/>*/}
          {/*<span>{(this.props.settings.certificateText) ? this.props.settings.certificateText : 'View this Timestamp Certificate'}</span>*/}
        {/*</a>*/}
          <CertificateModal isActive={this.state.isActive} close={this.closeModal} current={this.state.currentArticle}
                            data={this.state.articles[this.state.currentArticle]} previous={this.previousArticle}
                            next={this.nextArticle} set={this.setArticle} articles={this.state.articles}/>
      </>
    )
  }
}
