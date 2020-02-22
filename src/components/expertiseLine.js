import React, { Component } from 'react'

export class ExpertiseLine extends Component {
  render() {
    return (
      <div id={this.props.id} className="expertiseLine">
        {this.props.data.map((line, i) => {
          return <div key={i} className="item">
            <div>{line.title}</div>
            <div className="slider">
              <span style={{ width: `${line.percent}%` }}></span>
            </div>
          </div>
        })}
      </div>
    )
  }
}

export default ExpertiseLine
