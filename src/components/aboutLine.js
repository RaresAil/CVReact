import React from 'react'

class AboutLine extends React.Component {
  render() {
    return (
      <div id={this.props.id} className="aboutLine">
        <ul>
          <li><span>Sex:</span> Male</li>
          <li><span>Date of birth:</span> 3 Jul 2001</li>
          <li><span>Nationality:</span> Romanian</li>
        </ul>
      </div>
    )
  }
}

export default AboutLine;
