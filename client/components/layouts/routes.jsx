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
import Order from '../public/agent/order'
import Login from '../users/login'
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
  console.log("No Auth", path)
  try{
    user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
  } catch(e){
  }
  return (
    <div>
      {/* { user  ? <AuthLayout path='/' component={Dashboard} /> : */}
        <div>
          <Switch>
            <SimpleLayout path='/login' component={Login} />
            <SimpleLayout path='/!!!admin-registration' component={AdminRegistrationPage} />
            <SimpleLayout path='/pricing/order/:plan' component={Order} />
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

    </div>
  )
}


export default Routes
