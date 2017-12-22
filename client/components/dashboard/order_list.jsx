import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// import 'bulma/css/bulma.css'
import { graphql } from 'react-apollo'

class OrderList extends Component{
  constructor(){
    super()

    this.renderOrder = this.renderOrder.bind(this)
    // this.getOrders = this.getOrders.bind(this)
  }

  componentDidMount(){
    console.log(this.props.orders)
  }

  renderOrder(orders){
    if (orders.length === 0){return "You do not have any orders."}
    const orderList = orders.map((order, i) =>
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
    console.log('THIS',this.props)
    return (
      <div>
        <nav className="panel">
          <p className="panel-heading">
            Orders
          </p>
          <div className="panel-block">
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
          </p>
          {this.renderOrder(this.props.orders)}
          <div className="panel-block">
            <button className="button is-primary is-outlined is-fullwidth">
              Reset all filters
            </button>
          </div>
        </nav>
      </div>
    )
  }
}

export default OrderList
