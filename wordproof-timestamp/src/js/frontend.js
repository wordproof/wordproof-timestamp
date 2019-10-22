import React from 'react';
import ReactDOM from 'react-dom';

import Modal from "./components/Certficate/Modal/Modal";
import Link from "./components/Certficate/Link/Link";

document.addEventListener('DOMContentLoaded', function () {
  const schema = document.querySelector('script.wordproof-schema');

  if (schema) {
    initModal();
    initLink();
  }
});

function initModal() {
  ReactDOM.render(
      <Modal/>,
      document.querySelector('#wordproof-certificate-modal'));
}

function initLink() {
  let parent = (wordproof.automate.dom) ? wordproof.automate.dom : '#wordproof-certificate-link';
  ReactDOM.render(
      <Link text={wordproof.link.text} url={wordproof.link.url} postId={wordproof.link.postId}/>,
      document.querySelector(parent));
}
