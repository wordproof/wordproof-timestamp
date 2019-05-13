import React, { Component } from 'react'

export default class Telos extends Component {
  render() {
    return (
      <div>
        <div className="vo-card">
          <h3>Create a free Telos account</h3>
          <p>Telos is the innovation district of the <a href="http://eos.io/" target="_blank" rel="noopener noreferrer">EOS.IO</a> ecosystem. Create your free Telos account with the form below.  If you want to learn more about the Telos ecosystem, click here for an introduction by Telos founder Douglas Horn. </p>
        </div>

        <a href="https://wordproof.io/generate-telos-account" class="button" target="_blank">Create your own Telos account</a>

		<div className="vo-card">
      <h3>Step 2: Created your account? Time to get a wallet!</h3>
      <p>After downloading your wallet, import your <strong>Private Key (Active)</strong> to import your account. </p>
          <ul className="bullet-list">
            <li><a href="https://get-scatter.com/" target="_blank" rel="noopener noreferrer">Scatter</a></li>
          </ul>
		</div>

        <div className="vo-card">
          <h3>Looking for a way to get your open source project funded?</h3>
          <p>
            Read this article by WordProof&apos;s founder Sebastiaan van der Lans:
      </p>
      <ul className="bullet-list">
        <li><a href="https://medium.com/@delans/inclusive-funding-open-source-software-wordproof-wordpress-blockchain-ab4b2c2385b5" target="_blank" rel="noopener noreferrer">&quot;A Story about the Truly Inclusive Funding of Open Source WordPress Plugin &apos;WordProof&apos;&quot;</a>.</li>
      </ul>

        </div>
      </div>
    )
  }
}
