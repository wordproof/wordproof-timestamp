import React from 'react'
import ReactDOM from 'react-dom'
import Metabox from './components/Metabox/Metabox'
import Admin from './components/Admin';

if (document.querySelector('#wordproof-admin-app')) {
  ReactDOM.render(<Admin/>, document.querySelector('#wordproof-admin-app'));
}

if (document.querySelector('#wordproof-meta-box-inside')) {
  ReactDOM.render(<Metabox />, document.querySelector('#wordproof-meta-box-inside'));
}

document.addEventListener('DOMContentLoaded', function(event) {
  let buttons = document.querySelectorAll('.wordproof-wsfy-save-post');

  buttons.forEach(function(button) {
    button.addEventListener('click', savePost);
  });
});

function savePost(ev) {
  ev.preventDefault();
  var postId = ev.target.dataset.postId;
  console.log('Saving ' + postId);

  const Http = new XMLHttpRequest();
  Http.open('POST', wordproofData.ajaxUrl, true);
  Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  Http.send('action=wordproof_wsfy_save_post&post_id=' + postId + '&security=' + wordproofData.ajaxSecurity);

  Http.onreadystatechange = function () {
    if (Http.readyState == 4 && Http.status == 200) {
      let response = JSON.parse(Http.responseText);

      if (typeof response === 'object') {
        let body = JSON.parse(response.body);
        if (body.hash) {
          ev.target.style.display = 'none';
          document.querySelector('.wsfy-message-' + postId).innerHTML = 'Post is timestamped.';
          console.log(JSON.stringify(body));
        } else {
          ev.target.style.display = 'none';
          document.querySelector('.wordproof-wsfy-message-' + postId).innerHTML = 'Something went wrong. Error message: ' + JSON.stringify(body);
        }
      } else {
        document.querySelector('.wordproof-wsfy-message-' + postId).innerHTML = JSON.stringify(response);
      }
    }
  }
}