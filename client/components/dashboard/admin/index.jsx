// @flow
import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import Overview from './overview'
import UserList from './user_list'
import OrderList from './order_list'
import DiscountList from './discount_list'
import DiscountForm from './discount_form'
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
      <div className="container mx-auto mt-8">
        <Switch>
          <Route path="/admin/pilots" render={({ match }) => (
            <div>
              <div className="flex my-4">
                <div className="flex-1 flex items-end">
                  <h3 className="font-bold text-xl">Pilots</h3>
                </div>
                <div className="w-1/3">
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
              <div className="flex flex-wrap my-4">
                <div className="flex-1 flex items-end">
                  <h3 className="font-bold text-xl">Agents</h3>
                </div>
                <div className="w-1/3">
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
            <div className="flex flex-wrap">
              <div className="w-full lg:w-3/4">
                <Profile userid={match.params.userId} />
              </div>
              <div className="w-full lg:w-1/4 lg:pl-8 pt-4">
                <h3 className="font-bold text-right">Recent History</h3>
                <div className="w-full pt-2 pb-4">
                  <Search
                    placeHolder="Search by status, or receipt ID"
                    queryString={ this.state.queryString }
                    searchQuery={ this.searchQuery } />
                </div>
                <div className="w-full">
                  <OrderList
                    cssSizing="w-full sm:w-1/2 md:w-1/3 lg:w-full"
                    sortBy="createdAt"
                    criteria={{ [`${ match.params.type ? match.params.type : '' }Id`]: match.params.userId }}
                    queryString={ this.state.queryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
            </div>
          )} />
          <Route path="/admin/orders/:criteria?/:criteriaId?" render={({ match }) => (
            <div>
              <div className="flex flex-wrap my-4">
                <div className="flex-1 flex items-end">
                  <h3 className="font-bold text-xl">Orders</h3>
                </div>
                {console.log('match', match)}
                <div className="w-1/3">
                  <Search
                    placeHolder="Search by status, receipt ID, or plan"
                    queryString={ this.state.queryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
              <OrderList
                sortBy="createdAt"
                criteria={ match.params.criteria ? { [match.params.criteria]: match.params.criteriaId } : null }
                queryString={ this.state.queryString }
                searchQuery={ this.searchQuery } />
            </div>
          )} />
          <Route path="/admin/order/:orderId" render={({ match }) => (
            <Order orderid={ match.params.orderId } />
          )} />
          <Route path="/admin/discounts" render={({ match }) => (
            <div>
              <div className="flex flex-wrap w-full">
                <DiscountForm />
              </div>
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 my-8 pb-4">
                  <div className="font-bold text-xl my-2">Discounts</div>
                  <DiscountList />
                </div>
              </div>
            </div>
          )} />
          <Route path="/settings" render={({ match }) => (
            <Profile />
          )} />
          <Route path="/" render={({ match }) => (
            <Overview />
          )} />
        </Switch>
      </div>
    )
  }
}

export default AdminDashboard
