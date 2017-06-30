import React, { Component } from 'react'
import logo from '../../../assets/svg/logoGreen.svg'

class AgentHeader extends Component {
  constructor(){
    super()
  }

  render(){
    return (
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <a className="nav-item">
              <img src={logo} style={{ width: '180px', height: '40px'}} alt="Homefilming logo" />
            </a>
            <a className="nav-item is-tab is-hidden-mobile is-active">Dashboard</a>
            <a className="nav-item is-tab is-hidden-mobile">New Order</a>
            <a className="nav-item is-tab is-hidden-mobile">Contact</a>
          </div>
          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="nav-right nav-menu">
            <a className="nav-item is-tab is-hidden-tablet is-active">Dashboard</a>
            <a className="nav-item is-tab is-hidden-tablet">New Order</a>
            <a className="nav-item is-tab is-hidden-tablet">Contact</a>
            <a className="nav-item is-tab">
              <i className="fa fa-cog" style={{marginRight:'8px'}} aria-hidden="true"></i>
              Settings
            </a>
            <a className="nav-item is-tab">Logout</a>
          </div>
        </div>
      </nav>
    )
  }
}

export default AgentHeader
