// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { css } from 'aphrodite'
import { Link } from 'react-router-dom'
import { splitEvery, where, equals } from 'ramda'
import { dateShort } from '../../utils/helpers'
import UserBadge from '../users/badge'
import jwtDecode from 'jwt-decode'
import PricingPlans from '../../utils/pricing_plans.json'
import OrderOptions from '../../utils/order_dropdowns'
import Address from '../addresses/address_mapper'
import TransferReceipt from './transfer_receipt'
import CollectedContacts from './collected_contacts'
import ShareAsset from '../assets/asset_wrapper'
import AddressEdit from '../addresses/edit'
import NoteList from '../notes/list'
import OrderQuery from '../../queries/get_order'
import UpdateOrder from '../../mutations/update_order'
import StripeLogo from '../../assets/images/powered_by_stripe2x.png'
const linkToReceipt = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }payments/`

type Props = {
  order: Object,
  updateOrder: Function
}

type State = {
  status: string,
}

class OrderViewEditForm extends Component<Props, State>{

  updateOrder: Function
  handleInputChange: Function

  constructor(props: Object){
    super(props)

    this.state = {
      status: props.order.status,
    }

    this.updateOrder = this.updateOrder.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){

    this.setState({ [e.currentTarget.name]: e.currentTarget.value }, async function(){
       const resolved = await this.updateOrder()
       console.log('resolved', this.state)
       console.log('resolved', resolved)
    })
  }

  updateOrder(){
    return this.props.updateOrder({
      id: this.props.order.id,
      authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
      order: {
        status: this.state.status,
      }
    }).then(res => res)
  }

  render(){
    const order = this.props.order
    console.log('pollingCheckForm', order.status)
    const plan = PricingPlans.filter(pln => pln.name === this.props.order.plan)[0]
    return(
      <div>
        <div className="flex pb-4">
          <div className="flex justify-end items-end"><i className="fas fa-chevron-left"></i><Link to="/admin/orders" className="inline-block pl-2" style={{ lineHeight: '1.1rem' }}>Back to orders</Link></div>
          <div className="flex-1 text-right text-xl font-bold">Order - {this.props.order.uuid}</div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div id={`order_${ order.id }`} className="w-full">
            <div className="w-full flex">
              <div className="flex-1 pt-4">
                <p className="text-xl font-bold">{ order.address.address1 } { order.address.address2 ? `, ${ order.address.address2 }` : null }</p>
                <p className="text-sm">{ order.address.city }{ order.address.state ? `, ${ order.address.state }`: null } { order.address.zipCode }</p>
              </div>
              <div className="ml-4">
                <label className="block text-right text-sm">Status</label>
                <div className="inline-block relative">
                  <select value={ order.status } onChange={ this.handleInputChange } name="status">
                    { OrderOptions.statuses.map((oos, i) => <option key={`status_${i}`} value={oos.value}>{oos.name}</option> )}
                  </select>
                  <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
            { order.status === "approved_completed" ?
              <div className="my-6"><TransferReceipt order={ order } /></div>
            : null }
            <div className="my-8">
              <div className="rounded-lg border border-grey-light bg-grey-lighter p-4">
                <NoteList
                  modelId={ order.id }
                  model="order"
                  title="Add a note about this filming"
                  placeholderText="Special Instructions. ie. Gate codes, Area to film from"
                />
              </div>
            </div>
            <div className="flex my-8">
              <div className="flex-1">
                <UserBadge user={order.agent} link={true} />
              </div>
              <div className="flex-1">
                { order.pilot ? <UserBadge user={ order.pilot } align="right" link={true} /> : null }
              </div>
            </div>
            <div className="flex">
              <div className="flex-1 mr-4">
                <div className="text-sm">Receipt ID</div>
                <div className="">
                  <a href={`${linkToReceipt}${order.receiptId}`}
                    target="_blank"
                    className="">{order.receiptId}</a>
                </div>
              </div>
              <div className="">
                <div className="text-right text-sm">Created</div>
                <div className="">{ dateShort(order.createdAt) }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div id={`order_${this.props.order.id}`}>
      //   <div>
      //     <div className="columns">
      //       <div className="column title">{plan.title}</div>
      //       <div className="column">
      //         <div className="field">
      //           <p className="control has-icons-left">
      //             <span className="select is-fullwidth is-medium">
      //               <select defaultValue={this.state.status} onChange={ this.handleInputChange } name="status">
      //                 { OrderOptions.statuses.map((oos, i) => <option key={`status_${i}`}  value={oos.value}>{oos.name}</option> )}
      //               </select>
      //             </span>
      //             <span className="icon is-small is-left">
      //               <i className="fa fa-tasks"></i>
      //             </span>
      //           </p>
      //         </div>
      //       </div>
      //       <div className="column is-narrow">
      //         <div>
      //           <a className={`${css(cE.areaBase)} ${css(cE.greenObj)} ${css(frm.updateButton)}`} onClick={ this.updateOrder }>
      //             <i className="far fa-save" />
      //           </a>
      //         </div>
      //       </div>
      //     </div>
      //     <div className={`columns`}>
      //       <div className={`${css(views.addressHeader)} column`}>
      //         <div className={`${css(views.addressOneTwoHeader)}`}>
      //           { order.address.address1 } { order.address.address2 ? `, ${ order.address.address2 }` : null }
      //         </div>
      //         <div className={`${css(views.cityStateZip)}`}>
      //           { order.address.city }{ order.address.state ? `, ${ order.address.state }`: null } { order.address.zipCode }
      //         </div>
      //       </div>
      //       <div className="column is-narrow">
      //         <div className={css(views.smallTitle)}>Created</div>
      //         <div className={`${css(views.dateHeader)}`}>{ Moment(Date.parse(order.createdAt)).format('MMM Do YYYY') }</div>
      //       </div>
      //     </div>
      //     <div className="columns">
      //       <div className="column">
      //         <UserBadge user={order.agent} flavor="blue" link={true} />
      //       </div>
      //       <div className="column">
      //         { order.pilot ? <UserBadge user={order.pilot} align="right" flavor="yellow" link={true} /> : null }
      //       </div>
      //     </div>
      //     <div className="columns">
      //       <div className="column">
      //         <div className={css(frm.receiptLink)}>
      //           <div className={css(frm.receiptInfo)}>
      //             <div className={css(frm.receiptTitle)}>Receipt ID</div>
      //             <div className={``}>
      //               <a href={`${linkToReceipt}${order.receiptId}`}
      //                 target="_blank"
      //                 className={css(frm.receiptIdLink)}>{order.receiptId}</a>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   {order.status === 'approved_completed' ?
      //     <div>
      //       <TransferReceipt order={ order } />
      //       <CollectedContacts contacts={ order.contacts } />
      //     </div>
      //     : <div>
      //       <div className={`title is-5 ${css(frm.notesHeader)} `}>Notes on filming</div>
      //       <div>
      //         <NoteList
      //           notes={ order.notes }
      //           modelId={ order.id }
      //           model="order"
      //           placeholderText="Special Instructions. ie. Gate codes, Area to film from"
      //         />
      //       </div>
      //     </div> }
      // </div>
    )
  }
}

export default graphql(UpdateOrder, {
  props: ({ ownProps, mutate }) => ({
    updateOrder: (input) => mutate({
      variables: { input },
      refetchQueries: [{
        query: OrderQuery,
        variables: { input: {
          id: ownProps.order.id,
          authorizedId: ownProps.order.pilot.id } } }]
    }) })
})(OrderViewEditForm)
