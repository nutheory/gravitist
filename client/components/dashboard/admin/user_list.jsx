// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import GetUsers from '../../../queries/user_collections'
import UserCard from './user_card'

type Props = {
  title: string,
  sortBy: string,
  sortDirection: string,
  queryString: string,
  sizeLimit: number,
  criteria: Object,
  cssHelper?: Object,
  userList: Function,
  searchQuery: Function
}

type State = {
  searchResults?: Object
}

class UserList extends Component<Props, State>{

  constructor(props){
    super(props)

    this.state = {

    }

  }


  render(){
    const { loading } = this.state.searchResults || this.props.userList
    if(loading){return <div></div>}
    const users = this.props.userList.getUsers.users
    return (
      <div className={ this.props.cssHelper === "horizontal" ? this.props.cssHelper : 'columns is-multiline' }>
        { users.map((user, i) => (
          <UserCard user={user} key={`user_${user.id}`} />
        ))}
      </div>
    )
  }
}

export default compose(
  graphql(GetUsers, {
    name: "userList",
    options: (props) => ({
      variables: { input: {
        options: {
          sortKey: props.sortBy || 'createdAt',
          sortValue: props.sortDirection  || 'DESC',
          sizeLimit: props.sizeLimit || 50
        },
        criteria: props.criteria,
        queryString: props.queryString || ''
    } } }) })
)(UserList)
