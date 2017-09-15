import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { css } from 'aphrodite'
// import 'bulma/css/bulma.css'
import styles from './styles/dashboard'
import MissionList from './mission_list'

class PilotDashboard extends Component {
  render(){
    return (
      <div className={`section ${css(styles.paddingTopBottom)}`}>
        <p className={`is-success ${css(styles.infoAlert)}`}>Welcome, {this.props.user.name}</p>
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-parent">
            <Route path="/missions" component={MissionList} user={this.props.user} />
          </div>
        </div>
      </div>
    )
  }
}

export default PilotDashboard
