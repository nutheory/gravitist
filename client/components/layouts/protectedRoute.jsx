import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={ props => (
    user ? <Component user={user} {...props} /> : <Redirect to="/" />
  )}
)
