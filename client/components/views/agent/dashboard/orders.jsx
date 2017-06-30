import React, { Component } from 'react'
import 'bulma'

class Orders extends Component{
  constructor(){
    super()
  }

  render(){
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
          <a className="panel-block is-active">
            <span className="panel-icon">
              <i className="fa fa-map-o" aria-hidden="true"></i>
            </span>
            bulma
          </a>
          <a className="panel-block">
            <span className="panel-icon">
              <i className="fa fa-map-o" aria-hidden="true"></i>
            </span>
            marksheet
          </a>
          <a className="panel-block">
            <span className="panel-icon">
              <i className="fa fa-map-o" aria-hidden="true"></i>
            </span>
            minireset.css
          </a>
          <label className="panel-block">
            <input type="checkbox" />
            Remember me
          </label>
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

export default Orders
