import React, {Component, Fragment} from 'react'
import CertificateModal from './CertificateModal/CertificateModal';
import './Certificate.scss'
import getJSON from "../../lib/WebArticleTimestamp";

export default class Certificate extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.schema.content = this.renderContent(props.schema.content);
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

  renderContent = (content) => {
    if (content.length > 500) {
      return content.substring(0, 500) + '...';
    }
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
