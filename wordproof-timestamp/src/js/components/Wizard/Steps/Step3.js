import React, {Component} from 'react'
import Intro from '../Intro';
import Checkbox from "../../Form/Checkbox";
import Radiobox from "../../Form/Radiobox";

export default class Step3 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wordproof-wizard-step container">
        <Intro title="Content Settings"
               subtitle="You can always change these settings later."/>

        <Checkbox slug={'allowed-post-types'} question={'Which post types do you want to timestamp automatically?'}
                  options={['post', 'page', 'product']}/>

        <Radiobox slug={'show-revisions'} question={'Do you want to show revisions to your visitors?'}
                  options={[{name: 'Yes', value: true},{name: 'No', value: false}]}/>

        <button className={'primary'} onClick={() => this.props.nextStep()}>Save & Continue</button>
      </div>
    );
  }
}
