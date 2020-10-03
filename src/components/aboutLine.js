import React from 'react';
import PropTypes from 'prop-types';

class AboutLine extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div id={this.props.id} className="aboutLine">
        <ul>
          <li>
            <span>Sex:</span> {data.sex}
          </li>
          <li>
            <span>Date of birth:</span> {data.birth}
          </li>
          <li>
            <span>Nationality:</span> {data.nat}
          </li>
        </ul>
      </div>
    );
  }
}

AboutLine.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired
};

export default AboutLine;
