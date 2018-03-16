// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import GetOrders from '../../../queries/order_collections'
import OrderCard from './order_card'

type Props = {
  data: Object,
  cssSizing?: string,
  sortBy?: string,
  sizeLimit?: number,
  criteria?: Object,
  queryString?: string
}

type State = {

}

class OrderList extends Component<Props, State>{

  constructor(){
    super()
  }

  render(){
    const { loading, getOrders } = this.props.data
    if(loading){return (<div></div>)}
    const orders = getOrders.orders
    
    return (
      <div className="flex flex-wrap mb-6 md:-mx-4">
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

export default graphql(GetOrders, {
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
})(OrderList)
