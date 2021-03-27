import PropTypes from 'prop-types';
import React, { Component } from 'react';

class LoadingComp extends Component {
  render() {
    const isActive = this.props?.isActive || false ? 'active' : 'false';
    return (
      <div className={['loadingPage', isActive].join(' ')}>
        <div className="spinner"></div>
      </div>
    );
  }
}

LoadingComp.propTypes = {
  isActive: PropTypes.bool
};

export default LoadingComp;
