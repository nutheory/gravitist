// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import { where, equals, not } from 'ramda'
import jwtDecode from 'jwt-decode'
import MissionCard from './mission_card'
import OrderList from '../order_list'
import lst from '../styles/lists'
import MissionQuery from '../../../queries/missions'
import OrdersQuery from '../../../queries/order_collections'

type Props = {
  orders: Object,
  missions: Object
}

type State = {}

class MissionList extends Component<Props, State> {
  constructor(){
    super()

    this.state = {

    }
  }

  render(){
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const { loadingOrders, list } = this.props.orders
    const { loading, open } = this.props.missions
    if (loading || loadingOrders === true) { return <div></div> }
    const currentOrders = list.orders.filter(odr => odr.status === 'filming' )
    const pastOrders = list.orders.filter(odr => odr.status !== 'filming' )
    return (
      <div className="columns">
        <div className="column">
        { this.props.view === "history" ?
          <div className={css(lst.listContainer)}>
            <div className="title">History </div>
            <div className={css(lst.deck)}>
              { pastOrders.length > 0 ? pastOrders.map((mission, i) => (
                <MissionCard key={`mission_${i}`} mission={mission} user={user} accepted={false} />
              )) : <div className="title is-5">You have no history. Get out and fly Whiskey Delta.</div> }
            </div>
          </div>
        : null }
        { this.props.view === "dashboard" ?
          <div>
            <div className={css(lst.listContainer)}>
              { currentOrders.length > 0 ? <div className="title">Current missions</div> : null }
              <div className={css(lst.deck)}>
                { currentOrders.length > 0 ? currentOrders.map((mission, i) => (
                  <MissionCard key={`mission_${i}`} mission={mission} user={user} accepted={true} />
                )) : null}
              </div>
            </div>

            <div className={css(lst.listContainer)}>
              <div className="title">Open missions </div>
              <div className={css(lst.deck)}>
                { open.length > 0 ? open.map((mission, i) => (
                  <MissionCard key={`mission_${i}`} mission={mission} user={user} accepted={false} />
                )) : <div className="title is-5">There are no open missions in your area.</div> }
              </div>
            </div>
          </div>
        : null }
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(MissionQuery, {
    name: 'missionQuery',
    options: (props) => ({ variables: { input: {
      sortKey: 'distanceFromLocation',
      sortValue: 'ASC',
      sizeLimit: 20 } } }),
    props: ({ missionQuery: { loading, error, getMissions } }) => ({
      missions: {
        error,
        loading,
        open: getMissions
    } }) }),
  graphql(OrdersQuery, {
    name: 'ordersQuery',
    options: (props) => ({ variables: { input: {
      options: {
        sortKey: 'createdAt',
        sortValue: 'ASC',
        sizeLimit: 20
      },
      criteria: props.criteria,
      queryString: props.queryString || ''
    } } }),
    props: ({ ordersQuery: { loading, error, getOrders } }) => ({
      orders: {
        errorOrders: error,
        loadingOrders: loading,
        list: getOrders
    } }) })
)(MissionList)
