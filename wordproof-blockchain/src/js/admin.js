import React from 'react'
import ReactDOM from 'react-dom'
// import App from './components/App'
import Metabox from './components/Metabox/Metabox'
import Admin from './components/Admin';

if (document.querySelector('#wordproof-admin-app')) {
  ReactDOM.render(<Admin/>, document.querySelector('#wordproof-admin-app'));
}

if (document.querySelector('#wordproof-meta-box-inside')) {
  ReactDOM.render(<Metabox />, document.querySelector('#wordproof-meta-box-inside'));
}
