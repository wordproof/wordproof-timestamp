import React, {Component} from 'react'
import './GettingStarted.scss';

class GettingStarted extends Component {

  constructor(props) {
    super(props);
    console.log('hi');
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="wordproof-getting-started">
        <h1>Hello</h1>
      </div>
    )
  }
}

export default GettingStarted;
