import React, {Component} from 'react';

import striptags from 'striptags'
import CertificateModal from './CertificateModal/CertificateModal';
import getJSON from "../../lib/WebArticleTimestamp";

export default class Certificate extends Component {

  constructor(props) {
    super(props);

    const schema = JSON.parse(document.querySelector('script.wordproof-schema').innerHTML);
    const articles = this.getArticles(schema);

    this.state = {
      currentArticle: 0,
      articles: articles
    };

    //TODO: ATTRIBUTES
  }

  componentDidMount() {
    document.addEventListener('newArticles', (e) => {
      let articles = this.getArticles(e.detail);
      this.setState({articles: articles});
    });
  }

  getArticles(schema) {
    let articles;
    if (schema.revisions) {
      const revisions = schema.revisions;
      delete schema.revisions;
      articles = [schema, ...revisions];
    } else {
      articles = [schema];
    }

    articles.forEach((article, key) => {
      articles[key].json = getJSON(article);
      articles[key].content = this.prepareContent(article.content);
      articles[key].transactionUrl = this.getTransactionUrl(article.blockchain, article.transactionId);
    });

    return articles;
  }

  getTransactionUrl = (network, transactionId) => {
    switch (network) {
      case 'telos_main':
        return 'https://telos.bloks.io/transaction/' + transactionId;
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

  previousArticle = () => {
    this.setState({currentArticle: this.state.currentArticle + 1});
  }

  nextArticle = () => {
    this.setState({currentArticle: this.state.currentArticle - 1});
  }

  setArticle = (article) => {
    this.setState({currentArticle: article});
  }

  render() {
    return (
      <>
        <CertificateModal current={this.state.currentArticle}
                          data={this.state.articles[this.state.currentArticle]} previous={this.previousArticle}
                          next={this.nextArticle} set={this.setArticle} articles={this.state.articles}/>
      </>
    )
  }
}
