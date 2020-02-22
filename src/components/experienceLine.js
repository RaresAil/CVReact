import React, { Component } from 'react'

class ExperienceLine extends Component {
  render() {
    const data = this.props.data;

    return (
      <div id={this.props.id} className="experienceLine">
        <div className="ex-years">
          <span>{data.start_year}</span>
          <span>{data.end_year}</span>
        </div>
        <div>
          <div className="ex-title">{data.title}</div>
          <div className="ex-ins">
            <span>{data.institute}</span>
            <span>{data.location}</span>
          </div>
          <ul className="ex-info">
            {data.info.map((infoLine, i) => {

              let link = infoLine.substring(
                infoLine.lastIndexOf("<a>") + 1, 
                infoLine.lastIndexOf("</a>")
              ).replace('a>', "");

              let line = infoLine;
              let n = "";
              let linkA = <React.Fragment></React.Fragment>;

              if (link !== "") {
                line = line.split(`<a>${link}</a>`);
                n = line[1];
                line = line[0];
                linkA = <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>;
              }

              return <li key={i}>{line}{linkA}{n}</li>;
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ExperienceLine
