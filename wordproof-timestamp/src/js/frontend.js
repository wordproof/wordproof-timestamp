import {h, render} from 'preact';
import fetch from 'unfetch'

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
  editExistingSchema: false,
  renderCertificate: true,
  certificateLocation: '#wordproof-certificate',
  wordproofApi: 'https://wsfy.wordproof.io/api/',
  fetchArticlesEndpoint: 'articles'
};

debug();

const schema = document.querySelector('script.wordproof-schema');
const certificateLink = document.querySelector('.wordproof-certificate-link');

setSettings(schema, certificateLink);

if (schema && certificateLink) {
  if (!wproof.noRevisions) {
    certificateLink.addEventListener('click', fetchArticles);
  }
} else {
  fetchArticles();
}

function fetchArticles() {
  fetch(settings.wordproofApi + 'site/' + wproof.siteId + '/' + settings.fetchArticlesEndpoint + '/' + wproof.uid).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then((schema) => {

    if (typeof schema === 'object' && !(schema instanceof Array)) {
      if (settings.editExistingSchema) {
        const script = document.querySelector('script.wordproof-schema');
        script.innerHTML = JSON.stringify(schema);
      } else {
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(schema);
        head.appendChild(script);
      }

      if (settings.renderCertificate) {
        let articles;
        if (schema.revisions) {
          const revisions = schema.revisions;
          delete schema.revisions;
          articles = [schema, ...revisions];
        } else {
          articles = [schema];
        }

        render(<Certificate articles={articles}/>, document.querySelector(settings.certificateLocation));
      }
    }
  });
}

function setSettings(schema, certificateLink) {
  if (wproof.noRevisions) {
    settings.fetchArticlesEndpoint = 'article';
  }

  if (wproof.certificateDOMParent) {
    settings.certificateLocation = wproof.certificateDOMParent;
  }

  if (schema && certificateLink) {
    settings.renderCertificate = false;
    settings.editExistingSchema = true;
  }

  if (wproof.debug) {
    if (wproof.wordproofApi) {
      settings.wordproofApi = wproof.wordproofApi;
    }

    console.log(settings);
  }
}

function debug() {
  if (wproof.debug === true) {
    parameters.forEach((parameter) => {
      console.log(parameter + ' => ' + wproof[parameter]);
    });
  }
}