import {h, render, Component} from 'preact';
import striptags from 'striptags'
import CertificateModal from './CertificateModal/CertificateModal';
import getJSON from "../../lib/WebArticleTimestamp";
import wordproofIcon from '../../assets/images/word.svg';

export default class Certificate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      currentArticle: 0
    };

    props.articles.forEach((article, key) => {
      props.articles[key].json = getJSON(article);
      props.articles[key].content = this.prepareContent(article.content);
      props.articles[key].transactionUrl = this.getTransactionUrl(article.blockchain, article.transactionId);
    });
    //TODO: ATTRIBUTES
  }

  componentDidMount() {

  }

  getTransactionUrl = (network, transactionId) => {
    switch (network) {
      case 'telos':
        return 'https://telos.bloks.io/transaction/' + transactionId;
      case 'eos':
        return 'https://bloks.io/transaction/' + transactionId;
      case 'eosJungle':
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
      <div>
        <a onClick={this.openModal} className="wordproof-certificate-link" href="#wordproof" style={`display: flex;align-items: center;`}>
          <img src={(wproof.icon) ? wproof.icon : wordproofIcon} alt="wordproof logo" style="max-width: 40px; padding-right: 10px;"/>
          <span>{(wproof.certificateText) ? wproof.certificateText : 'View this Timestamp Certificate'}</span>
        </a>
        <div>
          <CertificateModal isActive={this.state.isActive} close={this.closeModal} current={this.state.currentArticle}
                            data={this.props.articles[this.state.currentArticle]} previous={this.previousArticle}
                            next={this.nextArticle} set={this.setArticle} articles={this.props.articles}/>
        </div>
      </div>
    )
  }
}
