import React, { Component } from 'react'

export default class Learn extends Component {
  render() {
    return (
      <div>
        <div className="vo-card">
          <h3>Free EOS.IO Course</h3>
          <p>
            Are you a WordPress developer? Developing with blockchain technology might spark your interest too. <a href='https://eos.io/' rel="noopener noreferrer" target="_blank">EOS.IO</a> is open source blockchain technology.
            With WordProof you can timestamp your WordPress content for free in EOS.IO blockchains.
          </p>
          <p>
            Want to learn how to develop smart contracts and decentralised applications with EOS.IO? WordProof collaborates with Everything EOS and Cypherglass, to offer the course for free for WordPress users.
          </p>

          <iframe width="560" height="315" src="https://www.youtube.com/embed/EUcOY-UpRq0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <p>
            Enter the course TODAY via <a href="https://www.everythingeos.io/eos-course-wordproof" rel="noopener noreferrer" target="_blank">this link</a> to get FREE access as a WordProof user.
          </p>
          <p>
            <strong>There might be a special coupon for WordProof beta testers soon!</strong>
          </p>
        </div>
      </div>
    )
  }
}
