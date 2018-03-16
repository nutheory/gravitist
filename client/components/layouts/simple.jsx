import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import ss from './styles/simple'
import Loader from '../misc/loader'

const SimpleLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={ props => (
      <div className="font-source-sans">
        <Component {...props} />
      </div>
    )} />
  )
}

export default SimpleLayout
