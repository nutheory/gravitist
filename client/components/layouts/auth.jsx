import React, { Component } from 'react'
import { ToastContainer } from "react-toastify"
import { Route, Redirect } from 'react-router-dom'
import PrivateHeader from './headers/private_header'
import jwtDecode from 'jwt-decode'


const AuthLayout = ({ component: Component, ...rest }) => {
  let user
  try{
    user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
  } catch(e){
    console.log("No Auth")
  }

  return (
    <Route {...rest} render={ props => (
      <div className="admin-body font-source-sans">
        <PrivateHeader user={user} {...props} />
        <Component user={user} {...props} />
      </div>
    )} />
  )
}

export default AuthLayout
