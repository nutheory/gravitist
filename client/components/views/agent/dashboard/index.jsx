import React, { Component } from 'react'
import 'bulma'
import Orders from './orders'
import Reorder from './reorder'
import CollaborationArea from './collaborationArea'

class AgentDashboard extends Component{
  constructor(){
    super()
  }

  render(){
    return (
      <div className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-parent">
              <div className="tile is-child">
                <Reorder />
              </div>
              <div className="tile is-parent box hero is-dark is-bold">
                <CollaborationArea />
              </div>
            </div>
            <div className="tile is-4 is-parent">
              <div className="tile is-child box">
                <Orders />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AgentDashboard
