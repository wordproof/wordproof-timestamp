import React, {Component} from 'react'

export default class Configure extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className="vo-card">
          <h3>You are ready to timestamp your content!</h3>
          <p>Please make sure that your Scatter application is opened. Go to one of your WordPress posts/pages/products and click &apos;Timestamp Post&apos; on the right side of the screen. Watch the video to see how it works:</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/oVRDojYmaFo?start=440" frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
        </div>
      </div>
    )
  }
}
