// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { css } from 'aphrodite'
import dsh from '../styles/dashboard'
import jwtDecode from 'jwt-decode'
import Config from '../../../utils/config'
import Profile from '../../users/view_edit'
import MissionList from './mission_list'
import MissionView from '../../orders/view_edit'
import AcceptTermsMutation from '../../../mutations/accept_terms'
import Notifications from '../../../utils/notifications.json'
const env = window.location.host === "homefilming.com" ? "production" : "development"
const stripeClientId = Config.stripe_platform[env]
const returnUri = Config.base_url[env]

type Props = {
  acceptTerms: Function
}

type State = {
  user: Object,
  accountNotifyVisible: boolean,
  userVerifiedVisible: boolean,
  acceptTermsVisible: boolean
}

class PilotDashboard extends Component<Props, State> {

  handleAcceptTerms: Function

  constructor(){
    super()
    this.state = {
      user: {},
      accountNotifyVisible: false,
      userVerifiedVisible: false,
      acceptTermsVisible: false
    }

    this.handleAcceptTerms = this.handleAcceptTerms.bind(this)
  }

  componentDidMount(){
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const account = !user.accountId ? true : false
    this.setState({
      user,
      accountNotifyVisible: account,
      userVerifiedVisible: !user.isVerified,
      acceptTermsVisible: !user.termsAccepted
    })
  }

  renderAcceptTermsNotification(){
    if(this.state.acceptTermsVisible){
      return (
        <div className="column">
          <article className="message is-info">
            <div className="message-body">
              <h3 className={`has-text-weight-bold`}>{ Notifications.user.pilot.terms.title }</h3>
              <p>{ Notifications.user.pilot.terms.body }</p>
              <a style={{ display: 'block', marginTop: '1rem' }} className={`button is-success`} onClick={ this.handleAcceptTerms }>
                <span className="icon is-small">
                  <i className="fas fa-check"></i>
                </span>
                <span>Accept terms</span>
              </a>
            </div>
          </article>
        </div>
      )
    }
  }

  renderUserVerifiedNotification(){
    if(this.state.userVerifiedVisible){
      return (
        <div className="column">
          <article className="message is-warning">
            <div className="message-body">
              <h3 className={`has-text-weight-bold`}>{ Notifications.user.pilot.verified.title }</h3>
              <p>{ Notifications.user.pilot.verified.body }</p>
            </div>
          </article>
        </div>
      )
    }
  }

  renderAccountNotification(){
    if(this.state.accountNotifyVisible){
      return (
        <div className="column">
          <article className="message is-danger">
            <div className="message-body">
              <h3 className={`has-text-weight-bold`}>{ Notifications.user.pilot.account.title }</h3>
              <p>{ Notifications.user.pilot.account.body }</p>
              <a href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${returnUri}/signup-pilot&client_id=${stripeClientId}&state=${this.state.user.id}`}>
                <img src={`${require('../../../assets/images/stripe.png')}`} style={{ display: 'block', height: '30px', marginTop: '1rem' }} />
              </a>
            </div>
          </article>
        </div>
      )
    }
  }

  handleAcceptTerms(){
    this.props.acceptTerms({ state: this.state }).then(result => {
      localStorage.setItem('hf_auth_header_token', result.data.updateUser.auth.token)
      this.setState({ acceptTermsVisible: false })
    })
  }

  render(){
    return (
      <div className={`section ${css(dsh.paddingTopBottom)}`}>
        <div className="container">
          <div id="notifications" className={`columns`}>
            { this.renderAccountNotification() }
            { this.renderUserVerifiedNotification() }
            { this.renderAcceptTermsNotification() }
          </div>
          <Switch>
            <Route path="/dashboard" render={({ match }) => (
              <MissionList view={ match.path.substring(1) } />
            )} />
            <Route path="/history" render={({ match }) => (
              <MissionList view={ match.path.substring(1) } />
            )} />
            <Route path="/missions/:missionId/:agentId?" render={({ match }) => (
              <div className={`columns`}>
                <div className={`column`}>
                  <MissionView orderid={match.params.missionId} authid={match.params.agentId ? match.params.agentId : null} />
                </div>
                <div className={`column is-one-fifth`}>
                </div>
              </div>
            )} />
            <Route path="/settings" render={({ match }) => (
              <Profile />
            )} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default graphql(AcceptTermsMutation, {
  props: ({ mutate }) => ({
    acceptTerms: ({ state }) => mutate({ variables: {
      input: {
        id: state.user.id,
        authorizedId: state.user.id,
        user: {
          termsAccepted: true
        }}}})})
})(PilotDashboard)
