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
        <div className="columns">
          <div className="column">
            <div className="title is-4">Unverified Pilots</div>
            <UserList sortBy="createdAt" sizeLimit={10} criteria={{ type: 'pilot', isVerified: false }} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="title is-4">Orders needing review</div>
            <OrderList sortBy="uploadedAt" sizeLimit={10} criteria={{ status: 'awaiting_review' }} />
          </div>
        </div>
      </div>
    )
  }
}

export default Overview
