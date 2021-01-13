import React, {Component} from 'react'
import Intro from '../Intro';
import Checkbox from "../../Form/Checkbox";
import Radiobox from "../../Form/Radiobox";

export default class Step3 extends Component {
  render() {
    return (
      <div className="wordproof-wizard-step">
        <Intro title="Content Settings"
               subtitle="You can always change these settings later."/>

        <Checkbox slug={'allowed_post_types'} question={'Which post types do you want to timestamp automatically?'}
                  options={wordproof.registeredPostTypes}
                  update={this.props.update} get={this.props.get} initial={this.props.initial} />

        <Radiobox slug={'show_revisions'} question={'Do you want to show revisions to your visitors?'}
                  options={[{name: 'Yes', value: true},{name: 'No', value: false}]}
                  update={this.props.update} get={this.props.get} initial={this.props.initial} />

        <button className={'wbtn wbtn-primary'} onClick={() => this.props.nextStep()}>Save & Continue</button>
      </div>
    );
  }
}
