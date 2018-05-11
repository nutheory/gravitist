// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import GetUsers from '../../../queries/user_collections'
import UserCard from './user_card'
import Pagination from '../../misc/pagination'

type Props = {
  match: Object,
  title: string,
  sortBy: string,
  showPagination?: boolean,
  sortDirection: string,
  queryString: string,
  sizeLimit: number,
  pageNumber: number,
  criteria: Object,
  cssHelper?: Object,
  cssSizing?: string,
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
    const { users, count } = this.props.userList.getUsers
    return (
      <div>
        <div className="flex flex-wrap mb-4 md:-mx-4">
          { users.map((user, i) => (
            <UserCard
              cssSizing={ this.props.cssSizing }
              user={user}
              key={`user_${user.id}`} />
          ))}
        </div>
        { this.props.showPagination ?
          <div className="">
            <Pagination
              match={this.props.match}
              pageSize={this.props.sizeLimit}
              recordCount={count}
              pageNumber={this.props.pageNumber} />
          </div>
        : null }
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
          sizeLimit: props.sizeLimit,
          colOffset: (props.pageNumber - 1) * props.sizeLimit
        },
        criteria: props.criteria,
        queryString: props.queryString || ''
    } } }) })
)(UserList)
