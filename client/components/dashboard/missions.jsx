import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import MissionQuery from '../../queries/open_missions'

class MissionList extends Component {
  constructor(){
    super()
  }

  render(){
    const missions = this.props
    console.log('<MissionQuery>',missions)
    return(
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Component
          </p>
        </header>
        <div className="card-content">
          <div className="content">
          </div>
        </div>
        <footer className="card-footer">
          <a className="card-footer-item">Deline</a>
          <a className="card-footer-item">Accept</a>
        </footer>
      </div>
    )
  }
}

export default graphql(MissionQuery)(MissionList)
