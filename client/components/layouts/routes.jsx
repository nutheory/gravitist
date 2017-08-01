import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
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

// Admin


const authenticated = (props) => {
  console.log('loggedIn', props.current_user)
  return props.current_user ? true : false
}

const ProtectedAgentRoute = ({ component: Component, current_user, ...rest }) => {
  console.log("current_user", current_user)
  return (
    <Route {...rest} render={ props => (
      current_user ? (<Component current_user={current_user} {...props} />) : (<Redirect to="/" />)
    )} />
  )
}

const RenderHeader = (props) => {
  if (props.data.current_user){
    return <PrivateHeader {...props} />
  }
  return <PublicHeader {...props} />
}

const RenderFooter = (props) => {
  if (props.current_user){
    return null
  }
  return <PublicFooter {...props} />
}

const Routes = (props) => {
  return (
    <div>
      {RenderHeader(props)}
      <Switch>
        <ProtectedAgentRoute path='/dashboard' component={AgentDashboard} current_user={props.data.current_user} />
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
