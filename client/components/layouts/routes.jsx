import React from 'react'
import { Route, Switch } from 'react-router-dom'
// Public
import PublicHeader from './headers/public_header'
import IndexPage from '../views/index/index'
import Login from '../views/misc/login'
import PilotPage from '../views/pilots/index'
import PilotRegistrationPage from '../views/pilots/register/index'
import WorkPage from '../views/works/index'
import FaqPage from '../views/misc/faqIndex'
import PricingPage from '../views/agent/pagePricing'
import SampleVideo from '../views/misc/sampleVideo'
import PublicFooter from './footers/public_footer'
// Agent
import AgentHeader from './headers/agent_header'
import AgentDashboard from '../views/agent/dashboard/index'
// Pilot

// Admin


const authenticated = (props) => {
  console.log('loggedIn', )
  return props.current_user ? true : false
}

const setPermissions = (props) => {
  if(props.current_user){
    switch(props.current_user.type){
      case "agent":
        return { view: ["orders", "pilot"], edit: ["orders"] }
        break
      case "pilot":
        return { view: ["allOrders", "allUsers"], edit: ["orders"] }
        break
      case "editor":
        return { view: ["allOrders", "allUsers"], edit: ["allOrders"] }
        break
      case "admin":
        return { view: ["allUsers", "allOrders"], edit: ["allOrders", "allUsers"] }
        break
      case "super":
        return { view: ["all"], edit: ["all"] }
        break
    }
  }
}

export const PublicRoutes = (props) => {
  const loggedIn = authenticated(props)
  const permissions = setPermissions(props)
  return (
    <Route path='/'>
      <div>
        <PublicHeader {...props} />
        <Switch>
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
        <PublicFooter {...props} />
      </div>
    </Route>
  )
}

export const AgentRoutes = (props) => {
  return (
    <Route path='/agent'>
      <div>
        <AgentHeader {...props} />
        <Switch>
          <Route path='/dashboard' component={AgentDashboard} />
        </Switch>
        {/* <AgentFooter {...props} /> */}
      </div>
    </Route>
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
