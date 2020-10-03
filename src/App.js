import React from 'react';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import './App/App.css';
import getCVData from './data/cvData';

import Page from './components/page/page';
import LoadingComp from './components/loadingComp';

const cvDataFile = getCVData();

const knownKeys = {
  p: 80,
  command: 91,
  escape: 27,
  control: 17
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.keysList = {};
    this.pdf = null;
    this.inGeneration = false;
    this.appRef = React.createRef();

    this.state = {
      pages: [
        {
          ref: React.createRef(),
          dataToLoad: cvDataFile,
          lastType: ''
        }
      ],
      isLoaderActive: true
    };
  }

  resetKeys = (keys) => {
    keys.forEach((key) => {
      this.keysList[knownKeys[key]] = false;
    });
  };

  _onKeyHandle = async (e, isDown) => {
    this.keysList[e.keyCode] = knownKeys.escape === e.keyCode ? true : isDown;

    if (this.keysList[knownKeys.escape]) {
      Object.keys(this.keysList).forEach((key) => {
        this.keysList[key] = false;
      });
      return;
    }

    if (
      this.keysList[knownKeys.p] &&
      (this.keysList[knownKeys.command] || this.keysList[knownKeys.control])
    ) {
      e.preventDefault();
      this.resetKeys(['p', 'command']);

      if (this.inGeneration) {
        return;
      }

      this.inGeneration = true;
      const appElement = this.appRef.current;
      window.scrollTo(0, 0);
      this.setLoader(true);

      if (!this.pdf) {
        const doc = new JsPDF('p', 'px', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        appElement.classList.add('print-mode');

        for (let i = 0; i < this.state.pages.length; i++) {
          window.scrollTo(0, 0);
          const page = this.state.pages[i].ref.current;

          await html2canvas(page, {
            useCORS: true,
            allowTaint: false,
            logging: false
          }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 1);

            if (i > 0) {
              doc.addPage();
            }

            doc.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
          });
        }

        appElement.classList.remove('print-mode');

        this.pdf = doc;
        doc.save('cv.pdf');
      } else {
        this.pdf.save('cv.pdf');
      }

      this.setLoader(false);
      this.inGeneration = false;
    }
  };

  setLoader = (value) => {
    this.setState({
      isLoaderActive: value
    });
  };

  componentDidMount() {
    document.addEventListener('keydown', (e) => this._onKeyHandle(e, true));
    document.addEventListener('keyup', (e) => this._onKeyHandle(e, false));

    this.setLoader(false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => this._onKeyHandle(e, true));
    document.removeEventListener('keyup', (e) => this._onKeyHandle(e, false));
  }

  onNextPageSetup = (dataForNextPage, lastType) => {
    const pages = this.state.pages;
    const dataToLoad = cvDataFile;
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
      <div className="app" ref={this.appRef}>
        {this.state.pages.map((data, i) => {
          return (
            <Page
              key={i}
              id={i}
              componentRef={this.state.pages[i].ref}
              onNextPageSetup={this.onNextPageSetup}
              hasHeader={i === 0}
              dataToLoad={data.dataToLoad}
              lastType={data.lastType}
            />
          );
        })}
        <LoadingComp isActive={this.state.isLoaderActive} />
      </div>
    );
  }
}

export default App;
