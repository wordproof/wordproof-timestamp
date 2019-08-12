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
    this.getContent(this.props.data.content);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getContent(this.props.data.content);
    }
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
                        onClick={() => this.props.changeView('raw')}>{ wproofStrings.switchRaw }</button>
              : <button className="button button-raw is-light is-small"
                        onClick={() => this.props.changeView('article')}>{ wproofStrings.switchArticle }</button>
            }

            {(() => {
              switch (this.props.view) {
                case 'article':
                  return (
                    <div>
                      <h3>{data.title}</h3>
                      <p>{this.state.currentContent}</p>

                      {(this.state.showReadMore)
                        ? <p><span className="read-more" onClick={this.readMore}>{ wproofStrings.readMore }</span></p>
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
                      <h3>{ wproofStrings.aboutTitle }</h3>
                      <p dangerouslySetInnerHTML={{__html: wproofStrings.aboutText + ' ' + data.hash + '.'}}></p>
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
                 target="_blank" rel="noopener noreferrer nofollow">{ wproofStrings.blockchainLink }</a>

              {this.props.view === 'help'
                ? <a onClick={() => this.props.changeView('article')}>{ wproofStrings.switchAboutReturn }</a>
                : <a onClick={() => this.props.changeView('help')}>{ wproofStrings.switchAbout }</a>
              }

              <a target="_blank" rel="noopener noreferrer nofollow" href="https://wordproof.io/check/">{ wproofStrings.timestampChecker }</a>
            </div>
            <div className="column">
              <ul>
                {(data.date) ? <li><span>{ wproofStrings.dateModification }:</span> {this.getDateInFormat(data.date)}</li> : ''}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}