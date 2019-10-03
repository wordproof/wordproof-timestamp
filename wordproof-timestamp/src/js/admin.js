import React from 'react'
import ReactDOM from 'react-dom'

import Metabox from './components/Metabox/Metabox'
import Dashboard from "./components/Settings/Dashboard";
import General from "./components/Settings/General";
import Manual from "./components/Settings/Manual";
import Automatic from "./components/Settings/Automatic";
import Support from "./components/Settings/Support";

if (document.querySelector('#wordproof-admin-app-dashboard')) {
  ReactDOM.render(<Dashboard/>, document.querySelector('#wordproof-admin-app-dashboard'));
}

if (document.querySelector('#wordproof-admin-app-general')) {
  ReactDOM.render(<General/>, document.querySelector('#wordproof-admin-app-general'));
}

if (document.querySelector('#wordproof-admin-app-manual')) {
  ReactDOM.render(<Manual/>, document.querySelector('#wordproof-admin-app-manual'));
}

if (document.querySelector('#wordproof-admin-app-automatic')) {
  ReactDOM.render(<Automatic/>, document.querySelector('#wordproof-admin-app-automatic'));
}

if (document.querySelector('#wordproof-admin-app-support')) {
  ReactDOM.render(<Support/>, document.querySelector('#wordproof-admin-app-support'));
}

if (document.querySelector('#wordproof-meta-box-inside')) {
  ReactDOM.render(<Metabox/>, document.querySelector('#wordproof-meta-box-inside'));
}

document.addEventListener('DOMContentLoaded', function () {
  initPostsButtons();
  initAutoStamper();
});

function initPostsButtons() {
  let buttons = document.querySelectorAll('.wordproof-wsfy-save-post');

  buttons.forEach(function (button) {
    button.addEventListener('click', postColumnSave);
  });
}

function initAutoStamper() {
  let submit = document.querySelector('.wordproof-auto-stamp-submit');
  if (submit) {
    submit.addEventListener('click', startAutoStamper);
  }
}

async function postColumnSave(ev) {
  ev.preventDefault();
  var postId = ev.target.dataset.postId;
  var response = await savePost(postId);
  console.log(response);

  if (typeof response === 'string') {
    response = JSON.parse(response);
  }

  if (response.errors) {

    ev.target.style.display = 'none';
    document.querySelector('.wordproof-wsfy-message-' + postId).innerHTML = 'Something went wrong. ' + JSON.stringify(response.errors);

  } else if (response.success) {

    ev.target.style.display = 'none';
    document.querySelector('.wordproof-wsfy-message-' + postId).innerHTML = '👍 Post sent to My WordProof';

  } else if (response.message) {

    ev.target.style.display = 'none';
    document.querySelector('.wordproof-wsfy-message-' + postId).innerHTML = 'Something went wrong. ' + JSON.stringify(response.message);

  }
}

function savePost(postId) {
  return new Promise(function (resolve, reject) {

  console.log('Saving ' + postId);

  const Http = new XMLHttpRequest();
  Http.open('POST', wordproofData.ajaxURL, true);
  Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  Http.send('action=wordproof_wsfy_save_post&post_id=' + postId + '&security=' + wordproofData.ajaxSecurity);

  Http.onreadystatechange = function () {
    if (Http.readyState === 4 && Http.status === 200) {
      resolve(JSON.parse(Http.responseText));
    } else if (Http.readyState === 4) {
      reject(JSON.parse(Http.responseText));
    }
  }
});
}

async function autoStampSave(postId) {
  console.log('Saving post ' + postId);
  var response = await savePost(postId);
  console.log(response);
  if (response.errors) {
    document.querySelector('.wordproof-wsfy-message-' + postId).innerHTML = 'Something went wrong. ' + JSON.stringify(response.errors);
  } else if (response.success) {
    document.querySelector('.wordproof-wsfy-message-' + postId).innerHTML = '✅ Post sent to My WordProof';
  } else if (response.message) {
    document.querySelector('.wordproof-wsfy-message-' + postId).innerHTML = 'Something went wrong. ' + JSON.stringify(response.message);
  }
}

function startAutoStamper(e) {
  e.preventDefault();
  e.target.style.display = 'none';
  console.log('Start');
  let statusList = document.querySelector('.wordproof-status-list');
  let status = document.querySelector('.wordproof-status');
  let statusLeft = document.querySelector('.wordproof-status-left');
  status.innerHTML = '<img style="width: 30px; height: 30px;" src="' + wordproofAutoStamp.loading + '" />';

  const posts = wordproofAutoStamp.posts;
  let postsTotal = posts.length;
  let postsLeft = posts.length;

  let index = 0;
  let interval = setInterval(function () {
    const postId = posts[index].ID;
    const postTitle = posts[index].post_title;

    let item = document.createElement('li');
    item.innerHTML = 'Saving <strong>' + postTitle + ' (' + postId+ ')  </strong>' +
      '<span class="wordproof-wsfy-message-' + postId + '"></span>' +
      '</li>';
    statusList.appendChild(item);

    statusLeft.innerHTML = postsLeft-- + '/' + postsTotal + ' posts left';
    autoStampSave(postId);

    index++;
    if (index === posts.length) {
      status.innerHTML = '🙌 All done!';
      statusLeft.innerHTML = '';
      clearInterval(interval);
    }
  }, 2000)
}
