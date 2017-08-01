import React, { Component, PropTypes } from 'react'
import { css } from 'aphrodite'
import { graphql } from 'react-apollo'
import logo from '../../../assets/svg/logoGreen.svg'
import LiNavLink from '../../misc/li_navlink'
import LogoutUser from '../../../mutations/logout'
import CurrentUserQuery from '../../../queries/current_user'
import styles from '../styles/private_header'
import _ from 'lodash'

const agentLinks = [['tachometer', 'dashboard', 'Dashboard'], ['rocket', 'order', 'New Order'],
  ['address-card-o', 'contact', 'Contact'], ['cog', 'settings', 'Settings']]

const pilotLinks = [['tachometer', 'Dashboard'], ['rocket', 'New Order'],
    ['address-card-o', 'Contact'], ['cog', 'Settings']]

class PrivateHeader extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(){
    super()

    this.renderLinks = this.renderLinks.bind(this)
    this.userTypeLinks = this.userTypeLinks.bind(this)
    // this.logoutHandler = this.logoutHandler.bind(this)
  }

  renderLinks(userType){
    if(userType == "agent"){ return this.userTypeLinks(agentLinks) }
    if(userType == "pilot"){ return this.userTypeLinks(pilotLinks) }
  }

  userTypeLinks(arrLinks){
    const links = arrLinks.map((link, i) =>
      <LiNavLink key={link[1]} activeClassName='is-active' strict to={`/${link[1]}`}>
        <span className={`icon is-small ${css(styles.icon_only)}`}><i className={`fa fa-${link[0]}`} aria-hidden="true"></i></span>
        <span className={`is-hidden-touch ${css(styles.icon_with_text)}`}>{link[2]}</span>
      </LiNavLink>
    )
    return links
  }

  async logoutMutation(){
    const resolved = await this.props.mutate({
      refetchQueries: [{ query: CurrentUserQuery}]
    })
    const { data } = resolved
    console.log('data.log', data)
    // if(!data.login.email){
      this.context.router.history.replace('/')
    // }
  }

  logoutHandler(e){
    e.preventDefault()
    console.log('E', e)
    this.logoutMutation()
  }

  render(){
    console.log('Private', this.props)
    return (
      // <nav className="columns section has-shadow" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
      //   <div className="column is-3">
      //     <a className="nav-item is-pulled-left">
      //       <img src={`/${logo}`} style={{ width: '180px', height: '40px'}} alt="Homefilming logo" />
      //     </a>
      //   </div>
      //   <div className="column tabs is-centered is-toggle is-hidden-touch">
      //     <ul class="is-pulled-right">
      //       { this.renderLinks(this.props.current_user.type) }
      //     </ul>
      //   </div>
      //   <div className="column is-2 nav-menu is-hidden-touch">
      //     <a className="nav-item is-pulled-right">Logout</a>
      //   </div>
      //   <div className="column tabs is-centered is-toggle is-hidden-desktop">
      //     <ul>
      //       { this.renderLinks(this.props.current_user.type) }
            // <LiNavLink activeClassName='is-active' exact={true} strict to={`/logout`}>
            //   <span className={`icon is-small ${css(styles.privateIcons)}`}><i className={`fa fa-sign-out ${css(styles.iconMarginRight)}`} aria-hidden="true"></i></span>
            // </LiNavLink>
      //     </ul>
      //   </div>
      // </nav>

      // MOBILE
      <nav className="block is-block-mobile">
        <a className={`${css(styles.marginTopBottom)} nav-center`}>
          <img src={`/${logo}`} className={`${css(styles.logo)}`} alt="Homefilming logo" />
        </a>
        <div className="tabs block is-toggle is-centered ">
          <ul>
            { this.renderLinks(this.props.data.current_user.type) }
            <li>
              <a href='#' onClick={this.logoutHandler.bind(this)}>
                <span className={`icon is-small ${css(styles.icon_only)}`}><i className={`fa fa-sign-out`} aria-hidden="true"></i></span>
                <span className={`is-hidden-touch ${css(styles.icon_with_text)}`}>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      // TABLET

    )
  }
}

export default graphql(LogoutUser)(PrivateHeader)
