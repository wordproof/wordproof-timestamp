import React from 'react';
import ReactDOM from 'react-dom';
import Certificate from './components/Certficate/Certificate';

(function() {
  let schema = document.querySelector('.wordproof-schema');

  if (schema) {
    schema = JSON.parse(schema.innerHTML);
    if (document.querySelector('#wordproof-certificate-container')) {
      ReactDOM.render(<Certificate schema={schema} />, document.querySelector('#wordproof-certificate-container'));
      checkUrlForWordproof();
      addCertificateLinkEventListener();
      addCloseModalEventListener();
    }
  }
})();

function addCertificateLinkEventListener() {
  document.querySelector('.wordproof-certificate-helper').addEventListener('click', function () {
    showModal();
  }, false);
}

function addCloseModalEventListener() {
  let modal = getModal();
  modal.querySelector('.wordproof-modal-background').addEventListener('click', (e) => handleCloseModalEvent(e), false);
  modal.querySelector('.wordproof-modal-close').addEventListener('click', (e) => handleCloseModalEvent(e), false);
}

function handleCloseModalEvent(event) {
  event.preventDefault();
  hideModal();
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
  return document.querySelector('#wordproof-certificate-container .shadowHost').shadowRoot.querySelector('.modal');
}

function hideModal() {
  getModal().classList.remove('is-active');
}

function showModal() {
  getModal().classList.add('is-active');
}