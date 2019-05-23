import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup/Popup';

(function() {
  console.log('frontend.js');
  console.log(document.querySelector('#wordproof-popup'));

  if (document.querySelector('#wordproof-popup')) {
    ReactDOM.render(<Popup/>, document.querySelector('#wordproof-popup'));
  }
})();