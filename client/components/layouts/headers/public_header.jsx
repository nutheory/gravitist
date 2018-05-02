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

type Props = {

}

type State = {
  bgPinned: boolean,
  navDrawerActive: boolean
}

class PublicHeader extends Component<Props, State> {

  toggleDrawerState: Function
  handleScroll: Function

  constructor(){
    super()

    this.state = {
      bgPinned: false,
      navDrawerActive: false
    }

    this.toggleDrawerState = this.toggleDrawerState.bind(this)
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
  }

  toggleDrawerState() {
    this.setState({ navDrawerActive: !this.state.navDrawerActive })
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  render(){
    console.log(window.location.pathname)
    return(
      <div className="fixed z-40 w-full px-8 lg:px-20 py-3 public-header">
        <div className={`header-bg ${ this.state.bgPinned ? 'header-bg-pin' : '' }`}></div>
        <header id="AppHeader" className={`flex ${ this.state.bgPinned ? 'header-fg-pin' : '' }`}>
          <div className="flex-1 flex">
            <div className="pr-4 py-1 inline-block">
              <NavLink className="w-48 h-6 block mt-2" to="/">
                { this.state.bgPinned ? <img src={`/${require('../../../assets/images/hf_logo_dark@2x.png')}`} />
                : <img src={`/${require('../../../assets/images/hf_logo_white@2x.png')}`} /> }
              </NavLink>
            </div>
            { window.location.pathname === '/pilots' ? null :
            <div className="hidden md:flex pl-4 border-l border-grey py-3">
              <NavLink className="inline-block px-2" to="/pricing">Pricing</NavLink>
              <NavLink className="inline-block px-2" to="/how-it-works">How it works</NavLink>
              <NavLink className="inline-block px-2" to="/pilots">Jobs for pilots</NavLink>
            </div> }
          </div>
          <div className="flex">
            <div className="flex-1 flex justify-end">
              <div className="flex inline-block">
                <div className="hidden xl:inline-block pt-1 w-8">
                  <svg className="fill-current phone-icon" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><g><path d="M6.5 9c0 3.5 3.06 6.57 3.06 6.57l.87.88S13.5 19.5 17 19.5a3.2 3.2 0 0 0 3.27-2.44 5.13 5.13 0 0 0 .23-1.32.92.92 0 0 0-.59-.81L17.15 14a.56.56 0 0 0-.74.4 9.28 9.28 0 0 1-.34 1c-.29.73-1.7 1.44-4.32-1.19s-1.93-4-1.19-4.32a9 9 0 0 1 1-.34.56.56 0 0 0 .4-.74l-.92-2.76a.92.92 0 0 0-.81-.59 5.09 5.09 0 0 0-1.31.22A3.2 3.2 0 0 0 6.5 9z"/><path d="M0 13A13 13 0 1 0 13 0 13 13 0 0 0 0 13zm25 0A12 12 0 1 1 13 1a12 12 0 0 1 12 12z"/></g></svg>
                </div>
                <div className="hidden xl:inline-block px-4">
                  <div className="text-2xl">800 208 8947</div>
                  <div className="text-xs text-right">Toll Free Number</div>
                </div>
              </div>
            </div>
            <div className="hidden md:inline-block">
              <div className="flex">
                {/* <NavLink className="button" to="/pilots/register">Sign up to fly</NavLink> */}
                <NavLink className="button" to="/login">Login</NavLink>
              </div>
            </div>
            <div className={`block relative md:hidden mt-2 -mr-2 hover:cursor-pointer z-30 ${ this.state.navDrawerActive ? 'main-text' : ''}`} onClick={ this.toggleDrawerState }>
              <svg className="fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 125"><g><path d="M92.028,25h-84c-1.657,0-3-1.343-3-3V8c0-1.657,1.343-3,3-3h84c1.657,0,3,1.343,3,3v14C95.028,23.657,93.685,25,92.028,25z   "/></g><g><path d="M92.028,59.938h-84c-1.657,0-3-1.343-3-3v-14c0-1.657,1.343-3,3-3h84c1.657,0,3,1.343,3,3v14   C95.028,58.594,93.685,59.938,92.028,59.938z"/></g><g><path d="M92.028,94.875h-84c-1.657,0-3-1.343-3-3v-14c0-1.657,1.343-3,3-3h84c1.657,0,3,1.343,3,3v14   C95.028,93.532,93.685,94.875,92.028,94.875z"/></g></svg>
            </div>
          </div>
        </header>
        <nav className={`navDrawer${ this.state.navDrawerActive ? ' navDrawerActive' : '' }`}>
          <div className="mt-16 px-4">
            <h3 className="font-bold text-sm px-4">Navigation</h3>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/how-it-works">How it works</NavLink>
            <NavLink to="/pilots">Jobs for pilots</NavLink>

            <NavLink to="/pilots/register">Sign up to fly</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        </nav>
      </div>
    )
  }
}

export default PublicHeader
