import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup/Popup';

(function() {

  if (document.querySelector('#wordproof-popup-container')) {
    ReactDOM.render(<Popup />, document.querySelector('#wordproof-popup-container'));
  }

  addCertificateLinkEventListener();
  addCloseModalEventListener();

})();

function addCertificateLinkEventListener() {
  document.querySelector('.wordproof-certificate-helper').addEventListener('click', function (event) {
    event.preventDefault();
    getModal().classList.add('is-active');
  }, false);
}

function addCloseModalEventListener() {
  getModal().querySelector('.modal-background').addEventListener('click', function (event) {
    event.preventDefault();
    getModal().classList.remove('is-active');
  }, false);
}

function getModal() {
  return document.querySelector('#wordproof-popup-container .shadowHost').shadowRoot.querySelector('.modal');
}