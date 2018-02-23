// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { graphql, compose } from 'react-apollo'
import LiNavLink from '../../misc/li_navlink'
import jwtDecode from 'jwt-decode'
import styles from '../styles/private_header'
import UserTokenQuery from '../../../queries/check_refresh'
import UpdateUserMutation from '../../../mutations/update_user'

const agentLinks = [['fas fa-tachometer-alt', '/dashboard', 'Dashboard'], ['fas fa-rocket', '/new-order', 'New Order'],
  ['fa fa-hashtag', '/orders', 'Orders'], ['fa fa-cog', '/settings', 'Settings']]
const pilotLinks = [['fas fa-tachometer-alt', '/dashboard', 'Dashboard'], ['fas fa-history', '/history', 'History'],
  ['fa fa-cog', '/settings', 'Settings']]
const adminLinks = [['fas fa-tachometer-alt', '/dashboard', 'Dashboard'], ['fa fa-plane', '/admin/pilots', 'Pilots'],
  ['far fa-id-card', '/admin/agents', 'Agents'],['fa fa-hashtag', '/admin/orders', 'Orders'], ['fa fa-cog', '/settings', 'Settings']]

type Props = {
  history: Object,
  user: Object,
  checkToken: Object,
  refreshToken: Function
}

type State = {
  currentUser: Object,
  lastRefreshed?: string
}

class PrivateHeader extends Component<Props, State> {

  renderLinks: Function
  userTypeLinks: Function
  handleRefreshToken: Function

  constructor(){
    super()
    this.state = {
      currentUser: jwtDecode(localStorage.getItem('hf_auth_header_token'))
    }

    this.renderLinks = this.renderLinks.bind(this)
    this.userTypeLinks = this.userTypeLinks.bind(this)
    this.handleRefreshToken = this.handleRefreshToken.bind(this)
    // this.logoutHandler = this.logoutHandler.bind(this)
  }

  async componentDidMount(){
    // const { loading, error, tokenRefreshCheck } = this.props.checkToken
    // const result = this.props.checkToken
    // if(!loading){
      // console.log('result.error',result)

    //   console.log('result.error',loading)
    //   console.log('result.error', tokenRefreshCheck)
    // }

    //   // if( result.tokenRefreshCheck ){
    //   //   if( result.tokenRefreshCheck.user.refreshToken ){
    //   //     const newAuth = this.props.refreshToken({
    //   //       variables: { input: {
    //   //         id: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
    //   //         authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
    //   //         user: { refreshToken: false } } } })
    //   //           .then(auth => { localStorage.setItem('hf_auth_header_token', auth.data.updateUser.auth.token) })
    //   //   }
    //   } else {
    //     localStorage.removeItem('hf_auth_header_token')
    //     this.props.history.replace('/')
    //   }
    // } else {
    //   console.log('result.error',result.error)
    // }
  }

  renderLinks(userType: string){
    if(userType == "agent"){ return this.userTypeLinks(agentLinks) }
    if(userType == "pilot"){ return this.userTypeLinks(pilotLinks) }
    if(userType == "admin"){ return this.userTypeLinks(adminLinks) }
  }

  userTypeLinks(arrLinks: Array<Array<string>>){
    const links = arrLinks.map((link, i) =>
      <LiNavLink key={link[1]} activeClassName='is-active' strict to={`${link[1]}`}>
        <span className={`icon is-small ${css(styles.icon_only)}`}><i className={`${link[0]}`} aria-hidden="true"></i></span>
        <span className={`is-hidden-touch ${css(styles.icon_with_text)}`}>{link[2]}</span>
      </LiNavLink>
    )
    return links
  }

  logoutHandler(e: SyntheticEvent<*>){
    e.preventDefault()
    localStorage.removeItem('hf_auth_header_token')
    this.props.history.replace('/')
  }

  handleRefreshToken(){
    this.props.refreshToken().then(res => {
      // this.setState({ lastRefreshed: Date.now().toString() })
      localStorage.setItem('hf_auth_header_token', res.data.updateUser.auth.token)
      window.location.reload(true)
    })
  }

  handleErrors(errors){
    // console.log('ERRRR', errors)
    errors.map(err => {
      if(err.name === "NotFound"){
        localStorage.removeItem('hf_auth_header_token')
        this.props.history.replace('/')
      }
    })
  }

  render(){
    const { loading, error, tokenRefreshCheck } = this.props.checkToken
    if(loading){ return <div></div> }
    if(error){ if(error.graphQLErrors[0].name === 'NotFound'){
      localStorage.removeItem('hf_auth_header_token')
      window.location.reload(true)
    } }
    if(tokenRefreshCheck.user.refreshToken){ this.handleRefreshToken() }
    return (
      <div>
        {/* <nav className="columns section has-shadow" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <div className="column is-3">
            <a className="nav-item is-pulled-left">

            </a>
          </div>
          <div className="column tabs is-centered is-toggle is-hidden-touch">
            <ul className="is-pulled-right">
              { this.renderLinks(this.state.currentUser.type) }
            </ul>
          </div>
          <div className="column is-2 nav-menu is-hidden-touch">
            <a className="nav-item is-pulled-right">Logout</a>
          </div>
          <div className="column tabs is-centered is-toggle is-hidden-desktop">
            <ul>
              { this.renderLinks(this.state.currentUser.type) }
              <LiNavLink activeClassName='is-active' exact={true} strict to={`/logout`}>
                <span className={`icon is-small ${css(styles.privateIcons)}`}><i className={`fa fa-sign-out ${css(styles.iconMarginRight)}`} aria-hidden="true"></i></span>
              </LiNavLink>
            </ul>
          </div>
        </nav> */}

        {/* MOBILE */}
        <nav className={`${css(styles.paddingTopBottom)} block is-block-mobile`}>
          <a className={`${css(styles.marginTopBottom)} nav-center`}>
            <h1 className={`${css(styles.logo)}`}>Homefilming</h1>
            {/* <img src={require('../../../assets/svg/logoGreen.svg')} className={`${css(styles.logo)}`} alt="Homefilming logo" /> */}
          </a>
          <div className="tabs block is-toggle is-centered ">
            <ul>
              { this.renderLinks(this.state.currentUser.type) }
              <li>
                <a href='#' onClick={this.logoutHandler.bind(this)}>
                  <span className={`icon is-small ${css(styles.icon_only)}`}><i className={`fas fa-sign-out-alt`} aria-hidden="true"></i></span>
                  <span className={`is-hidden-touch ${css(styles.icon_with_text)}`}>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* TABLET */}
      </div>
    )
  }
}

export default compose(
  graphql(UserTokenQuery, { name: 'checkToken' }),
  graphql(UpdateUserMutation, {
    props: ({ ownProps, mutate }) => ({
      refreshToken: () => mutate({ variables: { input: {
        id: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
        authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
        user: { refreshToken: false } } }
      })
    })
  })
)(PrivateHeader)
