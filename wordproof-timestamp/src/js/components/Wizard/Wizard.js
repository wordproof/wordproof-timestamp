import React, {Component} from 'react'
import './Wizard.scss';

class Wizard extends Component {

  constructor(props) {
    super(props);
    console.log('hic');
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="wordproof-onboarding-wizard">
        <div className="container">
          <h1 className="text-lg text-center">Hello</h1>
        </div>
      </div>
    );
  }
}

export default Wizard;
