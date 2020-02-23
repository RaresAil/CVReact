import React from 'react';
import PropTypes from 'prop-types';
import { faPhoneAlt, faLocationArrow, faAt, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';

import HeaderInfoLine from './headerInfoLine';

class Header extends React.Component {
  constructor (props) {
    super(props);

    if (!props.headerData) {
      return;
    }

    const contact = props.headerData.contact;
    this.info = [
      {
        icon: faPhoneAlt,
        text: contact.phone
      },
      {
        icon: faAt,
        text: contact.email
      },
      {
        icon: faGlobeEurope,
        text: contact.website
      },
      {
        icon: faLocationArrow,
        text: contact.location
      }
    ];
  }

  render () {
    if (!this.props.headerData) {
      return <React.Fragment></React.Fragment>;
    }
    return (
      <div className="header">
        <div className="row">
          <div className="column">
            <h1>{this.props.headerData.name}</h1>
            <h2>{this.props.headerData.specialization}</h2>
          </div>
          <div className="column">
            <ul>
              {this.info.map((data, i) => {
                return (
                  <HeaderInfoLine key={i} icon={data.icon} text={data.text} />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  headerData: PropTypes.object
};

export default Header;
