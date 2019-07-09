import React, {Component, Fragment} from 'react'
import CertificateModal from './CertificateModal/CertificateModal';
import './Certificate.scss'

export default class Certificate extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    console.log(this.props.schema);
  }

  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <CertificateModal schema={this.props.schema} />
      </Fragment>
    )
  }
}
