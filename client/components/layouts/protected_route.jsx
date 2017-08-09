import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user, auth, ...rest }) => (
  <Route {...rest} render={ props => (
    user && user.type === auth ? <Component user={user} {...props} /> : <Redirect to="/" />
  )} />
)

export default ProtectedRoute
