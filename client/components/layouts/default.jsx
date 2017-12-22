import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PublicHeader from './headers/public_header'
import PublicFooter from './footers/public_footer'

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={ props => (
      <div>
        <PublicHeader {...props} />
        <Component {...props} />
        <PublicFooter {...props} />
      </div>
    )} />
  )
}

export default DefaultLayout
