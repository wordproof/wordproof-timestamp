import React, {Component} from 'react'
import Template from "./Partials/Template";

export default class Upgrade extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <Template current={'upgrade'}>
          <h3>Upgrade</h3>
        </Template>
    )
  }
}
