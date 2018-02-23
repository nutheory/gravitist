// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import GetOrders from '../../../queries/order_collections'
import OrderCard from './order_card'

type Props = {
  orderList: Object,
  title: string
}

type State = {

}

class OrderList extends Component<Props, State>{

  constructor(){
    super()
  }

  render(){
    const { loading, getOrders } = this.props.orderList
    if(loading){return (<div></div>)}
    const orders = getOrders.orders
    return (
      <div className={ this.props.cssHelper === "horizontal" ? this.props.cssHelper : 'columns is-multiline' }>
        { orders ? orders.map((order, i) => (
          <OrderCard order={order} key={`order_${order.id}`} />
        )) : 'No Results' }
      </div>
    )
  }
}

export default compose(
  graphql(GetOrders, {
    name: "orderList",
    options: (props) => ({
      variables: { input: {
        options: {
          sortKey: props.sortBy || 'createdAt',
          sortValue: props.sortDirection  || 'DESC',
          sizeLimit: props.sizeLimit || 50
        },
        criteria: props.criteria,
        queryString: props.queryString || ''
    } } })
  })
)(OrderList)
