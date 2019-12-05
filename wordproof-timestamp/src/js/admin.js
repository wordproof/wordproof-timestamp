import React from 'react'
import ReactDOM from 'react-dom'
import './components/Admin.scss';

import DashboardWidget from './components/Widgets/Dashboard'
import PostWidget from './components/Widgets/Post'
import TimestampButton from "./components/Extras/TimestampButton";

/**
 * Settings
 */

if (document.querySelectorAll('#wordproof-dashboard-widget')) {
  document.querySelectorAll('#wordproof-dashboard-widget').forEach((element) => {
    ReactDOM.render(<DashboardWidget/>, element);
  })
}

if (document.querySelectorAll('#wordproof-post-widget')) {
  document.querySelectorAll('#wordproof-post-widget').forEach((element) => {
    ReactDOM.render(<PostWidget/>, element);
  })
}

/**
 *
 */
if (document.querySelectorAll('.wordproof-timestamp-button')) {
  document.querySelectorAll('.wordproof-timestamp-button').forEach((element) => {
    ReactDOM.render(<TimestampButton automate={element.dataset.automate} post={JSON.parse(decodeURIComponent(element.dataset.post))} meta={JSON.parse(decodeURIComponent(element.dataset.meta))}/>, element);
  })
}

document.addEventListener('DOMContentLoaded', function () {
  initAutoStamper();
});

function initAutoStamper() {
  let submit = document.querySelector('.wordproof-auto-stamp-submit');
  if (submit) {
    submit.addEventListener('click', startAutoStamper);
  }
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
