// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql } from 'react-apollo'
import dsh from '../styles/dashboard'
import jwtDecode from 'jwt-decode'
import Config from '../../../utils/config'
import { getEnv } from '../../../utils/helpers'
import Profile from '../../users/view_edit'
import OpenMissions from './open_missions'
import AcceptedMissions from './accepted_missions'
import MissionView from '../../orders/view_edit'
import AcceptTermsMutation from '../../../mutations/accept_terms'
import Notifications from '../../../utils/notifications.json'
const env = getEnv(window.location.host)
const stripeClientId = Config.stripe_platform[env]
const returnUri = Config.base_url[env]

type Props = {
}

type State = {
}

class PilotDashboard extends Component<Props, State> {

  renderNotifications: Function

  constructor(){
    super()
    this.state = {
    }

    this.renderNotifications = this.renderNotifications.bind(this)
  }

  renderNotifications(user: Object){
    return (
      <div className="flex flex-wrap md:-mx-4 ">
        { !user.accountId ? <div className="flex-1 p-4">
          <div className="border border-grey bg-red-lightest p-4">
            <h3 className="font-bold text-sm">{ Notifications.user.pilot.account.title }</h3>
            <p className="text-sm">{ Notifications.user.pilot.account.body }</p>
            <a href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${returnUri}/users/signup-pilot&client_id=${stripeClientId}&state=${user.id}`}>
              <img src={`${require('../../../assets/images/stripe.png')}`} style={{ display: 'block', height: '30px', marginTop: '1rem' }} />
            </a>
          </div>
        </div> : null }
        { !user.isVerified ? <div className="flex-1 p-4">
          <div className="border border-grey bg-yellow-lightest p-4">
            <h3 className="font-bold text-sm">{ Notifications.user.pilot.verified.title }</h3>
            <p className="text-sm">{ Notifications.user.pilot.verified.body }</p>
          </div>
        </div> : null }
      </div>
    )
  }

  render(){
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    return (
      <div className="container mx-auto mt-8">
        { !user.isVerified || !user.accountId ? this.renderNotifications(user) : null }
        <Switch>
          <Route path="/history" render={({ match }) => (
            <AcceptedMissions view="all" cssSizing={``} />
          )} />
          <Route path="/missions/:missionId/:agentId?" render={({ match }) => (
            <div className={`columns`}>
              <div className={`column`}>
                <MissionView orderid={match.params.missionId} authid={match.params.agentId ? match.params.agentId : null} />
              </div>
            </div>
          )} />
          <Route path="/settings" render={({ match }) => (
            <Profile />
          )} />
          <Route render={({ match }) => (
            <div className="flex flex-wrap -mx-6">
              <div className="w-1/4 px-6 pb-4">
                <div className="font-bold text-xl my-2">Current Missions</div>
                <AcceptedMissions view="current" cssSizing="w-full" />
              </div>
              <div className="w-3/4 px-6 pb-4">
                <div className="font-bold text-xl my-2">Open Missions</div>
                { user.deactivated ?
                  <div>
                    <p className="">Your account has been deactived because... </p>
                    <p>{ user.deactivatedReason }</p>
                    <p>to contest this or if you believe this was an error please <a href="mailto:contest@homefilming.com">contact us</a>.</p>
                  </div>
                : <OpenMissions cssSizing="w-1/3" /> }
              </div>
            </div>
          )} />
        </Switch>
      </div>
    )
  }
}

export default PilotDashboard
