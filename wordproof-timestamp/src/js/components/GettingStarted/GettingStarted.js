import React, {Component} from 'react'
import './GettingStarted.scss';

class GettingStarted extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    openWizard() {
        window.location.href = wordproof.wizardUrl;
    }

    render() {
        return (
            <div className="wordproof-getting-started container bg-white rounded p-4 mt-6">

                <img className="wordproof-logo border-none mx-auto block relative w-32"
                     src={`${wordproof.imagesUri}/wordproof-icon-large.png`}/>

                <h1 className="text-lg text-center">Welcome to WordProof Timestamp!</h1>
                <p className="text-lg text-center">WordProof makes it easy to timestamp content on the blockchain. You
                    are about to protect your copyright and increase the trust your visitor has in your website.</p>

                <p className="text-lg text-center pt-4">Launch the setup wizard to get started!</p>

                <div className="flex justify-center mt-6">
                    <button onClick={this.openWizard}
                            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold text-lg py-4 px-6 mr-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Launch Setup Wizard
                    </button>
                    <a href={'http://wordproof.io/guide'}
                       className="bg-white hover:bg-gray-100 text-gray-800 font-semibold text-lg py-4 px-6 border-b-4 border-gray-400 rounded">
                        Read the Full Guide
                    </a>
                </div>
            </div>
        )
    }
}

export default GettingStarted;
