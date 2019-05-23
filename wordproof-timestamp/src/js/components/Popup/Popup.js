import React, { Component } from 'react'
import './Popup.scss'

export default class Popup extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    console.log('hellomarijn');
  }

  render () {
    return (
        <h2>Hello</h2>
    )
  }
}
