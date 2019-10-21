import React from 'react';
import ReactDOM from 'react-dom';

import Modal from "./components/Certficate/Modal/Modal";
import Link from "./components/Certficate/Link/Link";

// let settings = {
//   firstModalClick: true,
//   wordproofApi: wproof.api + wproof.articlesEndpoint,
//   fetchArticlesEndpoint: 'articles'
// };

document.addEventListener('DOMContentLoaded', function () {
  const schema = document.querySelector('script.wordproof-schema');

  if (schema) {
    console.log('rendering');
    renderModal();
    renderLink();
  }
});

function renderModal() {
  ReactDOM.render(
      <Modal/>,
      document.querySelector('#wordproof-certificate-modal'));
}

function renderLink() {
  ReactDOM.render(
      <Link text={wordproof.link.text} url={wordproof.link.url} postId={wordproof.link.postId}/>,
      document.querySelector('#wordproof-certificate-link'));
}

// function fetchArticles() {
//   if (wproof.wsfy.show_revisions) {
//     fetch(settings.wordproofApi + wproof.uid + '?site_id=' + wproof.wsfy.site_id).then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//     }).then((schema) => {
//       if (typeof schema === 'object' && !(schema instanceof Array)) {
//         const script = document.querySelector('script.wordproof-schema');
//         script.innerHTML = JSON.stringify(schema);
//         document.dispatchEvent(new CustomEvent('newArticles', {detail: schema}));
//       }
//     });
//   }
// }
