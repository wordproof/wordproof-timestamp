import React from 'react';
import ReactDOM from 'react-dom';

import Certificate from './components/Certficate/Certificate';

const parameters = [
  'debug',
  'siteId',
  'uid',
  'certificateDOMParent',
  'certificateText',
  'noRevisions',
  'logo',
  'icon',
  'wordproofApi',
];

let settings = {
  wordproofApi: 'https://wsfy.wordproof.io/api/',
  fetchArticlesEndpoint: 'articles'
};

document.addEventListener('DOMContentLoaded', function () {
  const schema = document.querySelector('script.wordproof-schema');
  const certificateLink = document.querySelector('.wordproof-certificate-link');

  setSettings();

  if (schema && certificateLink) {
    if (!wproof.noRevisions) {
      certificateLink.addEventListener('click', fetchArticles);
    }
    ReactDOM.render(<Certificate settings={wproof}/>, document.querySelector('#wordproof-certificate-container'));
  }
});

function fetchArticles() {
  console.log('hello');
  fetch(settings.wordproofApi + 'site/' + wproof.siteId + '/' + settings.fetchArticlesEndpoint + '/' + wproof.uid).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then((schema) => {
    if (typeof schema === 'object' && !(schema instanceof Array)) {
      const script = document.querySelector('script.wordproof-schema');
      script.innerHTML = JSON.stringify(schema);
      console.log(script);
    }
  });
}

function setSettings() {
  // debug();

  if (wproof.noRevisions) {
    settings.fetchArticlesEndpoint = 'article';
  }

  if (wproof.debug) {
    if (wproof.wordproofApi) {
      settings.wordproofApi = wproof.wordproofApi;
    }

    console.log(settings);
  }
}

function debug() {
  if (wproof.debug) {
    parameters.forEach((parameter) => {
      console.log(parameter + ' => ' + wproof[parameter]);
    });
  }
}