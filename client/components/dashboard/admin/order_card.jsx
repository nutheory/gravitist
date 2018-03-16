// @flow
import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import Avatar from '../../assets/avatar'
import { humanize, dateTimeShort } from '../../../utils/helpers'
import crd from '../styles/order_card'
const linkToApiReceipt = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }payments/`

type Props = {
  order: Object,
  cssSizing?: string
}

type State = {

}

class OrderCard extends Component<Props, State>{

  constructor(){
    super()
  }

  render(){
    const cssSizing = this.props.cssSizing || "w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    const order = this.props.order
    return (
      <div className={`${ cssSizing } px-4 pb-6`}>
        <div className="bg-white rounded shadow p-4">
          <div className="py-4">
            <p className="text-center font-medium">{ humanize(order.status) }</p>
            <p className="text-center text-xs">{ dateTimeShort(order.createdAt) }</p>
          </div>
          <div className="">
            <div className="text-center font-medium">{ order.address.address1 }</div>
            <div className="text-center text-sm">{`${order.address.city}, ${order.address.state} ${order.address.zipCode}`}</div>
          </div>
          <div className="py-4 overflow-auto">
            <div className="flex py-2">
              <div className="mr-2">
                <Avatar
                  src={ order.agent.avatar ? order.agent.avatar.url : null}
                  size={`medium`} />
              </div>
              <div className="">
                <p className="text-right">{ order.agent.name }</p>
                <p className="text-xs uppercase text-right">Agent</p>
              </div>
            </div>
            <div className="flex float-right py-2">
              <div className="">
                <p className="text-right">{ order.pilot ? order.pilot.name : 'Recruiting now' }</p>
                <p className="text-xs uppercase">Pilot</p>
              </div>
              <div className="ml-2">
                { order.pilot ?
                  <Avatar
                    src={ order.pilot.avatar ? order.pilot.avatar.url : null}
                    size={`medium`} />
                : <i className="text-grey-light far fa-question-circle fa-3x"></i> }
              </div>
            </div>
          </div>
          <div className="text-center text-xs py-4">
            <a href={`${ linkToApiReceipt }${ order.receiptId }`} target="_blank">{ order.receiptId }</a>
          </div>
          <div className="flex leading-normal">
            <div className=" flex-1 text-xs text-right">
              <Link
                className="inline-block text-blue-darker border border-blue-darker py-1 px-6 rounded-full"
                to={`/admin/order/${ order.id }`}>View</Link>
            </div>
          </div>
        </div>
      </div>

      // <div className="column is-one-third">
      //   <div className={`card ${css(crd.card)}`}>
      //     <div className={`card-content`}>
      //       <div className={`${css(crd.header)}`}>
      //         <div className={`title is-4 ${css(crd.planTitle)}`}>{ order.plan }</div>
      //         <div className={`${css(crd.planTitle)}`}></div>
      //       </div>
      //       <div className="columns">
      //         <div className={`${css(crd.status)} column`}>
      //           <div className={`${css(crd.smallUppercase)}`}>status</div>
      //           <div className={`${css(crd.statusText)}`}>{ order.status }</div>
      //         </div>
      //         <div className={`${css(crd.created)} column`}>
      //           <div className={`${css(crd.createdTitle)}`}>created</div>
      //           <div className={`${css(crd.rightText)}`}>{ Moment(Date.parse(order.createdAt)).format('MMM Do YYYY, h:mma') }</div>
      //         </div>
      //       </div>
      //       <div className={`columns`}>
      //         <div className={`${css(crd.user)} column`}>
      //           <div className={`columns`}>
      //             <div className={`${css(crd.avatar)} column is-narrow`}>
      //               <Avatar
      //                 src={ order.agent.avatar ? order.agent.avatar.url : null}
      //                 size={`medium`} />
      //             </div>
      //             <div className={`column ${css(crd.agent)} ${css(crd.removeLeftPadding)}`}>
      //               <div className={`${css(crd.smallUppercase)}`}>{ order.agent.type }</div>
      //               <div className={`${css(crd.nameText)}`}>{ order.agent.name }</div>
      //             </div>
      //           </div>
      //         </div>
      //         { order.pilot ?
      //           <div className={`${css(crd.user)} column`}>
      //             <div className={`columns`}>
      //               <div className={`column ${css(crd.agent)} ${css(crd.removeRightPadding)}`}>
      //                 <div className={`${css(crd.smallUppercaseRight)}`}>{ order.pilot.type }</div>
      //                 <div className={`${css(crd.rightText)}`}>{ order.pilot.name }</div>
      //               </div>
      //               <div className={`${css(crd.avatar)} column is-narrow`}>
      //                 <Avatar
      //                   src={ order.pilot.avatar ? order.pilot.avatar.url : null}
      //                   size={`medium`} />
      //               </div>
      //             </div>
      //           </div>
      //         : null }
      //       </div>
      //       <div className={`columns`}>
      //         <div className={`${css(crd.addressIcon)} column is-narrow`}><i className="fa fa-home fa-3x" /></div>
      //         <div className={`${css(crd.addressText)} column ${css(crd.removeLeftPadding)}`}>
      //           <div className={`title is-5 ${css(crd.address)}`}>{ order.address.address1 }</div>
      //           <div className={`${css(crd.smallUppercase)}`}>{`${order.address.city}, ${order.address.state} ${order.address.zipCode}`}</div>
      //         </div>
      //       </div>
      //     </div>
      //     <footer className={`${css(crd.cardFooter)}`}>
      //       <div className={`${css(crd.cardFooterItemLeft)}`}>
      //         <div className={`${css(crd.smallUppercase)}`}>Receipt ID</div>
      //         <div className={`${css(crd.smallUppercase)}`}>{ order.receiptId }</div>
      //       </div>
      //       <Link className={`${css(crd.cardFooterItemRight)}`} to={`/admin/order/${ order.id }`}>View</Link>
      //     </footer>
      //   </div>
      // </div>
    )
  }
}

export default OrderCard
