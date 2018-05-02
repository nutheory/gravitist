// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import GetOrders from '../../../queries/order_collections'
import OrderCard from './order_card'
import Pagination from '../../misc/pagination'

type Props = {
  match: Object,
  showPagination?: boolean,
  sizeLimit: number,
  pageNumber: number,
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
    const { count, orders } = getOrders
    return (
      <div>
        <div className="flex flex-wrap mb-6 md:-mx-4">
          { orders ? orders.map((order, i) => (
            <OrderCard
              cssSizing={ this.props.cssSizing }
              order={order}
              key={`order_${order.id}`} />
          )) : 'No Results' }
        </div>
        { this.props.showPagination ?
          <div className="">
            <Pagination
              match={this.props.match}
              pageSize={this.props.sizeLimit}
              recordCount={count}
              pageNumber={this.props.pageNumber} />
          </div>
        : null }
      </div>
    )
  }
}

export default graphql(GetOrders, {
  name: "orderList",
  options: (props) => ({
    variables: { input: {
      options: {
        sortKey: 'uploadedAt' || 'createdAt',
        sortValue: props.sortDirection  || 'DESC',
        sizeLimit: props.sizeLimit,
        colOffset: (props.pageNumber - 1) * props.sizeLimit
      },
      criteria: props.criteria,
      queryString: props.queryString || ''
  } } })
})(OrderList)
