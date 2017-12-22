import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import jwtDecode from 'jwt-decode'
import OrderList from './order_list'
import CollaborationArea from './collaboration_area'
import styles from './styles/dashboard'
import { css } from 'aphrodite'
import {pathOr} from 'ramda'

import ORDERS_QUERY from '../../queries/orders'

class AgentDashboard extends Component{
  constructor(){
    super()
    this.state = {
      currentUser: jwtDecode(localStorage.getItem('hf_auth_header_token'))
    }
  }

  componentDidMount(){
    console.log('this.state',this.state.currentUser)
  }

  // getCollaborationOrder(match){
  //   console.log('MATCH', this.props)
  //   const { loading, order } = pathOr(false, ['match', 'params', 'orderId'], match) ?
  //     this.props.order
  //     : { order: this.state.orders[0] }
  //   return order
  // }

  render(){
    const { list, loading, error } = this.props.orders
    if (loading) {
      return <p>Loading...</p>
    } else if (error) {
      console.log(error)
      return <p>Error!</p>
    } else {
      return (
        <div className={`section ${css(styles.paddingTopBottom)}`}>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-parent">
              {/* <div className="tile is-child">
                <Reorder />
              </div> */}
              <div className="tile is-parent box hero is-dark is-bold">
                <Route path={ `/dashboard/:orderId?` } render={opts =>
                  <CollaborationArea
                    {...opts}
                    orderId={ opts.match.params.orderId || list[0].id } currentUser={this.state.currentUser} />
                } />
              </div>
            </div>
            <div className="tile is-3 is-parent">
              <div className="tile is-child">
                <OrderList orders={ list } />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default graphql(ORDERS_QUERY, {
  options: (props) => ({ variables: { input: {
    sortKey: 'pilotAcceptedAt',
    sortValue: 'DESC',
    sizeLimit: 5 } } }),
  props: ({ data: { loading, error, getOrders } }) => ({
    orders: {
      error,
      loading,
      list: getOrders
    }
  })
})(AgentDashboard)
