import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import { graphql } from 'react-apollo'
import query from '../../queries/current_user'
import Login from '../auth/login'
import { StyleSheet, css } from 'aphrodite'
import layoutCss from '../../styles/layout'
import formsCss from '../../styles/forms'
import logo from '../../assets/logo.png'

class AppHeader extends Component {
  constructor(props){
    super(props)

    this.state = {
      open: false,
    }
  }

  handleLogin(event){
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose(){
    this.setState({
      open: false,
    })
  }

  render(){
    return(
      <div>
        <AppBar
          zDepth={3}
          className={css(layoutCss.headerBar)}
          iconStyleLeft={{position: 'fixed', left: '10%', top: '8px', margin:'0'}}
          iconStyleRight={{position: 'fixed', right: '10%', top: '8px', margin:'0'}}
          iconElementLeft={
            <NavLink to="/">
              <img src={logo} className={css(layoutCss.logo)} />
            </NavLink>
          }
          iconElementRight={
            <div>
              <NavLink to="/login">
                Login
              </NavLink> |
              <NavLink to="/pilotSignup">
                Pilot signup
              </NavLink>
            </div>
          }>
        </AppBar>
      </div>
    )
  }
}

export default graphql(query)(AppHeader)
