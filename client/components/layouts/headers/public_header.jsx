// @flow
import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import Login from '../../users/login'
import { StyleSheet, css } from 'aphrodite'
import cE from '../../../styles/common_elements'
import hdr from '../styles/public_header'
import { colors } from '../../../styles/helpers'
import mobileHeader from '../styles/mobile_header'
import { scrollSpy } from 'react-scroll'
import { Button, Grid, Segment, Header } from 'semantic-ui-react'

// const FlatButtonWithRouter = withRouter(({ history, href, label, classname}) => (
//   // <Button
//   //   onClick={() => { history.push(href) }}
//   //   className={classname}
//   // >{label}</Button>
// ))
type Props = {

}

type State = {
  bgPinned: boolean
}

class PublicHeader extends Component<Props, State> {

  handleScroll: Function

  constructor(){
    super()

    this.state = {
      bgPinned: false
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(ev: SyntheticEvent<*>) {
    if (window.pageYOffset > 100 && this.state.bgPinned === false ) {
      this.setState({ bgPinned: true })
    }
    if (window.pageYOffset < 100 && this.state.bgPinned === true ) {
      this.setState({ bgPinned: false })
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
    // const res = this.QueryCurrentUser()
    // console.log('ressssss',res)
  }

  // componentDidUpdate(){
  //   console.log('booooooo',this.props.data)
  // }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  render(){
    // const res = this.props.data.user
    // console.log(this.props.data)
    let width = window.innerWidth
    if (width > 960){
      return(
        <div className={css(hdr.absoluteHeader)}>
          <div className={`${css(hdr.bg)} ${this.state.bgPinned === true ? css(hdr.bgPin) : ''}`}></div>
          <header id="AppHeader" className={`${css(hdr.container)} columns`}>
            <div className={`${css(hdr.logoArea)} column is-half`}>
              <div className={css(hdr.logoArea)}>
                <NavLink className={css(hdr.logo)} to="/">HOMEFILMING</NavLink>
              </div>
              <div className={css(hdr.navArea)}>
                <NavLink className={css(hdr.navItem)} to="/pricing">PRICING</NavLink>
                <NavLink className={css(hdr.navItem)} to="/how-it-works">HOW IT WORKS</NavLink>
                <NavLink className={css(hdr.navItem)} to="/pilots">JOBS FOR PILOTS</NavLink>
              </div>
            </div>
            <div className={`${css(hdr.phoneButtonArea)} column is-half`}>
              <div className={css(hdr.buttonArea)}>
                <NavLink className={css(cE.buttonWithOutline)} to="/pilots/register">SIGNUP TO FLY</NavLink>
                <NavLink className={css(cE.buttonWithOutline)} to="/login">LOGIN</NavLink>
              </div>
              <div className={css(hdr.phoneArea)}>
                <div className={css(hdr.callInfo)}>
                  <div className={css(hdr.callNumber)}>800 555 6767</div>
                  <div className={css(hdr.callText)}>Toll Free Number</div>
                </div>
                <div className={css(hdr.phoneIconWrapper)}>
                  <img src={require('../../../assets/svg/phoneIcon.svg')} alt="Phone Icon" className={css(hdr.phoneIcon)} />
                </div>
              </div>
            </div>
            {/* <div className={css(header.pilotSignup)}>
              <Button basic>SIGNUP TO FLY</Button> */}
              {/* <FlatButtonWithRouter
                href="/pilots/register"
                label="SIGNUP TO FLY"
                classname={css(header.pilotSignupButton)}
              /> */}
            {/* </div>
            <div className={css(header.login)}> */}
              {/* <Button
                onClick={this.handlePopoverToggle}
                className={css(header.loginButton)}
              >LOGIN</Button>
              <Popover
                open={this.state.popoverOpen}
                onRequestClose={this.handlePopoverClose}
                anchorEl={this.state.anchorEl}
                animation={PopoverAnimationVertical}
              >
                  <Login />
              </Popover> */}
            {/* </div> */}
          </header>
        </div>
      )
    } else {
      return(
        <div className={css(mobileHeader.container)}>
          <div className={css(mobileHeader.title)}>
            <NavLink to="/"><img src={require('../../../assets/svg/logo.svg')} className={css(mobileHeader.logoImg)} /></NavLink>
          </div>
          <div className={css(mobileHeader.menu)}>
            {/* <IconButton
              onClick={this.handleDrawerToggle}
            >
              <Hamburger />
            </IconButton> */}
          </div>
          {/* <Drawer
            width={320}
            docked={false}
            openSecondary={true}
            open={this.state.drawerOpen}
            onRequestChange={open => this.setState({open})}
          > */}
            <div className={css(mobileHeader.drawer)}>
              <div className={css(mobileHeader.actions)}>
                {/* <IconButton
                  onClick={this.handleDrawerToggle}
                >
                  <Close />
                </IconButton> */}
              </div>
              {/* <Divider /> */}
              <div className={css(mobileHeader.mainLinks)}>
                {/* <MenuItem>PRICING</MenuItem>
                <MenuItem><NavLink to="/how-it-works">HOW IT WORKS</NavLink></MenuItem>
                <MenuItem onClick={this.handleDrawerToggle}><NavLink to="/pilots/register">JOBS FOR PILOTS</NavLink></MenuItem>
                <MenuItem>SIGNUP TO FLY</MenuItem> */}
              </div>
              {/* <Divider /> */}
              <div className={css(mobileHeader.loginLinks)}>
                {/* <MenuItem >CUSTOMER LOGIN</MenuItem>
                <MenuItem>PILOT LOGIN</MenuItem> */}
              </div>
              <div className={css(mobileHeader.callInfo)}>
                <div className={css(mobileHeader.callInfoInner)}>
                  <div className={css(mobileHeader.callNumber)}>
                    <img src={'../../../assets/svg/phoneIcon.svg'} alt="Phone Icon" className={css(hdr.phoneIcon)} />
                    <a href="tel:800 555 6767" className={css(mobileHeader.callLink)}>800 555 6767</a>
                  </div>
                  <div className={css(hdr.callText)}>Toll Free Number</div>
                </div>
              </div>
            </div>
          {/* </Drawer> */}
        </div>
      )
    }
  }
}

export default PublicHeader
