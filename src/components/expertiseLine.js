import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ExpertiseLine extends Component {
  render() {
    return (
      <div id={this.props.id} className="expertiseLine">
        {this.props.data.map((line, i) => {
          return (
            <div key={i} className="item">
              <div>{line.title}</div>
              <div className="slider">
                <span style={{ width: `${line.percent}%` }}></span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

ExpertiseLine.propTypes = {
  id: PropTypes.number,
  data: PropTypes.array
};

export default ExpertiseLine;
