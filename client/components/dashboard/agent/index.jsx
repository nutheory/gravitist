// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import jwtDecode from 'jwt-decode'
import OrderList from '../order_list'
import Overview from './overview'
import Reorder from './reorder'
import Profile from '../../users/view_edit'
import dsh from '../styles/dashboard'
import { css } from 'aphrodite'
import {pathOr} from 'ramda'
import OrdersQuery from '../../../queries/order_collections'

type Props = {
  orders: Object
}

type State = {

}

class AgentDashboard extends Component<Props, State>{

  constructor(){
    super()

  }

  componentDidMount(){
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
        <div className={`section ${css(dsh.paddingTopBottom)}`}>
          <div className="container">
            <Switch>
              <Route path="/dashboard/:orderId?" render={({ match }) => (
                <Overview orderid={ match.params.orderId ? match.params.orderId : null } />
              )} />
              <Route path="/new-order" component={ Reorder } />
              
              <Route path="/settings" render={({ match }) => (
                <Profile />
              )} />
            </Switch>
          </div>
          {/* <div className="tile is-ancestor">
            <div className="tile is-vertical is-parent"> */}
              {/* <div className="tile is-child">
                <Reorder />
              </div> */}
              {/* <div className="tile is-parent box hero is-dark is-bold">
                <Route path={ `/dashboard/:orderId?` } render={opts =>
                  <CollaborationArea
                    {...opts}
                    orderId={ opts.match.params.orderId || list.orders[0].id || null } />
                } />
              </div>
            </div>
            <div className="tile is-3 is-parent">
              <div className="tile is-child">
                <OrderList orders={ list.orders } title="Orders" itemName="order" />
              </div>
            </div> */}
          {/* </div> */}
        </div>
      )
    }
  }
}

export default graphql(OrdersQuery, {
  options: (props) => ({ variables: { input: {
    options: {
      sortKey: 'createdAt',
      sortValue: 'DESC',
      sizeLimit: 5
    },
    criteria: {},
    queryString: '' } } }),
  props: ({ data: { loading, error, getOrders } }) => ({
    orders: {
      error,
      loading,
      list: getOrders
    }
  })
})(AgentDashboard)
