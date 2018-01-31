// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'

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
            <UserList title="New Pilots" sortBy="createdAt" sizeLimit={10} criteria={{ type: 'pilot', isVerified: false }} />
          </div>
        </div>
      </div>
    )
  }
}

export default Overview
