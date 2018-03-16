// @flow
import React, { Component } from 'react'
import { dateTimeShort } from '../../utils/helpers'
const linkToPayment = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }applications/transfers/`

const TransferReceipt = ({ order }: Object) => {
  return(
    <div className="flex">
      <div className="flex-1">
        <div className="text-xs">Transfer ID</div>
        <div className="uppercase font-bold text-sm">
          <a href={`${linkToPayment}${ order.pilotTransferId }`}
            target="_blank"
            className="">{ order.pilotTransferId }</a>
        </div>
      </div>
      <div className="ml-4">
        <div className="text-right">
          <div className="text-xs">Transfer Sent</div>
          <div className="">{ dateTimeShort(order.reviewedAt) }</div>
        </div>
      </div>
    </div>
  )
}

export default TransferReceipt
