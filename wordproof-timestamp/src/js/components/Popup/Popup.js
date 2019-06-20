import React, {Component} from 'react'
import ShadowDOM from 'react-shadow';
import './Popup.scss'

export default class Popup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switchStateText: 'Raw',
      state: 'content',
      nextState: 'raw'
    }
  }

  componentDidMount() {
  }

  shortenString = (string) => {
    if (string.length > 500) {
      return string.substring(0, 500) + '...';
    }
    return string;
  }

  changeStateTo = (nextState) => {
    switch (nextState) {
      case 'help':
        this.setState({
          state: 'help',
          nextState: 'content',
          switchStateText: 'Content',
        });
        break;
      case 'content':
        this.setState({
          state: 'content',
          nextState: 'raw',
          switchStateText: 'Raw',
        });
        break;
      default:
        this.setState({
          state: 'raw',
          nextState: 'content',
          switchStateText: 'Content',
        });
        break;
    }
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


  render() {
    return (
      <ShadowDOM include={`${wordproofData.wordProofCssDir}/frontend.css`}>
        <div className="shadowHost">

          <div className="modal is-family-primary">
            <div className="modal-background wordproof-modal-background"></div>
            <div className="modal-card">
              <section className="modal-card-body">
                <button className="wordproof-modal-close">&times;</button>
                <h2 className="title has-text-centered">Timestamp Certificate</h2>
                <div className="subtitle-container">
                  <h3 className="subtitle has-text-centered">Validated by </h3>
                  <img src={`${wordproofData.pluginDirUrl}assets/images/wordproof-logo.png`} alt="WordProof logo"/>
                </div>

                <section className="mockup-browser" data-url={wordproofData.timestampMeta.wordproof_link}>

                  <div className="mockup-browser-content content">
                    <div className="mockup-browser-content-inner">
                      <button className="button button-raw is-light is-small"
                              onClick={() => this.changeStateTo(this.state.nextState)}>{this.state.switchStateText}</button>
                      {this.state.state === 'content' &&
                      <div>
                        <h3>{wordproofData.timestampMeta.wordproof_title}</h3>
                        <p>{this.shortenString(wordproofData.timestampMeta.wordproof_content)}</p>
                      </div>
                      }

                      {this.state.state === 'raw' &&
                      <textarea className="textarea" readOnly
                                rows="10">{wordproofData.timestampMeta.hash_raw}</textarea>
                      }

                      {this.state.state === 'help' &&
                        <div>
                          <h3>What is this Timestamp Certificate?</h3>
                          <p>This content is protected with WordProof, a new web standard for a more trustworthy internet. This timestamp exists of a unique hash (summary) based on the title, date and content of this page. It is stored in the blockchain and can never be altered. You can verify this Timestamp Certificate yourself with the WordProof Timestamp Checker.</p>
                        </div>
                      }
                    </div>
                  </div>

                  <div className="mockup-browser-footer">
                    <div className="columns">
                      <div className="column">
                        <a
                          href={this.getTransactionUrl(wordproofData.timestampMeta.wordproof_network, wordproofData.timestampMeta.wordproof_transaction_id)}
                          target="_blank" rel="noopener noreferrer">View on the blockchain</a>

                        {this.state.state === 'help' ?
                          <a onClick={() => this.changeStateTo('content')}>Back to Timestamp Certificate</a> :
                          <a onClick={() => this.changeStateTo('help')}>About this Timestamp Certificate</a>
                        }

                      </div>
                      <div className="column">
                        <ul>
                          <li><span>Post Date: </span>{wordproofData.timestampMeta.wordproof_post_date}</li>
                          <li><span>Modified Date: </span>{wordproofData.timestampMeta.current_post_modified}</li>
                          <li><span>Proof Date: </span>{wordproofData.timestampMeta.wordproof_date}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

              </section>
              <footer className="modal-card-foot">
                <a href="https://wordproof.io" target="_blank" rel="noopener noreferrer">Protect your content on the
                  blockchain with WordProof Timestamp</a>
              </footer>
            </div>
          </div>

        </div>
      </ShadowDOM>
    )
  }
}
