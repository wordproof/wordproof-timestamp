import React, {Component} from 'react';
import {DateTime} from 'luxon';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previous: {
        disabled: true,
        date: null,
      },
      next: {
        disabled: true,
        date: null,
      }
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.handleButtons(this.props.current);
    }
  }

  previous = () => {
    this.handleButtons(this.props.current + 1);
    this.props.previous();
  }

  next = () => {
    this.handleButtons(this.props.current - 1);
    this.props.next();
  }

  click = (e) => {
    const key = parseInt(e.target.getAttribute('data-key'));
    this.handleButtons(key);
    this.props.set(key);
  }

  handleButtons = (current) => {
    if (current === 0) {
      if (this.props.articles.length === 1) {
        this.setState({
          previous: {
            disabled: true,
            date: null
          }, next: {
            disabled: true,
            date: null
          }
        });
      } else {
        this.setState({
          previous: {
            disabled: false,
            date: this.props.articles[current + 1].date
          }, next: {
            disabled: true,
            date: null
          }
        })
      }
    } else if (current >= this.props.articles.length - 1) {
      this.setState({
        previous: {
          disabled: true,
          date: null
        }, next: {
          disabled: false,
          date: this.props.articles[current - 1].date
        }
      });
    } else {
      this.setState({
        previous: {
          disabled: false,
          date: this.props.articles[current + 1].date
        }, next: {
          disabled: false,
          date: this.props.articles[current - 1].date
        }
      });
    }
  }

  render() {
    return (
      <div className="pagination-container">
        <div className="button-container">
          <button className="button button--left" disabled={this.state.previous.disabled}
                  onClick={this.previous}>
            <span className="arrow">&#x2190;</span>
            <span>{ wproofStrings.buttonPrevious }<br/><span className="date">{(this.state.previous.date)
              ? DateTime.fromISO(this.state.previous.date).toLocaleString(DateTime.DATE_SHORT)
              : ''}</span></span>
          </button>
        </div>

        <div>
          <ul className="pagination-list">
            {this.props.articles.map((article, key) => {
              return (
                <li key={key}>
                  <a data-key={key} onClick={this.click}
                     className={`pagination-link ${ this.props.current === key ? 'is-current' : '' }`}> </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="button-container">
          <button className="button button--right" disabled={this.state.next.disabled}
                  onClick={this.next}>
            <span>{ wproofStrings.buttonNext }<br/><span className="date">{(this.state.next.date)
              ? DateTime.fromISO(this.state.next.date).toLocaleString(DateTime.DATE_SHORT)
              : ''}
              </span></span>
            <span className="arrow">&#x2192;</span>
          </button>
        </div>
      </div>
    )
  }
}
