import React, { Component } from 'react'

export class LoadingComp extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={`loadingPage ${this.props.isActive || false ? 'active' : 'false'}`}>
        <div className="spinner"></div>
      </div>
    )
  }
}

export default LoadingComp
