// @flow
import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { find, propEq } from 'ramda'
import { css } from 'aphrodite'
import Avatar from '../../assets/avatar'
import ContactDisplay from '../../contacts/display'
import crd from '../styles/user_card'
import cE from '../../../styles/common_elements'
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
        <div className="rounded shadow px-4 py-3">
          <div className="py-4  w-20 mx-auto">
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
          <div className="flex">
            <div className="flex-1 capitalize text-sm">
              <i className={`${ user.type === 'pilot' ? 'fas fa-plane' : 'far fa-id-badge' } mr-2`} data-fa-transform="rotate--20"></i>{ user.type }</div>
            <div className=" flex-1 text-xs text-right">
              <Link
                className="text-blue-darker border border-blue-darker py-1 px-6 rounded-full"
                to={`/admin/${ user.type }/profile/${ user.id }`}>View</Link>
            </div>
          </div>
        </div>
      </div>
      // <div className="column is-one-third">
      //   <div className={`card ${css(crd.card)}`}>
      //     <div className="card-content">
      //       <div className="media">
      //         <div className="media-left">
      //           <Avatar size="large" src={ user.avatars.length > 0 ? user.avatars[0].url : null } />
      //         </div>
      //         <div className="media-content">
      //           <p className="title is-4 text-white">boo{user.name}</p>
      //           <div className="subtitle is-6">
      //             { user.contacts.length > 0 ? <ContactDisplay size="small" contact={user.contacts[0]} /> : null }
      //           </div>
      //         </div>
      //       </div>
      //
      //       <div className="content">
      //         <div className={css(crd.cardVitals)}>
      //           { user.type === "pilot" ? <div className={`tag is-info ${css(crd.flyRadius)}`}>{ user.workRadius }m</div> : null }
      //           <div className={css(crd.typeIcon)}>
      //             { user.type === "agent" ? <i className={`fa fa-user fa-3x`} /> : null }
      //             { user.type === "pilot" ? <i className={`fa fa-plane fa-3x`} /> : null }
      //             { user.type === "admin" ? <i className={`fa fa-wrench fa-3x`} /> : null }
      //           </div>
      //           <div className={css(crd.apiInfo)}>
      //             <div className={css(crd.apiIdName)}>
      //               { user.type === "agent" ? 'Customer ID' : null }
      //               { user.type === "pilot" ? 'Account ID' : null }
      //               { user.type === "admin" ? 'ID' : null }
      //             </div>
      //             <div className={css(crd.apiId)}>
      //               { this.renderApiLink(user) }
      //             </div>
      //           </div>
      //         </div>
      //         { user.type === "pilot" ?
      //           <div className="columns">
      //             <div className="column">
      //               { user.isVerified ? <div className={`${css(cE.validBackground, cE.validContainer)}`}>
      //                 <i className={`fas fa-check ${css(cE.validForeground)}`} />Verified</div>
      //               : <div className={`${css(cE.invalidBackground, cE.invalidContainer)}`}>
      //                 <i className={`fas fa-check ${css(cE.invalidForeground)}`} />Verified</div> }
      //             </div>
      //             <div className="column">
      //               { user.termsAccepted ? <div className={`${css(cE.validBackground, cE.validContainer)}`}>
      //                 <i className={`fas fa-check ${css(cE.validForeground)}`} />Terms</div>
      //               : <div className={`${css(cE.invalidBackground, cE.invalidContainer)}`}>
      //                 <i className={`fas fa-check ${css(cE.invalidForeground)}`} />Terms</div> }
      //             </div>
      //           </div>
      //         : null }
      //         <div className="title is-6">
      //           <i className={`far fa-envelope ${css(cE.iconSpace)}`} />{this.props.user.email}
      //         </div>
      //       </div>
      //     </div>
      //     <footer className="card-footer">
      //       <a className={`card-footer-item ${css(crd.footerButton)}`} href={`mailto:${this.props.user.email}`}>Email</a>
      //       <Link
      //         className={`card-footer-item ${css(crd.footerButton)}`}
      //         to={`/admin/${ user.type }/profile/${ user.id }`}>View</Link>
      //     </footer>
      //   </div>
      // </div>
    )
  }
}

export default UserCard
