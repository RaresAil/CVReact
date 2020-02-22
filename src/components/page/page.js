import React from 'react';
import ReactDOM from 'react-dom';
import './style/page.css';

import Header from '../header';
import Delimiter from '../delimiter';
import AboutLine from '../aboutLine';
import ExperienceLine from '../experienceLine';
import ExpertiseLine from '../expertiseLine';

let oldLine = "";

const GetHeader = (props) => {
  return (props.hasHeader ? <Header headerData={props.headerData} /> : <React.Fragment />);
};

const BodyLine = (props) => {
  if (props.id === 0) {
    oldLine = props.initType;
  }
  const line = props.line;
  let del = <Delimiter />;
  if (!props.hasHeader && props.id === 0) {
    del = "";
  }
  let prefix = <React.Fragment>{del}<div className="lineTitle" >{line.title}</div></React.Fragment>;
  if (oldLine === line.type) {
    prefix = "";
  }
  oldLine = line.type;
  switch(line.type) {
    case "about":
      return <React.Fragment>{prefix}<AboutLine id={props.id} data={line.data} /></React.Fragment>
    case "experience":
      return <React.Fragment>{prefix}<ExperienceLine id={props.id} data={line.data} /></React.Fragment>
    case "education":
      return <React.Fragment>{prefix}<ExperienceLine id={props.id} data={line.data} /></React.Fragment>
    case "expertise":
      return <React.Fragment>{prefix}<ExpertiseLine id={props.id} data={line.data} /></React.Fragment>
    default: 
      return <React.Fragment></React.Fragment>
  }
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    const dataToLoad = props.dataToLoad;
    const body = dataToLoad.body;
    this.state = {
      bodyLoad: body || []
    }
  }
  componentDidMount() {
    if(!this.state.bodyLoad || this.state.bodyLoad.length <= 0) {
      return;
    }

    const parent =  ReactDOM.findDOMNode(this);
    const paretnStyle = window.getComputedStyle(parent);
    const paddings = {
      top: parseInt(paretnStyle.getPropertyValue("padding-top")),
      bottom: parseInt(paretnStyle.getPropertyValue("padding-bottom")),
    };
    const heightForContent = parent.clientHeight - (paddings.top + paddings.bottom);
    const childs = parent.childNodes;

    let dataForNextPage = [];
    let dataForThisPage = [];
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
        top: parseInt(childSytle.getPropertyValue("margin-top")),
        bottom: parseInt(childSytle.getPropertyValue("margin-bottom"))
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

    let lastType = "";
    let lastItem = dataForThisPage[dataForThisPage.length - 1];
    if (lastItem) {
      lastType = lastItem.type || ""
    }

    if (dataForNextPage.length > 0) {
      this.props.onNextPageSetup(dataForNextPage, lastType);
    }
    this.setState({
      bodyLoad: dataForThisPage
    });
  }
  render() {
    return (
      <div className="page">
        <GetHeader headerData={this.props.dataToLoad} hasHeader={this.props.hasHeader}/>
        {this.state.bodyLoad.map((line, i) => {
          return <BodyLine initType={this.props.lastType} hasHeader={this.props.hasHeader} id={i} key={i} line={line} />;
        })}
      </div>
    );
  }
}

export default Page;