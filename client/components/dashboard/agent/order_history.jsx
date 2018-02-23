// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import Moment from 'moment'

type Props = {
  selected: string,
  orders: Array<Object>
}

type State = {
}

class OrderHistory extends Component<Props, State> {

  handleInputChange: Function

  constructor(props: Object){
    super(props)

    this.state = {
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(){}

  render(){
    return(
      <div>
        { this.props.orders.map(order =>
          <div key={`order_${order.id}`}>
            <div>{Moment(Date.parse(order.createdAt)).format('MMM Do YYYY')}</div>
            <div>{order.address.address1}</div>
          </div>
        ) }
      </div>
    )
  }
}

export default OrderHistory
