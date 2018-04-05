// @flow
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { Helmet } from "react-helmet"
import DefaultLayout from './default'
import GalleryLayout from './gallery'
import SimpleLayout from './simple'
import AuthLayout from './auth'
// Public
import GalleryView from '../public/gallery/index'
import IndexPage from '../public/index/index'
import OrderSignup from '../public/agent/order_signup'
import Login from '../users/login'
import ResetPassword from '../users/reset_password'
import PilotPage from '../public/pilots/index'
import PilotRegistrationPage from '../public/pilots/register'
import AdminRegistrationPage from '../public/admin/register'
import WorkPage from '../public/works/index'
import FaqPage from '../public/faq_index'
import PagePricing from '../public/agent/page_pricing'
import SampleVideo from '../public/sample_video'
import Dashboard from '../dashboard/index'
import jwtDecode from 'jwt-decode'

type Props = {

}

const Routes = () => {

  let user
  const path = window.location.pathname.substring(1)
  try{
    user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
  } catch(e){
  }
  return (
    <div className="--router">
      <Switch>
        <SimpleLayout path='/login' component={Login} />
        <SimpleLayout path='/reset-password' component={ResetPassword} />
        <SimpleLayout path='/!!!admin-registration' component={AdminRegistrationPage} />
        <SimpleLayout path='/pricing/order/:plan' component={OrderSignup} />
        <SimpleLayout path='/pilots/register' component={PilotRegistrationPage} />
        <DefaultLayout path='/pilots' component={PilotPage} />
        <DefaultLayout path='/pricing' component={PagePricing} />
        <DefaultLayout path='/how-it-works' component={WorkPage} />
        <DefaultLayout path='/faq' component={FaqPage} />
        { user ? <AuthLayout path='/' component={Dashboard} /> :
        <DefaultLayout path='/' component={IndexPage} /> }

        {/* <AuthLayout path='/' component={Dashboard} /> */}
      </Switch>
      <Route path='/sample-video' component={SampleVideo} />
    </div>
  )
}


export default Routes
