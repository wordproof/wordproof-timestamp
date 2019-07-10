import React, {Component, Fragment} from 'react'
import striptags from 'striptags'
import CertificateModal from './CertificateModal/CertificateModal';
import './Certificate.scss'
import getJSON from "../../lib/WebArticleTimestamp";

export default class Certificate extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.schema.content = this.prepareContent(props.schema.content);
    props.schema.transactionUrl = this.getTransactionUrl(props.schema.blockchain, props.schema.transactionId);
    props.schema.json = getJSON(props.schema);
    console.log(props.schema);
  }

  componentDidMount() {

  }

  getTransactionUrl = (network, transactionId) => {
    switch (network) {
      case 'eos_main':
        return 'https://bloks.io/transaction/' + transactionId;
      case 'eos_jungle':
        return 'https://jungle.bloks.io/transaction/' + transactionId;
      default:
        return 'https://telos.eosx.io/tx/' + transactionId;
    }
  }

  prepareContent = (content) => {
    content = content.replace(/<\/p>/g, 'WORDPROOF_PARAGRAPH_END');
    content = content.replace(/(\r\n|\n|\r)/gm, "");
    content = striptags(content);
    content = content.replace(/WORDPROOF_PARAGRAPH_END/g, '\n\n');
    return content;
  }


  render() {
    return (
      <Fragment>
        <CertificateModal data={this.props.schema} />
      </Fragment>
    )
  }
}
