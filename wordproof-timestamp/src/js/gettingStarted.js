import React from 'react'
import ReactDOM from 'react-dom'
import GettingStarted from "./components/GettingStarted/GettingStarted";

if (document.querySelector('#wordproof-getting-started')) {
  ReactDOM.render(<GettingStarted/>, document.querySelector('#wordproof-getting-started'));
}