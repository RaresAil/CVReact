import React from 'react';
import PropTypes from 'prop-types';
import './style/page.css';

import Header from '../header';
import PageBodyLine from '../pageBodyLine';

class Page extends React.Component {
  constructor (props) {
    super(props);
    const dataToLoad = props.dataToLoad;
    const body = dataToLoad.body;

    this.state = {
      bodyLoad: body || []
    };
  }

  componentDidMount () {
    if (!this.state.bodyLoad || this.state.bodyLoad.length <= 0) {
      return;
    }

    const parent = this.props.componentRef.current;
    if (!parent) {
      return;
    }

    const paretnStyle = window.getComputedStyle(parent);
    const paddings = {
      top: parseInt(paretnStyle.getPropertyValue('padding-top')),
      bottom: parseInt(paretnStyle.getPropertyValue('padding-bottom'))
    };

    const heightForContent = parent.clientHeight - (paddings.top + paddings.bottom);
    const childs = parent.childNodes;

    const dataForNextPage = [];
    const dataForThisPage = [];
    let usedHeight = 0;
    let goForNextPage = false;

    childs.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        return;
      }

      const id = parseInt(child.id);

      const ch = parseInt(child.clientHeight);
      const childHeight = Number.isNaN(ch) ? 0 : ch;
      const childSytle = window.getComputedStyle(child);

      const margins = {
        top: parseInt(childSytle.getPropertyValue('margin-top')),
        bottom: parseInt(childSytle.getPropertyValue('margin-bottom'))
      };
      const marginsValue = margins.top + margins.bottom;

      if (usedHeight + marginsValue + childHeight + 5 > heightForContent) {
        goForNextPage = true;
      }

      if (goForNextPage) {
        if (!Number.isNaN(id)) {
          dataForNextPage.push(this.state.bodyLoad[id]);
        }
      } else {
        usedHeight += childHeight + marginsValue;

        if (!Number.isNaN(id)) {
          dataForThisPage.push(this.state.bodyLoad[id]);
        }
      }
    });

    let lastType = '';
    const lastItem = dataForThisPage[dataForThisPage.length - 1];
    if (lastItem) {
      lastType = lastItem.type || '';
    }

    if (dataForNextPage.length > 0) {
      this.props.onNextPageSetup(dataForNextPage, lastType);
    }

    this.setState({
      bodyLoad: dataForThisPage
    });
  }

  render () {
    return (
      <div className="page" ref={this.props.componentRef}>
        <Header headerData={this.props.hasHeader ? this.props.dataToLoad : null}/>
        {this.state.bodyLoad.map((line, i) => {
          return <PageBodyLine updateLastType={this.updateLastType} initType={this.props.lastType} hasHeader={this.props.hasHeader} id={i} key={i} line={line} />;
        })}
      </div>
    );
  }
}

Page.propTypes = {
  dataToLoad: PropTypes.object,
  onNextPageSetup: PropTypes.func,
  componentRef: PropTypes.object,
  hasHeader: PropTypes.bool,
  lastType: PropTypes.string
};

export default Page;
