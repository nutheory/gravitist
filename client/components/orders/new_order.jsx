// @flow
import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import Moment from 'moment'
import { calcPercentageDiscount, calcNumberDiscount } from '../../utils/helpers'
import AddressMapper from '../addresses/address_mapper'
import ApplyDiscount from '../../queries/apply_discount'

type Props = {
  handleReturnedLocation: Function,
  handleReturnedPayment: Function,
  plan: Object,
  price?: string,
  actualPrice?: string,
}

type State = {
  discountErrors: Array<string>,
  discount?: Object,
  checking: boolean,
  latLng: Array<string>
}

class Order extends Component<Props, State> {

  validateDiscount: Function
  handleReturnedLocation: Function
  checkDiscountCode: Function
  fetchAssociatedMap: Function

  constructor(props: Object){
    super()

    this.state = {
      planName: props.plan.name,
      planPrice: props.actualPrice,
      checking: false,
      latLng: [],
      discountErrors: []
    }

    this.handleReturnedLocation = this.handleReturnedLocation.bind(this)
    this.validateDiscount = this.validateDiscount.bind(this)
    this.checkDiscountCode = this.checkDiscountCode.bind(this)
    this.fetchAssociatedMap = this.fetchAssociatedMap.bind(this)
  }

  componentDidMount(){
  }

  validateDiscount(discount: Object){
    if(discount.appliesTo && discount.appliesTo !== 'all'){
      this.state.planName !== discount.appliesTo ? this.setState(prevState => ({ discountErrors: prevState.discountErrors.concat("Discount does not apply.") })) : null
    }
    if(discount.maxUsageCount){
      discount.usageCount >= discount.maxUsageCount ? this.setState(prevState => ({ discountErrors: prevState.discountErrors.concat("Discount eligibilty has ended.") })) : null
    }
    if(discount.endAt && discount.startsAt){
      Moment().isBetween(discount.startsAt, discount.endAt) ? this.setState(prevState => ({ discountErrors: prevState.discountErrors.concat("Discount invalid.") })) : null
    }
    if( this.state.discountErrors.length > 0 ){ return false }
    return true
  }

  checkDiscountCode(client: Object, e: SyntheticInputEvent<HTMLInputElement>){
    const val = e.currentTarget.value
    this.setState({ checking: true, discountErrors: [] }, async function(){
      const { data: { applyDiscount } } = await client.query({
        query: ApplyDiscount,
        variables: { input: { code: val }}
      })
      if(applyDiscount.discount){
        console.log('applyDiscount.discount', applyDiscount.discount)
        const valid = this.validateDiscount(applyDiscount.discount)
        if(valid){
          const updatedPrice = applyDiscount.discount.amount.includes('%') ? calcPercentageDiscount({
            base: this.state.planPrice, percent: applyDiscount.discount.amount
          }) : calcNumberDiscount({
            base: this.state.planPrice, number: applyDiscount.discount.amount
          })
          this.props.handleReturnedPayment({
            discountId: applyDiscount.discount.id,
            discountedActualPrice: updatedPrice,
            discountedPrice: updatedPrice.slice(0, updatedPrice.length - 2) +
              '.' + updatedPrice.slice(updatedPrice.length - 2, updatedPrice.length) })
        }
      } else {
        this.props.handleReturnedPayment({ discountedActualPrice: null, discountedPrice: null, discountId: null })
      }
      console.log('err', this.state.discountErrors)
      this.setState({ checking: false, discount: applyDiscount.discount ? applyDiscount.discount :null })
    })
  }

  async fetchAssociatedMap(){
    if(this.state.latLng.length > 0){
      const mapOptions = {
        center: {
          lat: this.state.latLng[0],
          lng: this.state.latLng[1]
        },
        zoom: 20,
        mapTypeId: 'satellite',
        scrollwheel: false
      }
      const map = await new google.maps.Map(document.getElementById('mapArea'), mapOptions)
    }
  }

  handleReturnedLocation({ address1, address2, city, state, zip, lat, lng }: Object){
    this.setState({ latLng: [lat, lng] }, function(){
      this.fetchAssociatedMap()
      this.props.handleReturnedLocation({ address1, address2, city, state, zip, lat, lng })
    })
  }

  render(){

    return (
      <div>
        <div>
          <div className="text-sm font-bold">Address to film</div>
          <AddressMapper handleReturnedLocation={ this.handleReturnedLocation } />
        </div>
        <div className="flex">
          <div className="w-2/5 pt-4">
            <p className="text-sm font-bold">Your order includes...</p>
            <ul className="my-2">
              { this.props.plan.features.map((feat, i) => (
                <li key={`feature_${i}`} className="my-3 flex">
                  <span className="block mr-3 pt-1"><i className="far fa-check-circle fa-lg"></i></span>
                  <span className="block text-sm">{ feat.desc }</span>
                </li>
              )) }
            </ul>
          </div>
          <div className="w-3/5 ml-4 pt-4">
            <div className="signup-map-area rounded" id='mapArea'></div>
          </div>
        </div>
        <div className="my-4 flex">
          <div className="w-1/2">
            <ApolloConsumer>
              {client => (
                <div>
                  <div className="text-sm font-bold">Do you have a discount code?</div>
                  <input
                    type="text"
                    placeholder="Discount code"
                    name="discountCode"
                    onChange={(e) => this.checkDiscountCode(client, e)}
                    className="input" />
                </div>
              )}
            </ApolloConsumer>
          </div>
          <div className="w-1/2 flex ">
            <div className="flex-1 flex items-end pl-4">
              { this.state.discountErrors.length > 0 ?
                 this.state.discountErrors.map( (err, i) => (
                   <p className="text-sm text-red" key={`err_${i}`}>{ err }</p>
                 ))
                : `${this.state.discount ? this.state.discount.amount : ''} ${this.state.discount ? ' off' : '' }`
              }
            </div>
            <div className="flex text-xl font-bold items-end">
              <span className="inline-block mb-2 mr-1 text-sm">$</span>{ this.props.price }
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="text-sm font-bold">Payment</div>
          <div id="card-element" className="input"></div>
        </div>
      </div>
    )
  }
}

export default Order
