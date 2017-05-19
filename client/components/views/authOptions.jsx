import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import Login from '../forms/login'
import OrderSignup from '../forms/orderSignup'

class AuthOptions extends Component {
  constructor(){
    super()
  }


  render(){
    return (
      <div id="authOptions" className={css(layout.authFormsContainer)}>
        <div id="newCustomer">
          <h3 className={css(layout.sectionTitle)}>New Customer</h3>
          <OrderSignup plan={this.props.plan} type="user" key={this.props.plan} />
        </div>
        <div id="returningCustomer" className={css(layout.loginSidebar)}>
          <h3 className={css(layout.sectionTitle)}>Returning Customer</h3>
          <Login />
        </div>
      </div>
    )
  }

}

export default AuthOptions
