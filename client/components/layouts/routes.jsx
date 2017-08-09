import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from './protected_route'
// Public
import PublicHeader from './headers/public_header'
import IndexPage from '../index/index'
import Login from '../misc/login'
import PilotPage from '../pilots/index'
import PilotRegistrationPage from '../pilots/register/index'
import WorkPage from '../works/index'
import FaqPage from '../misc/faqIndex'
import PricingPage from '../agent/pagePricing'
import SampleVideo from '../misc/sampleVideo'
import PublicFooter from './footers/public_footer'
// Agent
import PrivateHeader from './headers/private_header'
import AgentDashboard from '../dashboard/agent_index'
// Pilot
// import PrivateHeader from './headers/private_header'
import PilotDashboard from '../dashboard/pilot_index'
// Admin


const authenticated = (props) => {
  console.log('loggedIn', props.user)
  return props.user ? true : false
}

const RenderHeader = (props) => {
  if (props.user){
    return <PrivateHeader {...props} />
  }
  return <PublicHeader {...props} />
}

const RenderFooter = (props) => {
  if (props.user){
    return null
  }
  return <PublicFooter {...props} />
}

const Routes = (props) => {
  return (
    <div>
      {RenderHeader(props)}
      <Switch>
        <ProtectedRoute path='/dashboard' component={AgentDashboard} user={props.user} auth="agent" />
        <ProtectedRoute path='/open-missions' component={PilotDashboard} user={props.user} auth="pilot" />
        <Route path='/pilots/register' component={PilotRegistrationPage} />
        <Route path='/pilots' component={PilotPage} />
        <Route path='/pricing' component={PricingPage} />
        <Route path='/how-it-works' component={WorkPage} />
        <Route path='/faq' component={FaqPage} />
        <Route path='/pricing' component={PricingPage} />
        <Route path='/' component={IndexPage} />
      </Switch>
      <Route path='/sample-video' component={SampleVideo} />
      <Route path='/login' component={Login} />
      {RenderFooter(props)}
    </div>
  )
}


module.exports = { Routes }
