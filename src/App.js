import React from 'react';
import ReactDOM from 'react-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import './App/App.css';
import cvDataFile from './data/cv_data.json';
import Page from './components/page/page';

import LoadingComp from './components/loadingComp';

const knownKeys = {
  'p': 80,
  'command': 91,
  'escape': 27
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.keysList = { }
    this.pdf = null;
    this.inGeneration = false;
    this.state = {
      pages: [{
        ref: React.createRef(),
        dataToLoad: cvDataFile,
        lastType: ""
      }],
      isLoaderActive: true
    };
  }
  resetKeys = (keys) => {
    keys.forEach(key => {
      this.keysList[knownKeys[key]] = false
    });
  }
  _onKeyHandle = async (e, isDown) => {
    this.keysList[e.keyCode] = knownKeys['escape'] === e.keyCode ? true : isDown
    if (this.keysList[knownKeys['escape']]) {
      Object.keys(this.keysList).forEach(key => {
        this.keysList[key] = false;
      });
      return;
    }
    if (this.keysList[knownKeys['p']] && this.keysList[knownKeys['command']]) {
      e.preventDefault();
      this.resetKeys([ 'p', 'command' ]);
      if (this.inGeneration) {
        return;
      }
      this.inGeneration = true;
      window.scrollTo(0, 0);
      this.setLoader(true);
      if (!this.pdf) {
        let doc = new jsPDF('p', 'px', 'a2');
        for (let i = 0; i < this.state.pages.length; i++) {
          window.scrollTo(0, 0);
          let page = ReactDOM.findDOMNode(this.state.pages[i].ref.current);
          await html2canvas(page).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            if (i > 0) {
              doc.addPage();
            }
            doc.addImage(imgData, 'PNG', 0, 0);
          });
        }
        this.pdf = doc;
        doc.save('cv.pdf');
      } else {
        this.pdf.save('cv.pdf');
      }
      this.setLoader(false);
      this.inGeneration = false;
    }
  }
  setLoader = (value) => {
    this.setState({
      isLoaderActive: value
    });
  }
  componentDidMount() {
    document.addEventListener("keydown", (e) => this._onKeyHandle(e, true));
    document.addEventListener("keyup", (e) => this._onKeyHandle(e, false));
    this.setState({
      isLoaderActive: false
    });
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", (e) => this._onKeyHandle(e, true));
    document.removeEventListener("keyup", (e) => this._onKeyHandle(e, false));
  }
  onNextPageSetup = (dataForNextPage, lastType) => {
    const pages = this.state.pages;
    let dataToLoad = cvDataFile;
    dataToLoad.body = dataForNextPage;
    pages.push({
      ref: React.createRef(),
      dataToLoad: dataToLoad,
      lastType: lastType
    });
    this.setState({
      pages: pages
    });
  };
  render() {
    return (
      <div className="app">
        {this.state.pages.map((data, i) => {
          return <Page 
            key={i} 
            id={i} 
            ref={data.ref} 
            onNextPageSetup={this.onNextPageSetup} 
            hasHeader={i === 0} 
            dataToLoad={data.dataToLoad}
            lastType={data.lastType} />;
        })}
        <LoadingComp isActive={this.state.isLoaderActive} />
      </div>
    );
  }
}

export default App;
