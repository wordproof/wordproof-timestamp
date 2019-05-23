import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup/Popup';

(function() {
  if (document.querySelector('#wordproof-popup-container')) {
    ReactDOM.render(<Popup/>, document.querySelector('#wordproof-popup-container'));
  }
})();