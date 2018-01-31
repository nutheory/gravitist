// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { css } from 'aphrodite'
import { splitEvery, where, equals } from 'ramda'
import moment from 'moment'
import UserBadge from '../users/badge'
import jwtDecode from 'jwt-decode'
import PricingPlans from '../../utils/pricing_plans.json'
import OrderOptions from '../../utils/order_dropdowns'
import Address from '../addresses/address_mapper'
import AddressEdit from '../addresses/edit'
import NoteList from '../notes/list'
import UpdateOrder from '../../mutations/update_order'
import StripeLogo from '../../assets/images/powered_by_stripe2x.png'
import frm from './styles/form'
import cE from '../../styles/common_elements'
const linkToReceipt = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }payments/`

type Props = {
  order: Object,
  address: Object,
  updateOrder: Function
}

type State = {
  status: string,
  address1: string | null,
  address2?: string | null,
  city: string | null,
  state: string | null,
  zipCode: string | null,
  lat: string | null,
  lng: string | null,
}

class OrderViewEditForm extends Component<Props, State>{

  updateOrder: Function
  handleReturnedAddress: Function
  handleInputChange: Function

  constructor(props: Object){
    super(props)

    this.state = {
      status: props.order.status,
      address1: props.order.address ? props.order.address.address1 : null,
      address2: props.order.address ? props.order.address.address2 : null,
      city: props.order.address ? props.order.address.city : null,
      state: props.order.address ? props.order.address.state : null,
      zipCode: props.order.address ? props.order.address.zipCode : null,
      lat: props.order.address ? props.order.address.lat : null,
      lng: props.order.address ? props.order.address.lng : null
    }

    this.updateOrder = this.updateOrder.bind(this)
    this.handleReturnedAddress = this.handleReturnedAddress.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleReturnedAddress(state){
    this.setState(state)
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
  }

  async updateOrder(){
    const resolved = this.props.updateOrder({
      id: this.props.order.id,
      authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
      order: {
        status: this.state.status,
      },
      address: {
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode,
        lat: this.state.lat,
        lng: this.state.lng
      }
    }).then(res => console.log('resolved', res))

    console.log('resolved', resolved)
  }

  render(){
    const order = this.props.order
    const plan = PricingPlans.filter(pln => pln.name === this.props.order.plan)[0]
    return(
      <div id={`order_${this.props.order.id}`}>
        <div>
          <div className="columns">
            <div className="column title">{plan.title}</div>
            <div className="column">
              <div className="field">
                <p className="control has-icons-left">
                  <span className="select is-fullwidth is-medium">
                    <select defaultValue={this.state.status} onChange={ this.handleInputChange } name="status">
                      { OrderOptions.statuses.map((oos, i) => <option key={`status_${i}`}  value={oos.value}>{oos.name}</option> )}
                    </select>
                  </span>
                  <span className="icon is-small is-left">
                    <i className="fa fa-tasks"></i>
                  </span>
                </p>
              </div>
            </div>
            <div className="column is-narrow">
              <div>
                <a className={`${css(cE.areaBase)} ${css(cE.greenObj)} ${css(frm.updateButton)}`} onClick={ this.updateOrder }>
                  <i className="fa fa-save" />
                </a>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <UserBadge user={order.agent} flavor="blue" link={true} />
            </div>
            <div className="column">
              <UserBadge user={order.pilot} align="right" flavor="yellow" link={true} />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className={css(frm.receiptLink)}>
                <div className={css(frm.receiptInfo)}>
                  <div className={css(frm.receiptTitle)}>Receipt ID</div>
                  <div className={css(frm.receiptId)}>
                    <a
                      href={`${linkToReceipt}${order.receiptId}`}
                      target="_blank"
                      className={css(frm.receiptIdLink)}>{order.receiptId}</a>
                  </div>
                </div>
                <div className={`${css(frm.receiptIcon)}`}>
                  <img className={`${css(frm.receiptIconInner)}`} src={`/${StripeLogo}`} alt="Powered by Stripe" />
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="title is-5">Address to film</div>
              <AddressEdit address={order.address} returnAddress={ this.handleReturnedAddress } />
            </div>
          </div>
        </div>
        <div>
          <div className={`title is-5 ${css(frm.notesHeader)} `}>Notes on filming</div>
          <div>
            <NoteList
              notes={ order.notes }
              modelId={ order.id }
              model="order"
              placeholderText="Special Instructions. ie. Gate codes, Area to film from"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(UpdateOrder, {
  props: ({ ownProps, mutate }) => ({
    updateOrder: (input) => mutate({
      variables: { input }
    }) })
})(OrderViewEditForm)
