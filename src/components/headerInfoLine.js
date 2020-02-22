import React, { Component } from 'react'
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";

export class HeaderInfoLine extends Component {
  render() {
    return (
      <React.Fragment>
        <li className="row" style={{ justifyContent: 'left' }}>
          <FontAwesomeIcon className="icon" icon={this.props.icon} />
          <span>{this.props.text}</span>
        </li>
      </React.Fragment>
    )
  }
}

export default HeaderInfoLine
