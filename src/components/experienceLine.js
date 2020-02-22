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
              return <li key={i}>{infoLine}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ExperienceLine
