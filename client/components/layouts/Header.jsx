import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Login from '../auth/login'
import { StyleSheet, css } from 'aphrodite'
import layoutCss from '../../styles/layout'
import formsCss from '../../styles/forms'
import logo from '../../assets/logo.svg'


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
          iconElementLeft={
            <Link to="/">
              <img src={logo} className={css(layoutCss.logo)} />
            </Link>
          }
          iconElementRight={
            <div>
              <Link to="/login">
                login
              </Link> | 
              <Link to="/signup">
                signup
              </Link>
            </div>
          }>
        </AppBar>
      </div>
    )
  }
}

export default AppHeader
