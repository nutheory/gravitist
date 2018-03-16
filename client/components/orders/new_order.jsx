// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
// import PlanSummary from './plan_summary'
// import OrderForm from '../pu/order_signup'
import Config from '../../utils/config'
import AddressMapper from '../addresses/address_mapper'
const env = window.location.host === "homefilming.com" ? "production" : "development"
const publishable_key = Config.stripe[env].publishable_key
// import Plans from '../../utils/pricing_plans.json'

type Props = {
  handleReturnedLocation: Function,
  selectedPlan?: Object
}

type State = {
  paymentVerified: boolean,
  selectedPlan?: Object,
  latLng: Array<string>
}

class Order extends Component<Props, State> {

  card: Function
  stripe: Function
  elements: Function
  handleReturnedLocation: Function
  fetchAssociatedMap: Function

  constructor(props: Object){
    super()

    this.state = {
      paymentVerified: false,
      // selectedPlan: Plans.filter(p => p.name === props.selectedPlan ? p : null)[0],
      latLng: []
    }

    this.stripe = Stripe(publishable_key)
    this.elements = this.stripe.elements()
    this.handleReturnedLocation = this.handleReturnedLocation.bind(this)
    this.fetchAssociatedMap = this.fetchAssociatedMap.bind(this)
  }

  componentDidMount(){
    this.card = this.elements.create('card')
    this.card.mount('#card-element')
    const _this = this
    this.card.addEventListener('change', function(e) {
      if(e.complete){
        _this.setState({ paymentVerified: true })
      } else {
        _this.setState({ paymentVerified: false })
      }
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

    // if ( this.state.selectedPlan && this.state.selectedPlan.name){
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
                <li className="my-3 flex">
                  <span className="block mr-3 pt-1"><i className="far fa-check-circle fa-lg"></i></span>
                  <span className="block text-sm">2 minute aerial video showcasing the property.</span>
                </li>
                <li className="my-3 flex">
                  <span className="block mr-3"><i className="far fa-check-circle fa-lg"></i></span>
                  <span className="block text-sm pt-1">20 Photos of the property.</span>
                </li>
                <li className="my-3 flex">
                  <span className="block mr-3 pt-1"><i className="far fa-check-circle fa-lg"></i></span>
                  <span className="block text-sm">Lead capturing tool for sharing on social media.</span>
                </li>
              </ul>
              <p className="text-sm">... And of course, its all branded to YOU.</p>
            </div>
            <div className="w-3/5 ml-4 pt-4">
              <div className="signup-map-area rounded" id='mapArea'></div>
            </div>
          </div>
          <div className="my-4">
            <div className="text-sm font-bold">Payment</div>
            <div id="card-element" className="input"></div>
          </div>
        </div>
      )
    // } else { return (<div></div>) }
  }
}

export default Order
