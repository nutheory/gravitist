import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import 'bulma/css/bulma.css'
import { css } from 'aphrodite'
import Orders from './orders'
import Reorder from './reorder'
import CollaborationArea from './collaborationArea'
import styles from './styles/dashboard'


class AgentDashboard extends Component{
  constructor(){
    super()
  }

  render(){
    return (
      <div className={`section ${css(styles.paddingTopBottom)}`}>
        <p className={`is-success ${css(styles.infoAlert)}`}>Welcome, {this.props.user.name}</p>
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-parent">
            {/* <div className="tile is-child">
              <Reorder />
            </div> */}
            <div className="tile is-parent box hero is-dark is-bold">
              <Route path="/dashboard/:orderId?" component={CollaborationArea} />
            </div>
          </div>
          <div className="tile is-3 is-parent">
            <div className="tile is-child">
              <Orders />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AgentDashboard
