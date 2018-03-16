// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { where, equals, not } from 'ramda'
import jwtDecode from 'jwt-decode'
import MissionCard from './mission_card'
import OrdersQuery from '../../../queries/order_collections'

type Props = {
  data: Object,
  cssSizing?: string
}

type State = {}

class OrderList extends Component<Props, State> {
  constructor(){
    super()

    this.state = {

    }
  }

  render(){
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const { loading, getOrders } = this.props.data
    if (loading) { return <div></div> }
    const all = getOrders.orders
    const current = getOrders.orders.filter(odr => odr.status === 'filming' )
    const history = getOrders.orders.filter(odr => odr.status !== 'filming' )
    return(
      <div className="flex flex-wrap mb-6 md:-mx-4">
        { this.props.view === "all" ?
          all.map((mission, i) => (
            <MissionCard key={`mission_${i}`} mission={mission} user={user} cssSizing={ this.props.cssSizing } />
          ))
        : this.props.view === "current" ?
            current.map((mission, i) => (
              <MissionCard key={`mission_${i}`} mission={mission} user={user} cssSizing={ this.props.cssSizing } />
            ))
        : <div>
          { history.map((mission, i) => (
            <MissionCard key={`mission_${i}`} mission={mission} user={user} cssSizing={ this.props.cssSizing } />
          ))}
        </div>}
      </div>
    )
  }
}

export default graphql(OrdersQuery, {
  options: (props) => ({ variables: { input: {
    options: {
      sortKey: 'createdAt',
      sortValue: 'ASC',
      sizeLimit: 20
    },
    criteria: props.criteria,
    queryString: props.queryString || ''
  } } })
})(OrderList)
