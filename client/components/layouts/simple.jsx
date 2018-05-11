import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const SimpleLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={ props => (
      <div className="font-source-sans">
        <ToastContainer />
        <Component {...props} />
      </div>
    )} />
  )
}

export default SimpleLayout
