import {h, render, Component} from 'preact';
import {DateTime} from "luxon";

export default class MockupBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextView: null,
      showReadMore: true,
      currentContent: ''
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.getContent(nextProps.data.content);
  }

  getContent(content) {
    if (this.state.showReadMore === true && content.length > 500) {
      this.setState({
        currentContent: content.substring(0, 500) + '...',
        showReadMore: true
      });
    } else {
      this.setState({
        currentContent: content,
        showReadMore: false
      });
    }
  }

  readMore = () => {
    this.setState({
      showReadMore: false,
      currentContent: this.props.data.content
    });
  }

  /**
   * TODO: Should get custom date format
   * @param iso
   * @returns {string}
   */
  getDateInFormat(iso) {
    return DateTime.fromISO(iso).toLocaleString(DateTime.DATETIME_SHORT);
  }

  render() {
    const data = this.props.data;
    return (
      <section className="mockup-browser" data-url={(data.url) ? data.url : ''}>
        <div className="mockup-browser-content content">
          <div className="mockup-browser-content-inner">

            {this.props.view === 'article'
              ? <button className="button button-raw is-light is-small"
                        onClick={() => this.props.changeView('raw')}>Raw</button>
              : <button className="button button-raw is-light is-small"
                        onClick={() => this.props.changeView('article')}>Article</button>
            }

            {(() => {
              switch (this.props.view) {
                case 'article':
                  return (
                    <div>
                      <h3>{data.title}</h3>
                      <p>{this.state.currentContent}</p>

                      {(this.state.showReadMore)
                        ? <p><span className="read-more" onClick={this.readMore}>Read More</span></p>
                        : ''}
                    </div>
                  );
                case 'raw':
                  //Get Raw
                  return (
                    <div>
                      <textarea className="textarea" rows="13" readOnly value={JSON.stringify(data.json)}>
                      </textarea>
                    </div>
                  )
                default:
                  //get Info
                  return (
                    <div>
                      <h3>What is this Timestamp Certificate?</h3>
                      <p>This content is protected with WordProof, a new web standard for a more trustworthy internet.
                        This timestamp exists of a unique hash (summary) based on the title, date and content of this
                        page. It is stored in the blockchain and can never be altered.</p>
                      <p>You can verify this Timestamp Certificate yourself with
                        the <a target="_blank" rel="noopener noreferrer" href="https://wordproof.io/check/">WordProof
                          Timestamp Checker</a>.
                        The hash of this post is {data.hash}.
                      </p>
                    </div>

                  )
              }
            })()}
          </div>
        </div>
        <div className="mockup-browser-footer">
          <div className="columns">
            <div className="column">
              <a href={data.transactionUrl}
                 target="_blank" rel="noopener noreferrer nofollow">View on the blockchain</a>

              {this.props.view === 'help'
                ? <a onClick={() => this.props.changeView('article')}>Back to Timestamp Certificate</a>
                : <a onClick={() => this.props.changeView('help')}>About this Timestamp Certificate</a>
              }

              <a target="_blank" rel="noopener noreferrer nofollow" href="https://wordproof.io/check/">Timestamp
                Checker</a>
            </div>
            <div className="column">
              <ul>
                {(data.date) ? <li><span>Modification Date:</span> {this.getDateInFormat(data.date)}</li> : ''}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}