import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Delimiter from './delimiter';
import AboutLine from './aboutLine';
import ExpertiseLine from './expertiseLine';
import ExperienceLine from './experienceLine';

let oldType = '';

class PageBodyLine extends Component {
  constructor(props) {
    super(props);

    if (props.id === 0) {
      oldType = props.initType;
    }

    this.line = props.line;
    let del = <Delimiter />;

    if (!props.hasHeader && props.id === 0) {
      del = '';
    }

    this.prefix = (
      <React.Fragment>
        {del}
        <div className="lineTitle">{this.line.title}</div>
      </React.Fragment>
    );

    if (oldType === this.line.type) {
      this.prefix = '';
    }

    oldType = this.line.type;
  }

  render() {
    switch (this.line.type) {
      case 'about':
        return (
          <React.Fragment>
            {this.prefix}
            <AboutLine id={this.props.id} data={this.line.data} />
          </React.Fragment>
        );
      case 'experience':
        return (
          <React.Fragment>
            {this.prefix}
            <ExperienceLine id={this.props.id} data={this.line.data} />
          </React.Fragment>
        );
      case 'education':
        return (
          <React.Fragment>
            {this.prefix}
            <ExperienceLine id={this.props.id} data={this.line.data} />
          </React.Fragment>
        );
      case 'expertise':
        return (
          <React.Fragment>
            {this.prefix}
            <ExpertiseLine id={this.props.id} data={this.line.data} />
          </React.Fragment>
        );
      case 'projects':
        return (
          <React.Fragment>
            {this.prefix}
            <ExperienceLine id={this.props.id} data={this.line.data} />
          </React.Fragment>
        );
      default:
        return <React.Fragment></React.Fragment>;
    }
  }
}

PageBodyLine.propTypes = {
  updateLastType: PropTypes.func,
  id: PropTypes.number,
  line: PropTypes.object,
  initType: PropTypes.string,
  hasHeader: PropTypes.bool
};

export default PageBodyLine;
