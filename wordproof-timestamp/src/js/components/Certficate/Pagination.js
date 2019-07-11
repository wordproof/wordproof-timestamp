import {h, render, Component} from 'preact';

export default class Pagination extends Component {

  createPaginationList = () => {
    let listItems = [];
    for (let j = 0; j < this.state.revisionKeys.length; j++) {
      listItems.push(
        <li key={this.state.revisionKeys[j]}>
          <a data-post-id={this.state.revisionKeys[j]} onClick={this.handlePaginationClick}
           className={`pagination-link ${ this.state.currentPostId === this.state.revisionKeys[j] ? 'is-current' : '' }`}> </a>
        </li>
      );
    }
    return listItems
  }

  render() {
    return <>
      <div className="pagination-container">
        <div className="button-container">
          <button className="button button--left" disabled={this.props.previous.date ? '' : 'disabled'}
                  onClick={this.props.previous.function}>
            <span className="arrow">&#x2190;</span>
            <span>Previous<br/><span className="date">{this.props.previous.date}</span></span>
          </button>
        </div>

        <div>
          <ul className="pagination-list">
            {this.createPaginationList}
          </ul>
        </div>

        <div className="button-container">
          <button className="button button--right" disabled={this.state.next.disabled ? `disabled` : ''}
                  onClick={() => this.handleButtonClick(this.state.next.postId)}>
            <span>Next<br/><span className="date">{this.state.next.date}</span></span>
            <span className="arrow">&#x2192;</span>
          </button>
        </div>
      </div>
    </>
  }
}
