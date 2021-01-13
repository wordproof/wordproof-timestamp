import React from 'react';
import ReactDOM from 'react-dom';

import Modal from "./components/Certficate/Modal/Modal";
import Link from "./components/Certficate/Link/Link";

document.addEventListener('DOMContentLoaded', function () {
  const schema = document.querySelector('script.wordproof-schema');

  if (schema) {
    initModal();
    initLink();

    document.dispatchEvent(new Event('WordProofContentLoaded'));
  }
});

function initModal() {
  ReactDOM.render(
      <Modal/>,
      document.querySelector('#wordproof-certificate-modal'));
}

function initLink() {
  if (wordproof.link.dom)
    addLinkContainer(wordproof.link.dom);

  ReactDOM.render(
      <Link text={wordproof.link.text} url={wordproof.link.url} postId={wordproof.link.postId} infoLink={wordproof.link.infoLink}/>,
      document.querySelector('#wordproof-certificate-link'));
}

function addLinkContainer(parentQuery) {
  let parent = document.querySelector(parentQuery);
  let div = document.createElement('div');
  div.setAttribute('id', 'wordproof-certificate-link');
  parent.appendChild(div);
}
