// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { where, equals, not } from 'ramda'
import jwtDecode from 'jwt-decode'
import MissionCard from './mission_card'
import OrderList from '../order_list'
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
    const currentOrders = list.orders.filter(odr => where({ pilotId: equals(user.id), status: equals('filming') }) )
    const pastOrders = list.orders.filter(odr => odr.pilotId === user.id && odr.status !== 'filming' )
    return (
      <div className="columns">
        <div className="column">
          <div>
            { currentOrders.length > 0 ? <div className="title">Current missions</div> : null }
            { currentOrders.length > 0 ? currentOrders.map((mission, i) => (
                <MissionCard key={`mission_${i}`} mission={mission} user={user} accepted={true} />
            )) : null}

            <div className="title">Open missions</div>
            { open.length > 0 ? open.map((mission, i) => (
              <MissionCard key={`mission_${i}`} mission={mission} user={user} accepted={false} />
            )) : <div className="title is-5">There are no open missions in your area.</div> }
          </div>
        </div>
        <div className="column is-one-third">
          <div>
            <div className="title">Pilot info</div>
            <OrderList orders={ pastOrders } title="History" itemName="mission" />
          </div>
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
      }
    })
  }),
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
      }
    })
  })
)(MissionList)
