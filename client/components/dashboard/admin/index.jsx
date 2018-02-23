// @flow
import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import Overview from './overview'
import UserList from './user_list'
import OrderList from './order_list'
import Profile from '../../users/view_edit'
import Order from '../../orders/view_edit'
import Search from '../../misc/search'

type Props = {

}

type State = {
  queryString?: string
}

class AdminDashboard extends Component<Props, State>{

  searchQuery: Function

  constructor(){
    super()

    this.state = {

    }

    this.searchQuery = this.searchQuery.bind(this)
  }

  searchQuery(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ queryString: e.currentTarget.value })
  }

  render(){
    return (
      <div className="container">
        <Switch>
          <Route path="/dashboard" render={({ match }) => (
            <Overview />
          )} />
          <Route path="/admin/pilots" render={({ match }) => (
            <div>
              <div className="columns">
                <div className="column">
                  <h3 className="title is-3">Pilots</h3>
                </div>
                <div className="column is-one-third">
                  <Search
                    placeHolder="Search by name, account ID, or email"
                    queryString={ this.state.queryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
              <UserList
                sortBy="createdAt"
                criteria={{ type: 'pilot' }}
                queryString={ this.state.queryString }
                searchQuery={ this.searchQuery } />
            </div>
          )} />
          <Route path="/admin/agents" render={({ match }) => (
            <div>
              <div className="columns">
                <div className="column">
                  <h3 className="title is-3">Agents</h3>
                </div>
                <div className="column is-one-third">
                  <Search
                    placeHolder="Search by name, customer ID, or email"
                    queryString={ this.state.queryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
              <UserList
                sortBy="createdAt"
                criteria={{ type: 'agent' }}
                queryString={ this.state.queryString }
                searchQuery={ this.searchQuery } />
            </div>
          )} />
          <Route path="/admin/:type/profile/:userId" render={({ match }) => (
            <div>
              <Profile userid={match.params.userId} />
              <div className="columns">
                <div className="column">
                  <h3 className="title is-3">Orders</h3>
                </div>
                <div className="column is-one-third">
                  <Search
                    placeHolder="Search by status, receipt ID, or plan"
                    queryString={ this.state.queryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
              <OrderList
                sortBy="createdAt"
                criteria={{ [`${ match.params.type ? match.params.type : '' }Id`]: match.params.userId }}
                queryString={ this.state.queryString }
                searchQuery={ this.searchQuery } />
            </div>
          )} />
          <Route path="/admin/orders" render={({ match }) => (
            <div>
              <div className="columns">
                <div className="column">
                  <h3 className="title is-3">Recent Orders</h3>
                </div>
                <div className="column is-one-third">
                  <Search
                    placeHolder="Search by status, receipt ID, or plan"
                    queryString={ this.state.queryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
              <OrderList
                sortBy="createdAt"
                criteria={{ }}
                queryString={ this.state.queryString }
                searchQuery={ this.searchQuery } />
            </div>
          )} />
          <Route path="/admin/order/:orderId" render={({ match }) => (
            <Order orderid={ match.params.orderId } />
          )} />
          <Route path="/settings" render={({ match }) => (
            <Profile />
          )} />
          <Route path="/dashboard" component={Overview} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </div>
    )
  }
}

export default AdminDashboard
