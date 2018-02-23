import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { graphql,compose } from 'react-apollo'
import jwtDecode from 'jwt-decode'
import GalleryFooter from './footers/gallery_footer'

const GalleryLayout = ({ component: Component, ...rest }) => {


  return (
    <Route {...rest} render={ props => (
      <div>
        <Component {...props} />
        <GalleryFooter {...props} />
      </div> )}
    />
  )
}

export default GalleryLayout
