// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import Moment from 'moment'
import views from './styles/views'
import cE from '../../styles/common_elements'
const linkToPayment = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }applications/transfers/`

const TransferReceipt = (props: Object) => {
  console.log(props)
  return(
    <div className="columns">
      <div className="column">
        <div className={css(views.greenArea, cE.greenObj)}>
          <div className={css(views.smallTitle)}>Transfer ID</div>
          <div className={`${css(views.bigText)}`}>
            <a href={`${linkToPayment}${props.order.pilotTransferId}`}
              target="_blank"
              className={css(views.receiptIdLink)}>{props.order.pilotTransferId }</a>
          </div>
        </div>
      </div>
      <div className="column is-narrow">
        <div className={css(views.greenArea, cE.greenObj)}>
          <div className={css(views.smallTitle)}>Transfer Sent</div>
          <div className={`${css(views.bigText)}`}>{ Moment(Date.parse(props.order.reviewedAt)).format('MMM Do YYYY') }</div>
        </div>
      </div>
    </div>
  )
}

export default TransferReceipt
