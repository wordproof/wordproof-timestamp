import React, {Component} from 'react'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        {!this.state.hasAccount ?
          <div className="vo-card vo-columns">
            <div className="vo-col">
              <h3>What is WordProof Timestamp?</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam risus, pulvinar a laoreet in,
                semper at ligula. Vestibulum tempus, purus eu dictum tristique, nisi lectus consectetur mi, non pulvinar
                purus turpis eu libero. Vivamus egestas, tortor at facilisis molestie, nunc nibh convallis erat, feugiat
                viverra mauris est egestas elit. Aenean ac interdum sem, et blandit velit. Etiam velit mi, euismod eget
                volutpat eget, aliquet non turpis.</p>
              <br/>
              <button type="button" className="button button-primary" onClick={this.closePopup}>Go to Step 1: Configure</button>
            </div>
            <div className="vo-col">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/5GUlcfaKsyk" frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen></iframe>
            </div>
          </div> : ''
        }
      </div>
    )
  }
}
