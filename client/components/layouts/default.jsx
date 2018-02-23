import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PublicHeader from './headers/public_header'
import PublicFooter from './footers/public_footer'
import jwtDecode from 'jwt-decode'

const DefaultLayout = ({ component: Component, ...rest }) => {
  let user
  try{
    user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
  } catch(e){
  }

  return (
    <Route {...rest} render={ props => (
      <div>
        { !user ?
          (<div>
            <PublicHeader {...props} />
            <Component {...props} />
            <PublicFooter {...props} />
          </div>) : null
        }
      </div>
    )} />
  )
}

export default DefaultLayout
