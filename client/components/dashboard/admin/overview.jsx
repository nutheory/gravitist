// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import OrderList from './order_list'
import UserList from './user_list'

type Props = {

}

type State = {

}

class Overview extends Component<Props, State>{
  constructor(){
    super()

  }

  render(){
    return (
      <div className="container">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full lg:w-1/2 px-6 pb-4">
            <div className="">Unverified Pilots</div>
            <UserList
              cssSizing="w-full lg:w-1/2"
              sortBy="createdAt"
              sizeLimit={10}
              criteria={{ type: 'pilot', isVerified: false }} />
          </div>
          <div className="w-full lg:w-1/2 px-6 pb-4">
            <div className="">Orders needing review</div>
            <OrderList
              cssSizing="w-full lg:w-1/2"
              sortBy="uploadedAt"
              sizeLimit={10}
              criteria={{ status: 'awaiting_review' }} />
          </div>
        </div>
      </div>
    )
  }
}

export default Overview
