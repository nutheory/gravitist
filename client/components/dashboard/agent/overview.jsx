// @flow
import React, { Component } from 'react'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
import { css } from 'aphrodite'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import Order from '../../orders/view_edit'
import OrderHistory from './order_history'
import OrdersQuery from '../../../queries/order_collections'

type Props = {
  overview: Object,
  orderid?: string
}

type State = {
}

class AgentOverview extends Component<Props, State> {

  handleInputChange: Function

  constructor(props: Object){
    super(props)

    this.state ={
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(){}

  render(){
    const { loading, error, history } = this.props.overview
    if(loading){ return <div className="m-6">Loading...</div> }
    const currentOrderId = this.props.orderid ? this.props.orderid : history.orders[0].id
    return(
      <div className={`columns`}>
        <div className={`w-1/4`}>
          <Order orderid={ currentOrderId } />
        </div>
        <div className={`column is-one-fifth`}>
          <OrderHistory selected={ currentOrderId } orders={ history.orders } />
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(OrdersQuery, {
    options: (props) => ({ variables: { input: {
      options: {
        sortKey: 'createdAt',
        sortValue: 'DESC',
        sizeLimit: 10
      },
      criteria: {},
      queryString: '' } } })
  })
)(AgentOverview)
