import React, {Component} from 'react'
import Intro from '../Intro';
import Checkbox from "../../Form/Checkbox";

export default class Step2 extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  validate() {
    this.props.jumpToStep(2);
  }

  render() {
    return (
      <div className="wordproof-wizard-step container">
        <Intro title="Content Settings"
               subtitle="You can always change these settings later."/>

        <Checkbox slug={'allowed-post-types'} question={'Which post types do you want to timestamp automatically?'}
                  options={['post', 'page', 'product']} />

        <button className={'primary'} onClick={this.validate}>Save & Continue</button>
      </div>
    );
  }
}
