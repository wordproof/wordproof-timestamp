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
      <div className="wordproof-getting-started container bg-white rounded p-4 mt-6">

        <img className="wordproof-logo border-none mx-auto relative" src="https://via.placeholder.com/100" />

        <h1 className="text-lg text-center">Welcome to WordProof</h1>
        <p className="text-lg text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.</p>

        <img className="border-none my-8" src="https://via.placeholder.com/150" />

        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Button
        </button>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-b-4 border-gray-400 rounded">
          Button
        </button>

      </div>
    )
  }
}

export default GettingStarted;
