import React, {Component} from 'react'
import Template from "./Partials/Template";

export default class Bulk extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <Template current={'bulk'}>
          <h3>Bulk</h3>
        </Template>
    )
  }
}
