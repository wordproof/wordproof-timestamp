import React, {Component} from 'react';

export default class MockupBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'article'
    }
  }

  render() {
    const schema = this.props.schema;
    return (
      <section className="mockup-browser" data-url='test'>
        <div className="mockup-browser-content content">
          <div className="mockup-browser-content-inner">
            {/*<button className="button button-raw is-light is-small" onClick={this.props.changeView}>{this.props.changeViewText}</button>*/}
            <h2>{schema.title}</h2>
            <div>{schema.content}</div>
          </div>
        </div>
        <div className="mockup-browser-footer">
          <div className="columns">
            <div className="column">
              ... Links
            </div>
            <div className="column">
              <ul>
                {(schema.date) ? <li><span>Modified Date:</span> {schema.date}</li> : ''}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}