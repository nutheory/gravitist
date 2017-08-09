import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { css } from 'aphrodite'
import 'bulma/css/bulma.css'
import styles from './styles/dashboard'
import Missions from './missions'

class PilotDashboard extends Component {
  render(){
    return (
      <div className={`section ${css(styles.paddingTopBottom)}`}>
        <p className={`is-success ${css(styles.infoAlert)}`}>Welcome, {this.props.user.name}</p>
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-parent">
            <Route path="/open-missions" component={Missions} />
          </div>
        </div>
      </div>
    )
  }
}

export default PilotDashboard
