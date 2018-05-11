// @flow
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import GetOrders from '../../../queries/order_collections'
import OrderCard from './order_card'
import Pagination from '../../misc/pagination'

type Props = {
  match?: Object,
  showPagination?: boolean,
  sizeLimit?: number,
  pageNumber?: number,
  pageSize?: number,
  queryString?: string,
  searchQuery?: Function,
  title?: string,
  criteria?: Object,
  cssSizing?: string,
  sortBy?: string
}

type State = {

}

const OrderList = (props: Props) => (
  <Query
    query={GetOrders}
    variables={{ input: {
        options: {
          sortKey: 'uploadedAt' || 'createdAt',
          sortValue: props.sortDirection  || 'DESC',
          sizeLimit: props.sizeLimit,
          colOffset: props.pageNumber && props.sizeLimit ? (props.pageNumber - 1) * props.sizeLimit : null
        },
        criteria: props.criteria,
        queryString: props.queryString || ''
    } } }
    pollInterval={8000}
  >
    {({ loading, error, data: {getOrders} }) => {
      if(loading){return (<div></div>)}
      if(error) return `Error!: ${error}`
      const { orders, count } = getOrders
      return (
        <div>
          <div className="flex flex-wrap mb-4 md:-mx-4">
            { orders ? orders.map((order, i) => (
              <OrderCard
                cssSizing={ props.cssSizing }
                order={order}
                key={`order_${order.id}`} />
            )) : <div className="p-4">No Results</div> }
          </div>
          { props.showPagination && props.sizeLimit && props.pageNumber && props.match && count ?
            <div className="">
              <Pagination
                match={props.match}
                pageSize={props.sizeLimit}
                recordCount={parseInt(count)}
                pageNumber={props.pageNumber || 1} />
            </div>
          : null }
        </div>
      )
    }}
  </Query>
)

export default OrderList
