// @flow
import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { find, propEq } from 'ramda'
import Avatar from '../../assets/avatar'
import ContactDisplay from '../../contacts/display'
const linkToApiAccount = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }applications/users/`
const linkToApiCustomer = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }customers/`

type Props = {
  user: Object,
  cssSizing?: string
}

type State = {

}

class UserCard extends Component<Props, State>{

  renderApiLink: Function

  constructor(){
    super()

    this.renderApiLink = this.renderApiLink.bind(this)
  }

  renderApiLink(user: Object){
    if(user.type === "agent"){
      if(user.customerId){
        return <a href={`${linkToApiCustomer}${user.customerId}`} target="_blank">{user.customerId}</a>
      } else { return 'Not connected yet.' }
    } else if(user.type === "pilot"){
      if(user.accountId){
        return <a href={`${linkToApiAccount}${user.accountId}`} target="_blank">{user.accountId}</a>
      } else { return 'Not connected yet.' }
    } else {
      return 'Not applicable'
    }
  }

  render(){
    const user = this.props.user
    const cssSizing = this.props.cssSizing || "w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    const contact = user.contacts.filter(cnt => cnt.default ? cnt : null)[0]
    return (
      <div className={`${ cssSizing } px-4 pb-6`}>
        <div className="bg-white rounded shadow px-4 py-3 relative">
          { user.type === "pilot" ?
            <div className="absolute pin-t pin-l w-full p-2 flex">
              <div className="flex-1">Rejected: {user.rejectedCount}</div>
              <div className="flex-1 text-right">Aborted: {user.abortCount}</div>
            </div>
          : null }
          <div className="py-4 w-20 mx-auto">
            <Avatar size="large" src={ user.avatars.length > 0 ? user.avatars[0].url : null } />
          </div>
          <p className="text-center">{user.name}</p>
          <p className="text-center">
            <a className="text-xs" href={`mailto:${user.email}`}>{user.email}</a>
          </p>
          <div className="py-4">
            { user.type === "pilot" ?
              <div>
                { user.isVerified ?
                  <p className="text-center text-sm">
                    <i className="far fa-check-circle text-green"></i> <span className="font-medium">Verified</span>
                  </p>
                : <p className="text-center text-sm">
                    <i className="far fa-times-circle text-red"></i> <span className="font-medium">Unverified</span>
                </p> }
              </div>
            : null }
            <div className="text-xs">
            { contact ? <ContactDisplay noIcons={true} center={true} contact={ contact } /> : null }
            </div>
          </div>
          <div className="text-xs text-center py-4">
            { this.renderApiLink(user) }
          </div>
          <div className="flex leading-normal">
            <div className="flex-1 capitalize text-sm">
              <i className={`${ user.type === 'pilot' ? 'fas fa-plane' : 'far fa-id-badge' } mr-2`} data-fa-transform="rotate--20"></i>{ user.type }</div>
            <div className="flex-1 text-xs text-right">
              <Link
                className="inline-block text-blue-darker border border-blue-darker py-1 px-6 rounded-full"
                to={`/admin/${ user.type }/profile/${ user.id }`}>View</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCard
