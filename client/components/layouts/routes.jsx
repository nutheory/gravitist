// @flow
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import DefaultLayout from './default'
import SimpleLayout from './simple'
import AuthLayout from './auth'
import Loadable from 'react-loadable'
// Public
import IndexPage from '../public/index/index'
import Login from '../users/login'
import ResetPassword from '../users/reset_password'
import PilotPage from '../public/pilots/index'
import WorkPage from '../public/works/index'
import FaqPage from '../public/faq_index'
import Pricing from '../public/agent/pricing'
import SampleVideo from '../public/sample_video'
import jwtDecode from 'jwt-decode'

const Loading = () => {
  return <div>Loading...</div>
}

const UserDashboard = Loadable({ loader: () => import('../dashboard/index'), loading: Loading })
const OrderSignup = Loadable({ loader: () => import('../public/agent/order_signup'), loading: Loading })
const PilotRegistrationPage = Loadable({ loader: () => import('../public/pilots/register'), loading: Loading })
const AdminRegistrationPage = Loadable({ loader: () => import('../public/admin/register'), loading: Loading })

type Props = {

}

const Routes = () => {

  let user
  const path = window.location.pathname.substring(1)
  try{
    user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
  } catch(e){
  }
  // console.log('USER', user)
  return (
    <div className="--router">
      <Switch>
        <SimpleLayout path='/login' component={Login} />
        <SimpleLayout path='/reset-password' component={ResetPassword} />
        <SimpleLayout path='/!!!admin-registration' component={AdminRegistrationPage} />
        <SimpleLayout path='/pricing/order/:plan' component={ OrderSignup } />
        <SimpleLayout path='/pilots/register' component={ PilotRegistrationPage } />
        <DefaultLayout path='/pilots' component={PilotPage} />
        <DefaultLayout path='/pricing' component={Pricing} />
        <DefaultLayout path='/how-it-works' component={WorkPage} />
        <DefaultLayout path='/faq' component={FaqPage} />
        { user ? <AuthLayout path='/' component={ UserDashboard } /> :
        <DefaultLayout path='/' component={IndexPage} /> }

        {/* <AuthLayout path='/' component={Dashboard} /> */}
      </Switch>
      <Route path='/sample-video' component={SampleVideo} />
    </div>
  )
}

// props => <DynamicImport props={props} load={import('../dashboard/index')} />
export default Routes
