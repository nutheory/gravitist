import React, { Component } from 'react'
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Gallery from '../public/gallery/index'
import GalleryFooter from './footers/gallery_footer'

const GalleryLayout = ({ component: Component, ...rest }) => {
  return (
    <BrowserRouter>
      <div className="bg-black pt-8 pb-12">
        <Switch>
          <Route path='/gallery/:uuid' render={({ match }) => (
            <Gallery uuid={match.params.uuid} />
          )} />
        </Switch>
        <GalleryFooter />
      </div>
    </BrowserRouter>
  )
}

export default GalleryLayout
