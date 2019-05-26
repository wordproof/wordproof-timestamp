import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup/Popup';

(function() {
  if (document.querySelector('#wordproof-popup-container')) {
    ReactDOM.render(<Popup />, document.querySelector('#wordproof-popup-container'));
  }
  checkUrlForWordproof();
  addCertificateLinkEventListener();
  addCloseModalEventListener();
})();

function addCertificateLinkEventListener() {
  document.querySelector('.wordproof-certificate-helper').addEventListener('click', function () {
    showModal();
  }, false);
}

function addCloseModalEventListener() {
  getModal().querySelector('.modal-background').addEventListener('click', function (event) {
    event.preventDefault();
    hideModal();
  }, false);
}

/*
Show modal if the url contains #wordproof
 */
function checkUrlForWordproof() {
  if(window.location.href.indexOf("#wordproof") > -1) {
    showModal();
  }
}

function getModal() {
  return document.querySelector('#wordproof-popup-container .shadowHost').shadowRoot.querySelector('.modal');
}

function hideModal() {
  getModal().classList.remove('is-active');
}

function showModal() {
  getModal().classList.add('is-active');
}