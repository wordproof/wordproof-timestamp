import React, { Component } from 'react'
import './Admin.scss'
import Dashboard from './Tabs/Dashboard/Dashboard';
import Telos from './Tabs/Telos/Telos';
import Learn from './Tabs/Learn/Learn';
import EOS from './Tabs/EOS/EOS';

export default class Admin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hash: '',
      content: ''
    }
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({hash: window.location.hash})
    }, false)
    this.setState({hash: window.location.hash})
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

  tabContent = (hash) => {
    switch(hash) {
      case '#create-eos-account':
        return <EOS />
      case '#create-telos-account':
        return <Telos />
      case '#learn-blockchain-dev':
        return <Learn />
      default:
        return <Dashboard />
    }
  }

  render () {
    return (
      <div className='wordproof-admin-app'>
        <h2 className="nav-tab-wrapper">
          <a href="#dashboard" className={`nav-tab ${this.activeTab('', '#dashboard')}`}>Dashboard</a>
          <a href="#create-eos-account" className={`nav-tab ${this.activeTab('#create-eos-account')}`}>Create an EOS Account</a>
          <a href="#create-telos-account" className={`nav-tab ${this.activeTab('#create-telos-account')}`}>Create a Telos Account</a>
          <a href="#learn-blockchain-dev" className={`nav-tab ${this.activeTab('#learn-blockchain-dev')}`}>Learn Blockchain Development</a>
        </h2>
        <div className="tab-content">
          { this.tabContent(this.state.hash) }
        </div>
      </div>
    )
  }
}
