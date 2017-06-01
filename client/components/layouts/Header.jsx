import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Scroll from 'react-scroll'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { graphql } from 'react-apollo'
import { StyleSheet, css } from 'aphrodite'
import header from './styles/header'
import { colors } from '../../styles/helpers'
import mobileHeader from './styles/mobileHeader'
import logo from '../../assets/svg/logo.svg'
import phoneIcon from '../../assets/svg/phoneIcon.svg'
import Hamburger from 'material-ui/svg-icons/navigation/menu'
import Close from 'material-ui/svg-icons/navigation/close'

const sLink = Scroll.Link
const Element = Scroll.Element
const Events = Scroll.Events
const scroll = Scroll.animateScroll
const scrollSpy = Scroll.scrollSpy

class AppHeader extends Component {
  constructor(props){
    super(props)

    this.state = {
      open: false,
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  handleDrawerToggle(){
    this.setState({open: !this.state.open})
  }

  componentDidMount() {

    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments)
    })

    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments)
    })

    scrollSpy.update()

  }

  componentWillUnmount() {
   Events.scrollEvent.remove('begin');
   Events.scrollEvent.remove('end');
  }


  render(){
    let width = window.innerWidth
    if (width > 960){
      return(
        <header id="AppHeader" className={css(header.container)}>
          <div className={css(header.logo)}>
            <NavLink to="/"><img src={`/${logo}`} className={css(header.logoImg)} /></NavLink>
          </div>
          <div className={css(header.navigation)}>
            <sLink spy={true} smooth={true} offset={50} className={css(header.navItem)} to="ePricing">PRICING</sLink>
            <NavLink className={css(header.navItem)} to="/">HOW IT WORKS</NavLink>
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
            <FlatButton
              label="SIGNUP TO FLY"
              className={css(header.pilotSignupButton)}
            />
          </div>
          <div className={css(header.login)}>
            <FlatButton
              label="LOGIN"
              className={css(header.loginButton)}
              rippleColor="#fff"
            />
              <Popover
                animation={PopoverAnimationVertical}
              >
                <Menu>
                  <MenuItem primaryText="Customer Login" />
                  <MenuItem primaryText="Pilot Login" />
                </Menu>
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
            open={this.state.open}
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
                <MenuItem>HOW IT WORKS</MenuItem>
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

export default AppHeader
