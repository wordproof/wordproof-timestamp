import React from 'react'

export default class Intro extends React.Component {
  render() {
    return (
      <>
        <h2 className={'pb-4 font-semibold'}>{ this.props.title }</h2>
        <h3 className={'pb-4 text-gray-700'}>{ this.props.subtitle }</h3>
        <hr/>
      </>
    )
  }
}