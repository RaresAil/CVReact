import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadingComp extends Component {
  render () {
    return (
      <div className={`loadingPage ${this.props.isActive || false ? 'active' : 'false'}`}>
        <div className="spinner"></div>
      </div>
    );
  }
}

LoadingComp.propTypes = {
  isActive: PropTypes.bool
};

export default LoadingComp;
