import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class MissionCard extends Component {
  constructor(){
    super()
  }

  render(){
    const mission = this.props.mission
    const address = this.props.mission.address
    return (
      <div className="column is-4">
        <div className="card">
          {/* <header className="card-header">
            <p className="card-header-title">

            </p>
          </header> */}
          <div className="card-content">
            <div className="content">
              {parseInt(mission.distanceFromLocation).toPrecision(3)}
              {mission.plan}
              {address.address1}
              {address.address2}
              {address.city}
              {address.state}
              {address.zipCode}
            </div>
          </div>
          <footer className="card-footer">
            <a className="card-footer-item">View</a>
            <a className="card-footer-item">Accept</a>
          </footer>
        </div>
      </div>
    )
  }

}

export default MissionCard
