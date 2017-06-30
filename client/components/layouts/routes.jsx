import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AgentDashboard from '../views/agent/dashboard/index'
// Public
import IndexPage from '../views/index/index'
import Login from '../views/misc/login'
import PilotPage from '../views/pilots/index'
import PilotRegistrationPage from '../views/pilots/register'
import WorkPage from '../views/works/index'
import FaqPage from '../views/misc/faqIndex'
import PricingPage from '../views/agent/pagePricing'
import SampleVideo from '../views/misc/sampleVideo'
// Agent

// Pilot

// Admin

export const PublicRoutes = (props) => {
  return (
    <div>
      <Switch>
        <Route path='/pilots' component={PilotPage} />
        <Route path='/pilots/register' component={PilotRegistrationPage} />
        <Route path='/pricing' component={PricingPage} />
        <Route path='/how-it-works' component={WorkPage} />
        <Route path='/faq' component={FaqPage} />
        <Route path='/pricing' component={PricingPage} />
        <Route path='/' component={IndexPage} />
      </Switch>
      <Route path='/sample-video' component={SampleVideo} />
      <Route path='/login' component={Login} />
    </div>
  )
}

export const AgentRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path='/dashboard' component={AgentDashboard} />
      </Switch>
    </div>
  )
}

export const PilotRoutes = () => {
  // return (
  //
  // )
}

export const AdminRoutes = () => {
  // return (
  //
  // )
}
