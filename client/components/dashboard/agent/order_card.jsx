// @flow
import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import Avatar from '../../assets/avatar'
import { humanize, dateTimeShort } from '../../../utils/helpers'
import crd from '../styles/order_card'
const linkToApiReceipt = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }payments/`

type Props = {
  order: Object,
  cssSizing?: string
}

type State = {

}

class OrderCard extends Component<Props, State>{

  constructor(){
    super()
  }

  render(){
    const cssSizing = this.props.cssSizing || "w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    const order = this.props.order
    return (
      <div className={`${ cssSizing } px-4 pb-6`}>
        <div className="bg-white rounded shadow">
          <div className="bg-blue-lightest rounded-t border-b border-grey p-4">
            <div className="flex">
              <div className="mr-4">
                <i className="fas fa-home fa-3x"></i>
              </div>
              <div className="">
                <div className="font-bold text-2xl">{ order.status == "approved_completed" ? "Delivered" : "Coming Soon" }</div>
                <p className="">{ humanize(order.status) }</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="">
              <div className="text-center font-medium">{ order.address.address1 }</div>
              <div className="text-center text-sm">{`${order.address.city}, ${order.address.state} ${order.address.zipCode}`}</div>
            </div>
            <div className="py-4">
              <div className="text-xs text-center">Last updated</div>
              <p className="text-center text-sm">{ dateTimeShort(order.updatedAt) }</p>
            </div>
            <div className="text-center text-xs py-4">
              <a href={`${ linkToApiReceipt }${ order.receiptId }`} target="_blank">{ order.receiptId }</a>
            </div>
            <div className="flex leading-normal">
              <div className=" flex-1 text-xs text-right">
                <Link
                  className="inline-block text-blue-darker border border-blue-darker py-1 px-6 rounded-full"
                  to={`/orders/${ order.id }`}>View</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderCard
