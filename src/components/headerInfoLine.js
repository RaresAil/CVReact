import React, { Component } from 'react';
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";

export class HeaderInfoLine extends Component {
  constructor(props) {
    super(props);
    this.icon = React.createRef();
  }

  componentDidMount() {
    let icon = this.icon.current.getElementsByTagName("svg")[0];
    let iconRect = icon.viewBox.baseVal;
    icon.setAttribute("width", iconRect.width);
    icon.setAttribute("height", iconRect.height);
  }

  render() {
    return (
      <React.Fragment>
        <li ref={this.icon} className="row" style={{ justifyContent: 'left' }}>
          <FontAwesomeIcon className="icon" icon={this.props.icon} />
          <span>{this.props.text}</span>
        </li>
      </React.Fragment>
    )
  }
}

export default HeaderInfoLine
