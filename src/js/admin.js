import React from 'react'
import ReactDOM from 'react-dom'
import './components/Admin.scss';
import axios from 'axios';
import qs from 'qs';

import DashboardWidget from './components/Widgets/Dashboard'
import Timestamp from "./components/Timestamp/Timestamp";

window.addEventListener('load', () => {
    init();
});

function init() {
  checkNotices();
  initReact();
}

function initReact() {

  /**
   * Add Dashboard widget
   */
  if (document.querySelectorAll('#wordproof-dashboard-widget')) {
    document.querySelectorAll('#wordproof-dashboard-widget').forEach((element) => {
      ReactDOM.render(<DashboardWidget/>, element);
    })
  }

  /**
   * Add timestamp button to posts overview page
   */
  if (document.querySelectorAll('.wordproof-timestamp-button')) {
    document.querySelectorAll('.wordproof-timestamp-button').forEach((element) => {
      ReactDOM.render(<Timestamp
          automatic={JSON.parse(element.dataset.automate)}
          post={JSON.parse(decodeURIComponent(element.dataset.post))}
          meta={JSON.parse(decodeURIComponent(element.dataset.meta))}
          view={'text'}
      />, element);
    })
  }

  /**
   * Add Timestamp to post widget
   */
  if (document.querySelectorAll('#wordproof-post-widget')) {
    document.querySelectorAll('#wordproof-post-widget').forEach((element) => {
      ReactDOM.render(<Timestamp
          automatic={JSON.parse(element.dataset.automate)}
          view={'widget'}
      />, element);
    })
  }
}

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
