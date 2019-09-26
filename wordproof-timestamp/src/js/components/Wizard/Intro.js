import React from 'react'

export default class Intro extends React.Component {
  render() {
    return (
      <>
        <h2 className={'pb-2 font-semibold'}>{ this.props.title }</h2>
        <h3 className={'text-gray-600 text-base font-normal'}>{ this.props.subtitle }</h3>
        <hr/>
      </>
    )
  }
}