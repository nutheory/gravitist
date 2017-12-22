import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import DefaultLayout from './default'
import SimpleLayout from './simple'
import AuthLayout from './auth'
// Public
import IndexPage from '../index/index'
import Order from '../agent/order'
import Login from '../misc/login'
import PilotPage from '../pilots/index'
import PilotRegistrationPage from '../pilots/register/index'
import WorkPage from '../works/index'
import FaqPage from '../misc/faq_index'
import PricingPage from '../agent/page_pricing'
import SampleVideo from '../misc/sample_video'
// Agent
import AgentDashboard from '../dashboard/agent_index'
// Pilot
import PilotDashboard from '../dashboard/pilot_index'
// Admin

const Routes = (props) => {
  return (
    <div>
      <Switch>
        <SimpleLayout path='/login' component={Login} />
        <AuthLayout path='/dashboard' component={AgentDashboard} auth="agent" />
        <AuthLayout path='/missions' component={PilotDashboard} auth="pilot" />
        <SimpleLayout path='/pricing/order/:plan' component={Order} />
        <DefaultLayout path='/pilots/register' component={PilotRegistrationPage} />
        <DefaultLayout path='/pilots' component={PilotPage} />
        <DefaultLayout path='/pricing' component={PricingPage} />
        <DefaultLayout path='/how-it-works' component={WorkPage} />
        <DefaultLayout path='/faq' component={FaqPage} />
        <DefaultLayout path='/' component={IndexPage} />
      </Switch>
      <Route path='/sample-video' component={SampleVideo} />
    </div>
  )
}


export default Routes
