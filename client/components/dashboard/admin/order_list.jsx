// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import GetOrders from '../../../queries/order_collections'
import OrderCard from './order_card'

type Props = {
  orderList: Object,
  title: string,
  cssSizing: string
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
      <div className="flex flex-wrap -mb-4 -mx-4">
        { orders ? orders.map((order, i) => (
          <OrderCard
            cssSizing={ this.props.cssSizing }
            order={order}
            key={`order_${order.id}`} />
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
