import React from 'react'
import ReactDOM from 'react-dom'
import './components/Admin.scss';
import axios from 'axios';
import qs from 'qs';

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
 * Timestamp Button
 */
if (document.querySelectorAll('.wordproof-timestamp-button')) {
  document.querySelectorAll('.wordproof-timestamp-button').forEach((element) => {
    ReactDOM.render(<TimestampButton automate={element.dataset.automate} post={JSON.parse(decodeURIComponent(element.dataset.post))} meta={JSON.parse(decodeURIComponent(element.dataset.meta))}/>, element);
  })
}

document.addEventListener('DOMContentLoaded', checkNotices);

function checkNotices() {
  let notices = document.querySelectorAll('.wordproof-notice .notice-dismiss');
  notices.forEach((notice) => {

    notice.addEventListener('click', function (event) {
        if (event.target.parentNode.dataset.noticeKey) {
          let noticeKey = event.target.parentNode.dataset.noticeKey;
          dismissNotice(noticeKey);
        }
    });
  });
}

function dismissNotice(noticeKey) {
  axios.post(wordproofData.ajaxURL, qs.stringify({
    'action': 'wordproof_dismiss_notice',
    'notice_key': noticeKey,
    'security': wordproofData.ajaxSecurity
  }));
}
