import React, {Component} from 'react';
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

  componentDidMount() {
    this.setState({currentContent: this.shrinkContent(this.props.data.content)});
  }

  shrinkContent(content) {
    if (content.length > 500) {
      return content = content.substring(0, 500) + '...';
    }

    this.setState({showReadMore: false});
    return content;
  }

  readMore = () => {
    this.setState({
      showReadMore: false,
      currentContent: this.props.data.content
    });
  }

  /**
   * TODO: Should get WP date format
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
                    <>
                      <h3>{data.title}</h3>
                      <p>{this.state.currentContent}</p>
                      {(this.state.showReadMore) ?
                        <p><span className="read-more" onClick={this.readMore}>Read More</span></p> : ''}
                    </>
                  );
                case 'raw':
                  //Get Raw
                  return (
                    <>
                      <textarea className="textarea" rows="13" readOnly value={JSON.stringify(data.json)}>
                      </textarea>
                    </>
                  )
                default:
                  //get Info
                  return (
                    <>
                      <h3>What is this Timestamp Certificate?</h3>
                      <p>This content is protected with WordProof, a new web standard for a more trustworthy internet.
                        This timestamp exists of a unique hash (summary) based on the title, date and content of this
                        page. It is stored in the blockchain and can never be altered.</p>
                      <p>You can verify this Timestamp Certificate yourself with
                        the <a target="_blank" rel="noopener noreferrer" href="https://wordproof.io/check/">WordProof
                          Timestamp Checker</a>.
                        The hash of this post is {data.hash}.
                      </p>
                    </>

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