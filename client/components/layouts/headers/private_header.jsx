// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import LiNavLink from '../../misc/li_navlink'
import jwtDecode from 'jwt-decode'
import UserTokenQuery from '../../../queries/check_refresh'
import UpdateUserMutation from '../../../mutations/update_user'

const agentLinks = [['fas fa-tachometer-alt', '/dashboard', 'Dashboard'], ['fas fa-rocket', '/re-order/standard', 'New Order']]
const pilotLinks = [['fas fa-tachometer-alt', '/dashboard', 'Dashboard'], ['fas fa-history', '/history', 'History']]
const adminLinks = [['fas fa-tachometer-alt', '/dashboard', 'Dashboard'], ['fa fa-plane', '/admin/pilots', 'Pilots'],
  ['far fa-id-card', '/admin/agents', 'Agents'],['fa fa-hashtag', '/admin/orders', 'Orders'],
  ['fas fa-tags', '/admin/discounts', 'Discounts']]

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
  }

  async componentDidMount(){
  }

  renderLinks(userType: string){
    if(userType == "agent"){ return this.userTypeLinks(agentLinks) }
    if(userType == "pilot"){ return this.userTypeLinks(pilotLinks) }
    if(userType == "admin"){ return this.userTypeLinks(adminLinks) }
  }

  userTypeLinks(arrLinks: Array<Array<string>>){
    const links = arrLinks.map((link, i) =>
      <LiNavLink key={link[1]} activeClassName='is-active' className="ml-4 no-underline text-sm" strict to={`${link[1]}`}>
        <span className="px-1"><i className={`${link[0]}`} aria-hidden="true"></i></span>
        <span className="hidden md:inline-block pl-1">{link[2]}</span>
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
      localStorage.setItem('hf_auth_header_token', res.data.updateUser.auth.token)
      window.location.reload(true)
    })
  }

  handleErrors(errors){
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
      <div className="auth-header-bg">
        <header className="container h-full flex mx-auto">
          <div className="flex-1 flex">
            <Link className="w-48 h-10 block mt-4" to="/dashboard">
              <img src={`/${require('../../../assets/svg/hf_logo_dark.svg')}`} />
            </Link>
          </div>
          <nav className="flex flex-col">
            <div className="flex self-end mb-5 text-sm pt-1">
              <div className="ml-4">
                Welcome {this.state.currentUser.name}
              </div>
              <a href='/settings' className="block ml-4">
                <span className="">Settings</span>
              </a>
              <a href='#' className="block ml-4" onClick={this.logoutHandler.bind(this)}>
                <span className="">Logout</span>
              </a>
            </div>
            <ul className="flex self-end pb-2">
              { this.renderLinks(this.state.currentUser.type) }
            </ul>
          </nav>
        </header>
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
