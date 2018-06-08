// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import Loadable from 'react-loadable'
import jwtDecode from 'jwt-decode'
import OrderList from './order_list'
import Overview from './overview'
import PricingOptions from '../../public/agent/pricing_options'
import Reorder from './reorder'
import {pathOr} from 'ramda'
import OrdersQuery from '../../../queries/order_collections'
const Loading = () => {
  return <div className="m-6">Loading...</div>
}

const Order = Loadable({ loader: () => import('../../orders/view_edit'), loading: Loading })
const Profile = Loadable({ loader: () => import('../../users/view_edit'), loading: Loading })

type Props = {
  history: Object,
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
      return <div className="m-6">Loading...3</div>
    } else if (error) {
      console.log(error)
      return <p>Error!</p>
    } else {
      return (
        <div className="container mx-auto mt-8">
          <Switch>
            <Route path="/orders/:orderId" render={({ match }) => (
              <Order orderid={ match.params.orderId } />
            )} />
            <Route path="/re-order/:plan" render={({ match }) => (
              <Reorder match={match} history={this.props.history} />
            )} />
            <Route path="/new-order" render={({ match }) => (
              <PricingOptions />
            )} />
            <Route path="/settings" render={({ match }) => (
              <Profile />
            )} />
            <Route render={({ match }) => (
              <div className="flex flex-wrap -mx-6">
                <div className="w-full lg:w-1/2 px-6 pb-4">
                  <div className="font-bold text-xl my-2">Recent orders</div>
                  <OrderList
                    cssSizing="w-full lg:w-1/2"
                    sortBy="uploadedAt"
                    sizeLimit={10}
                    criteria={{ status: 'recruiting,filming,initial_processing,final_processing,awaiting_review' }} />
                </div>
                <div className="w-full lg:w-1/2 px-6 pb-4">
                  <div className="font-bold text-xl my-2">Order history</div>
                  <OrderList
                    cssSizing="w-full lg:w-1/2"
                    sortBy="uploadedAt"
                    sizeLimit={10}
                    criteria={{ status: 'approved_completed' }} />
                </div>
              </div>
            )} />
          </Switch>
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
