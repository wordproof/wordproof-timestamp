import React, {Component} from 'react'
import Intro from '../Intro';
import TextField from "../../Form/TextField";

export default class Step4 extends Component {

    save() {
        this.props.nextStep();
    }

    render() {
        return (
            <div className="wordproof-wizard-step">
                <Intro title="Certificate Link"
                       subtitle="The link which opens the Blockchain Certificate pop-up is visable under all timestamped content."/>

                <p>You can change the link text, position or hide the certificate altogether at any time in WordProof
                    -&gt; Settings.</p>

                <TextField slug={'certificate_text'} question={'Link Text'} update={this.props.update}
                           get={this.props.get} initial={this.props.initial}/>

                <video className={`block mb-2`} preload={'metadata'} controls={false} autoPlay={true} loop={true} width={'500'}>
                    <source src={wordproof.urls.images + '/wordproof-certificate-text.mp4'} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>

                <button className={'wbtn wbtn-primary'} onClick={() => this.save()}>Save & Continue</button>
            </div>
        );
    }
}
