import React, { Component } from 'react'
import PaymentForm from '../forms/customerPayment'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'

class Payment extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div id="payment" className={css(layout.cardContainer)}>
        <div className={css(layout.cardForm)}>
          <PaymentForm />
        </div>
        <div id="card-wrapper" className={css(layout.cardDisplay)}></div>
      </div>
    )
  }
}

export default Payment
