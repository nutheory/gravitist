import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import queryCurrentUser from '../../../queries/currentUser'
import { graphql } from 'react-apollo'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Login from '../../views/misc/login'
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Hamburger from 'material-ui/svg-icons/navigation/menu'
import Close from 'material-ui/svg-icons/navigation/close'
import { StyleSheet, css } from 'aphrodite'
import header from '../styles/header'
import { colors } from '../../../styles/helpers'
import mobileHeader from '../styles/mobileHeader'
import logo from '../../../assets/svg/logo.svg'
import phoneIcon from '../../../assets/svg/phoneIcon.svg'


const FlatButtonWithRouter = withRouter(({ history, href, label, classname}) => (

  <FlatButton
    onTouchTap={() => { history.push(href) }}
    label={label}
    className={classname}
  />
))


class PublicHeader extends Component {
  constructor(){
    super()

    this.state = {
      currentUser: "",
      drawerOpen: false,
      popoverOpen: false
    }

    this.handlePopoverClose = this.handlePopoverClose.bind(this)
    this.handlePopoverToggle = this.handlePopoverToggle.bind(this)
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    // this.QueryCurrentUser = this.QueryCurrentUser.bind(this)
  }

  handleDrawerToggle(){
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  handlePopoverToggle(evt){
    evt.preventDefault()
    this.setState({
      anchorEl: evt.currentTarget,
      popoverOpen: !this.state.popoverOpen
    })
  }

  handlePopoverClose(){
    this.setState({
      popoverOpen: false
    })
  }

  // async QueryCurrentUser(){
  //   const res = await this.props.data.user
  //   console.log('trytrffruy',res)
  //   return res
  // }
  //
  // componentDidMount() {
  //   const res = await this.QueryCurrentUser()
  //   console.log('ressssss',res)
  // }

  componentDidUpdate(){
    console.log('booooooo',this.props.data)
  }

  componentWillUnmount() {
  }

  render(){
    // console.log(this.props.data)
    let width = window.innerWidth
    if (width > 960){
      return(
        <header id="AppHeader" className={css(header.container)}>
          <div className={css(header.logo)}>
            <NavLink to="/"><img src={`/${logo}`} className={css(header.logoImg)} /></NavLink>
          </div>
          <div className={css(header.navigation)}>
            <NavLink className={css(header.navItem)} to="/pricing">PRICING</NavLink>
            <NavLink className={css(header.navItem)} to="/how-it-works">HOW IT WORKS</NavLink>
            <NavLink className={css(header.navItem)} to="/pilots">JOBS FOR PILOTS</NavLink>
          </div>
          <div className={css(header.callInfo)}>
            <div className={css(header.callInfoInner)}>
              <div className={css(header.callNumber)}>
                <img src={`/${phoneIcon}`} alt="Phone Icon" className={css(header.phoneIcon)} /> 800 555 6767</div>
              <div className={css(header.callText)}>Toll Free Number</div>
            </div>
          </div>
          <div className={css(header.pilotSignup)}>
            <FlatButtonWithRouter
              href="/pilots/signup"
              label="SIGNUP TO FLY"
              classname={css(header.pilotSignupButton)}
            />
          </div>
          <div className={css(header.login)}>
            <FlatButton
              onTouchTap={this.handlePopoverToggle}
              label="LOGIN"
              className={css(header.loginButton)}
              rippleColor="#fff"
            />
            <Popover
              open={this.state.popoverOpen}
              onRequestClose={this.handlePopoverClose}
              anchorEl={this.state.anchorEl}
              animation={PopoverAnimationVertical}
            >
                <Login />
            </Popover>
          </div>
        </header>
      )
    } else {
      return(
        <div className={css(mobileHeader.container)}>
          <div className={css(mobileHeader.title)}>
            <NavLink to="/"><img src={`/${logo}`} className={css(mobileHeader.logoImg)} /></NavLink>
          </div>
          <div className={css(mobileHeader.menu)}>
            <IconButton
              onTouchTap={this.handleDrawerToggle}
            >
              <Hamburger />
            </IconButton>
          </div>
          <Drawer
            width={320}
            docked={false}
            openSecondary={true}
            open={this.state.drawerOpen}
            onRequestChange={open => this.setState({open})}
          >
            <div className={css(mobileHeader.drawer)}>
              <div className={css(mobileHeader.actions)}>
                <IconButton
                  onTouchTap={this.handleDrawerToggle}
                >
                  <Close />
                </IconButton>
              </div>
              <Divider />
              <div className={css(mobileHeader.mainLinks)}>
                <MenuItem>PRICING</MenuItem>
                <MenuItem><NavLink to="/how-it-works">HOW IT WORKS</NavLink></MenuItem>
                <MenuItem onTouchTap={this.handleDrawerToggle}><NavLink to="/pilots">JOBS FOR PILOTS</NavLink></MenuItem>
                <MenuItem>SIGNUP TO FLY</MenuItem>
              </div>
              <Divider />
              <div className={css(mobileHeader.loginLinks)}>
                <MenuItem >CUSTOMER LOGIN</MenuItem>
                <MenuItem>PILOT LOGIN</MenuItem>
              </div>
              <div className={css(mobileHeader.callInfo)}>
                <div className={css(mobileHeader.callInfoInner)}>
                  <div className={css(mobileHeader.callNumber)}>
                    <img src={`/${phoneIcon}`} alt="Phone Icon" className={css(header.phoneIcon)} />
                    <a href="tel:800 555 6767" className={css(mobileHeader.callLink)}>800 555 6767</a>
                  </div>
                  <div className={css(header.callText)}>Toll Free Number</div>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      )
    }
  }
}

export default graphql(queryCurrentUser)(PublicHeader)
