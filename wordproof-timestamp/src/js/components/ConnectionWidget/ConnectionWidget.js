import React, {Component} from 'react';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      messageStrong: null
    }
  }

  getText() {
    switch(this.props.status) {
      case 'success': {
        const balance = (this.props.balance === null) ? '' : ' (' + this.props.balance + ')';
        return {message: 'Connected to account', messageStrong: this.props.accountName + balance};
      }
      case 'failed':
        return {message: 'Failed to connect.', messageStrong: 'Please open Scatter.'};
      case 'connecting':
        return {message: 'Connecting...', messageStrong: ''};
      default:
        return {message: '', messageStrong: ''};
    }
  }

  render() {
    return (
      <div className="widget" data-wordproof-connection-status={this.props.status}>
        <div className="widget__connection" aria-hidden="true">
        <span className="widget__logo widget__logo--scatter"
        ><svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#191E22" fill="none" fillRule="evenodd">
              <path
                d="M1 16.5C1 25.059 7.938 32 16.5 32 25.062 32 32 25.059 32 16.5 32 7.941 25.062 1 16.5 1 7.938 1 1 7.941 1 16.5z"
              />
              <path
                d="M16.25 26c-.516 0-.947-.058-1.28-.17-.336-.115-.602-.242-.789-.379-.224-.163-.323-.284-.367-.358a1.5 1.5 0 0 1-.086-.157c.004-.11.032-.23.082-.36.06-.154.135-.298.223-.429a1.66 1.66 0 0 1 .281-.323.384.384 0 0 1 .13-.083c0 .005.018.025.04.07l.02.042.161.162c.085.086.198.17.343.256.14.083.312.158.513.224.21.069.455.104.73.104.607 0 1.113-.193 1.505-.574.395-.384.595-.904.595-1.548a2.32 2.32 0 0 0-.313-1.199 3.96 3.96 0 0 0-.773-.927 9.224 9.224 0 0 0-1.049-.8c-.38-.252-.768-.514-1.164-.787-.389-.267-.775-.56-1.149-.87-.36-.299-.686-.648-.967-1.037a5.181 5.181 0 0 1-.68-1.319c-.17-.484-.256-1.05-.256-1.68 0-.54.093-1.091.277-1.64a6.995 6.995 0 0 1 .775-1.595c.33-.506.725-.987 1.174-1.427.448-.44.94-.83 1.463-1.155a7.494 7.494 0 0 1 1.634-.766A5.413 5.413 0 0 1 19.007 7c.47 0 .896.075 1.267.224.366.146.679.354.928.617.251.266.449.59.587.966.14.381.211.816.211 1.292 0 .452-.08.902-.237 1.339a5.894 5.894 0 0 1-.642 1.271 7.926 7.926 0 0 1-1.953 2.01 5.378 5.378 0 0 1-1.02.58c-.31.13-.581.196-.805.196a.908.908 0 0 1-.473-.122 1.309 1.309 0 0 1-.377-.326 1.692 1.692 0 0 1-.244-.428 1.143 1.143 0 0 1-.08-.316l.026.007c.105.026.227.04.36.04.404 0 .85-.138 1.322-.41a6.05 6.05 0 0 0 1.28-.995 6.19 6.19 0 0 0 1.006-1.332c.281-.503.424-1.004.424-1.488 0-.513-.132-.93-.392-1.238-.271-.322-.713-.486-1.315-.486-.35 0-.732.067-1.136.2-.394.13-.795.313-1.191.544a7.222 7.222 0 0 0-1.15.841c-.37.33-.702.697-.984 1.094-.284.399-.516.835-.69 1.297-.176.471-.265.97-.265 1.48 0 .545.1 1.04.299 1.474a4.4 4.4 0 0 0 .775 1.16c.31.336.669.651 1.065.936.38.273.775.548 1.175.819.393.266.783.544 1.157.825.364.274.693.58.979.908.28.323.507.686.677 1.08.166.385.25.836.25 1.342 0 .488-.094.958-.276 1.395-.184.438-.44.824-.759 1.146-.32.323-.705.584-1.143.773A3.533 3.533 0 0 1 16.25 26"
                fill="#191E22"
                fillRule="nonzero"
              />
            </g></svg
        ></span>
          <span className="widget__icon"
          ><svg
            viewBox="0 0 120 30"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <circle cx="15" cy="15" r="15">
              <animate
                attributeName="r"
                from="15"
                to="15"
                begin="0s"
                dur="0.8s"
                values="15;9;15"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fillOpacity"
                from="1"
                to="1"
                begin="0s"
                dur="0.8s"
                values="1;.5;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="60" cy="15" r="9" fillOpacity=".3">
              <animate
                attributeName="r"
                from="9"
                to="9"
                begin="0s"
                dur="0.8s"
                values="9;15;9"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fillOpacity"
                from=".5"
                to=".5"
                begin="0s"
                dur="0.8s"
                values=".5;1;.5"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="105" cy="15" r="15">
              <animate
                attributeName="r"
                from="15"
                to="15"
                begin="0s"
                dur="0.8s"
                values="15;9;15"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fillOpacity"
                from="1"
                to="1"
                begin="0s"
                dur="0.8s"
                values="1;.5;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle></svg
          ></span>
          <div className="widget__logo widget__logo--wordproof">
            <svg viewBox="0 0 348 273" xmlns="http://www.w3.org/2000/svg">
              <g fill="#191E22" fillRule="nonzero">
                <path
                  d="M347.4 0l-66.7 272.3h-67.1l-39.4-141.6h53.7l18.8 64L288.4 0z"
                />
                <path
                  opacity=".8"
                  d="M155.3 0l-54 194.7L59.7 0H.7l66.7 272.3h66.7L207.6 0z"
                />
              </g>
            </svg>
          </div>
        </div>
        <span className="widget__status">{this.getText().message} <strong>{this.getText().messageStrong}</strong></span>
      </div>
    );
  }
}
