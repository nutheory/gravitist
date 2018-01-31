// @flow
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'

type Props = {
  title: string,
  itemName: string,
  orders: Array<Object>
}

type State = {

}

class OrderList extends Component<Props, State>{

  renderOrder: Function

  constructor(){
    super()

    this.renderOrder = this.renderOrder.bind(this)
  }

  componentDidMount(){

  }

  renderOrder(){
    if (this.props.orders.length === 0){ return <div className="panel-block">{`You do not have any ${this.props.itemName}s.`}</div> }
    const orderList = this.props.orders.map((order, i) =>
      <NavLink key={`order_${i}`} className="panel-block is-active" to={`/dashboard/${order.id}`}>
        <span className="panel-icon">
          <i className="fa fa-map-o" aria-hidden="true"></i>
        </span>
        {order.address.address1}
      </NavLink>
    )
    return orderList
  }

  render(){
    return (
      <div>
        <nav className="panel">
          <p className="panel-heading">
            { this.props.title }
          </p>
          {/* <div className="panel-block">
            <p className="control has-icons-left">
              <input className="input is-small" type="text" placeholder="Search" />
              <span className="icon is-small is-left">
                <i className="fa fa-search"></i>
              </span>
            </p>
          </div>
          <p className="panel-tabs">
            <a className="is-active">All</a>
            <a>Open</a>
            <a>Archived</a>
            <a>Canceled</a>
          </p> */}
          {this.renderOrder()}
          {/* <div className="panel-block">
            <button className="button is-primary is-outlined is-fullwidth">
              Reset all filters
            </button>
          </div> */}
        </nav>
      </div>
    )
  }
}

export default OrderList
