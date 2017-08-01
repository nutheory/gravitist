import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'bulma'
import { graphql } from 'react-apollo'
import OrdersQuery from '../../queries/agent_orders'

class Orders extends Component{
  constructor(){
    super()

    this.renderOrder = this.renderOrder.bind(this)
    // this.getOrders = this.getOrders.bind(this)
  }

  componentDidMount(){
    console.log(this)
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
    const {loading, agentOrders} = this.props.orders

    if (loading === true) {return <div></div>}
    console.log('agentOrders', agentOrders)
    return (
      <div>
        <nav className="panel">
          <p className="panel-heading">
            Orders
          </p>
          {/* <div className="panel-block">
            <p className="control has-icons-left">
              <input className="input is-small" type="text" placeholder="Search" />
              <span className="icon is-small is-left">
                <i className="fa fa-search"></i>
              </span>
            </p>
          </div>*/}
          <p className="panel-tabs">
            <a className="is-active">All</a>
            <a>Open</a>
            <a>Archived</a>
            <a>Canceled</a>
          </p>
          {this.renderOrder(agentOrders)}
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

export default graphql(OrdersQuery, { name: 'orders' })(Orders)
