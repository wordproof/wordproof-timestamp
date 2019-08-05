import React, {Component} from 'react'
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import './Admin.scss';

import Dashboard from './Tabs/Dashboard/Dashboard';
import Setup from './Tabs/Setup/Setup';
import Customize from './Tabs/Customize/Customize';
import Timestamp from './Tabs/Timestamp/Timestamp';
import Automate from './Tabs/Automate/Automate';
import Support from './Tabs/Support/Support';
import Learn from './Tabs/Learn/Learn';

class Admin extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      hash: '',
      content: ''
    }
  }

  componentDidMount() {
    const {cookies} = this.props;
    window.addEventListener("hashchange", () => {
      this.setState({hash: window.location.hash});
      this.setCookie('admin_hash', window.location.hash);
    }, false)
    this.setState({hash: window.location.hash});

    let cookie = cookies.get('admin_hash');
    if (cookie !== undefined) {
      this.setState({hash: cookie});
    }
  }

  setCookie = (key, value) => {
    const {cookies} = this.props;
    cookies.set(key, value, {path: '/', maxAge: 3600})
  }

  isActive = (tab) => {
    return this.state.hash === tab
  }

  activeTab = (...tabs) => {
    if (tabs.includes(this.state.hash)) {
      return 'nav-tab-active'
    } else {
      return ''
    }
  }

  nextStep = () => {
    switch (this.state.hash) {
      case '#setup':
        return this.setCookie('admin_hash', '#timestamp');
      case '#timestamp':
        return this.setCookie('admin_hash', '#customize');
      default:
        return this.setCookie('admin_hash', '#dashboard');
    }
  }

  tabContent = (hash) => {
    switch (hash) {
      case '#setup':
        return <Setup setCookie={this.setCookie} nextStep={this.nextStep} />;
      case '#timestamp':
        return <Timestamp nextStep={this.nextStep} />;
      case '#customize':
        return <Customize/>;
      case '#automate':
        return <Automate/>;
      case '#support':
        return <Support/>;
      case '#learn':
        return <Learn/>;
      default:
        return <Dashboard/>
    }
  }

  render() {
    return (
      <div className='wordproof-admin-app'>
        <h2 className="nav-tab-wrapper">
          <a href="#dashboard" className={`nav-tab ${this.activeTab('', '#dashboard')}`}>Dashboard</a>
          <a href="#setup" className={`nav-tab ${this.activeTab('#setup')}`}>1. Setup</a>
          <a href="#timestamp" className={`nav-tab ${this.activeTab('#timestamp')}`}>2. Timestamp & WORD</a>
          <a href="#customize" className={`nav-tab ${this.activeTab('#customize')}`}>3. Customize</a>
          <a href="#automate" className={`nav-tab ${this.activeTab('#automate')}`}>Automate</a>
          <a href="#support" className={`nav-tab ${this.activeTab('#support')}`}>Support</a>
          <a href="#learn" className={`nav-tab ${this.activeTab('#learn')}`}>Learn</a>
        </h2>
        <div className="tab-content">
          {this.tabContent(this.state.hash)}
        </div>
      </div>
    )
  }
}

export default withCookies(Admin);
