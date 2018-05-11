// @flow
import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Overview from './overview'
import UserList from './user_list'
import OrderList from './order_list'
import DiscountList from './discount_list'
import DiscountForm from './discount_form'
import Profile from '../../users/view_edit'
import Order from '../../orders/view_edit'
import Search from '../../misc/search'
import { ToastContainer } from 'react-toastify'

type Props = {
  history: Object
}

type State = {
  userQueryString?: string,
  orderQueryString?: string
}

class AdminDashboard extends Component<Props, State>{

  searchQuery: Function

  constructor(){
    super()

    this.state = {

    }

    this.searchQuery = this.searchQuery.bind(this)
  }

  searchQuery(e: SyntheticInputEvent<*>){
    const target = e.currentTarget
    if (target.pageType){
      this.setState({ [`${target.pageType}QueryString`]: target.value })
    } else {
      this.setState({ [`${target.getAttribute('pagetype')}QueryString`]: target.value })
    }
  }

  pagination(){

  }

  render(){
    return (
      <div className="container mx-auto mt-8">
        <ToastContainer />
        <Switch>
          <Route path="/admin/pilots/:pageNumber?" render={({ match }) => (
            <div className="mx-4 md:mx-0 pb-8">
              <div className="flex my-4">
                <div className="flex-1 flex items-end">
                  <h3 className="font-bold text-xl">Pilots</h3>
                </div>
                {console.log(match)}
                <div className="w-2/3">
                  <Search
                    pageType="user"
                    placeHolder="Search by name, account ID, or email"
                    queryString={ this.state.userQueryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
              <UserList
                showPagination={true}
                match={match}
                sortBy="createdAt"
                sizeLimit={20}
                pageNumber={ match.params.pageNumber || 1 }
                criteria={{ type: 'pilot' }}
                queryString={ this.state.userQueryString }
                searchQuery={ this.searchQuery } />
            </div>

          )} />
          <Route path="/admin/agents/:pageNumber?" render={({ match }) => (
            <div className="mx-4 md:mx-0 pb-8">
              <div className="flex my-4">
                <div className="flex-1 flex items-end">
                  <h3 className="font-bold text-xl">Agents</h3>
                </div>
                <div className="w-1/2">
                  <Search
                    pageType="user"
                    placeHolder="Search by name, customer ID, or email"
                    queryString={ this.state.userQueryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
              <UserList
                showPagination={true}
                match={match}
                sortBy="createdAt"
                sizeLimit={20}
                pageNumber={ match.params.pageNumber || 1 }
                criteria={{ type: 'agent' }}
                queryString={ this.state.userQueryString }
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
                    pageType="order"
                    placeHolder="Search by status, or receipt ID"
                    queryString={ this.state.orderQueryString }
                    searchQuery={ this.searchQuery } />
                </div>
                <div className="w-full">
                  <OrderList
                    cssSizing="w-full sm:w-1/2 md:w-1/3 lg:w-full"
                    sortBy="createdAt"
                    criteria={{ [`${ match.params.type ? match.params.type : '' }Id`]: match.params.userId }}
                    queryString={ this.state.orderQueryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
            </div>
          )} />
          <Route path="/admin/orders/:pageNumber?" render={({ match }) => (
            <div className="mx-4 md:mx-0 pb-8">
              <div className="flex flex-wrap my-4 mx-4 md:mx-0">
                <div className="flex-1 flex items-end">
                  <h3 className="font-bold text-xl">Orders</h3>
                </div>
                {console.log('match', match)}
                <div className="w-1/2">
                  <Search
                    pageType="order"
                    placeHolder="Search by status, receipt ID, or plan"
                    queryString={ this.state.orderQueryString }
                    searchQuery={ this.searchQuery } />
                </div>
              </div>
              <OrderList
                showPagination={true}
                match={match}
                sortBy="createdAt"
                sizeLimit={20}
                pageNumber={ parseInt(match.params.pageNumber) || 1 }
                criteria={{}}
                queryString={ this.state.orderQueryString }
                 />
            </div>
          )} />
          <Route path="/admin/order/:orderId" render={({ match }) => (
            <div>
              <Order orderid={ match.params.orderId } history={this.props.history} />
            </div>
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
          <Route render={({ match }) => (
            <Overview />
          )} />
        </Switch>
      </div>
    )
  }
}

export default AdminDashboard
