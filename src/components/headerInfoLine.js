import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class HeaderInfoLine extends Component {
  constructor(props) {
    super(props);
    this.icon = React.createRef();
  }

  componentDidMount() {
    const icon = this.icon.current.getElementsByTagName('svg')[0];
    const iconRect = icon.viewBox.baseVal;
    icon.setAttribute('width', iconRect.width);
    icon.setAttribute('height', iconRect.height);
  }

  render() {
    return (
      <React.Fragment>
        <li ref={this.icon} className="row" style={{ justifyContent: 'left' }}>
          <FontAwesomeIcon className="icon" icon={this.props.icon} />
          <span>{this.props.text}</span>
        </li>
      </React.Fragment>
    );
  }
}

HeaderInfoLine.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string
};

export default HeaderInfoLine;
