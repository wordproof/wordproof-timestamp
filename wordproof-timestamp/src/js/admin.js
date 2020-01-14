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
 * Timestamp Button
 */
if (document.querySelectorAll('.wordproof-timestamp-button')) {
  document.querySelectorAll('.wordproof-timestamp-button').forEach((element) => {
    ReactDOM.render(<TimestampButton automate={element.dataset.automate} post={JSON.parse(decodeURIComponent(element.dataset.post))} meta={JSON.parse(decodeURIComponent(element.dataset.meta))}/>, element);
  })
}
