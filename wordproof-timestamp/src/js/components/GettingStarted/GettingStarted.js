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

        <img className="wordproof-logo border-none mx-auto relative w-32" src={`${wordproof.imagesUri}/wordproof-icon-large.png`} />

        <h1 className="text-lg text-center">Welcome to WordProof!</h1>
        <p className="text-lg text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.</p>

        <img className="border-none my-8" src="https://via.placeholder.com/150" />

        <p className="text-lg text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.</p>

        <div className="flex justify-center mt-6">
        <button onClick={this.openWizard} className="bg-blue-500 hover:bg-blue-400 text-white font-semibold text-lg py-4 px-6 mr-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Launch the Wizard!
        </button>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold text-lg py-4 px-6 border-b-4 border-gray-400 rounded">
          Do Something Else
        </button>
        </div>
      </div>
    )
  }
}

export default GettingStarted;
