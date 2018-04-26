// @flow
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import NewOrder from '../../orders/new_order'
import CreateOrder from '../../../mutations/create_order'
import Config from '../../../utils/config'
import Plans from '../../../utils/pricing_plans.json'
let env = ''
if(window.location.host.includes("homefilming.com")){
  env = "production"
} else if(window.location.host.includes("herokuapp.com")){
  env = "staging"
} else {
  env = "development"
}
const publishable_key = Config.stripe[env].publishable_key

type Props = {
  match: Object,
  history: Object,
  submitOrder: Function
}

type State = {
  paymentVerified: boolean,
  addressVerified: boolean,
  loading: boolean,
  discountId?: number | null,
  amountPaid?: string,
  selectedPlan: Object,
  price?: string,
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  zip?: string,
  lat?: string,
  lng?: string,
  errors: Array<String>
}

class Reorder extends Component<Props, State> {

  card: Function
  stripe: Function
  elements: Function
  handleReturnedLocation: Function
  handleReturnedPayment: Function
  handleGQLErrors: Function
  submitOrder: Function

  constructor(props: Object){
    super(props)

    this.state ={
      paymentVerified: false,
      addressVerified: false,
      selectedPlan: Plans.filter(p => p.name === props.match.params.plan ? p : null)[0],
      price: Plans.filter(p => p.name === props.match.params.plan ? p : null)[0].price,
      amountPaid: Plans.filter(p => p.name === props.match.params.plan ? p : null)[0].actualPrice,
      loading: false,
      errors: []
    }

    this.stripe = Stripe(publishable_key)
    this.elements = this.stripe.elements()
    this.handleReturnedLocation = this.handleReturnedLocation.bind(this)
    this.handleReturnedPayment = this.handleReturnedPayment.bind(this)
    this.handleGQLErrors = this.handleGQLErrors.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
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

  handleGQLErrors(err){
    err.graphQLErrors.map(error => {
      this.setState((prevState) => ({ errors: prevState.errors.concat(error.message) }))
    })
  }

  handleReturnedLocation({ address1, address2, city, state, zip, lat, lng }: Object){
    if (address1 && city && state && zip && lat && lng){
      this.setState({ address1, address2, city, state, zip, lat, lng, addressVerified: true })
    }
  }

  handleReturnedPayment({ discountId, discountedActualPrice, discountedPrice }){
    if (discountId){
      this.setState({ discountId, amountPaid: discountedActualPrice, price: discountedPrice })
    } else {
      this.setState({
        price: Plans.filter(p => p.name === this.props.match.params.plan ? p : null)[0].price,
        amountPaid: Plans.filter(p => p.name === this.props.match.params.plan ? p : null)[0].actualPrice,
        discountId: null
      })
    }
  }

  submitOrder(plan){
    if(plan && this.state.addressVerified){
      this.setState({ loading: !this.state.loading }, async () => {
        const resolved = await this.props.submitOrder({ plan, state: this.state }).catch(err => {
          this.handleGQLErrors(err)
        })
        const { data: { createOrder: { order } } } = resolved
        console.log('new order', order)
        this.props.history.push(`/orders/${order.id}`)
      })
    }
  }

  render(){
    return(
      <div className="flex justify-center">
        <div className="w-full lg:w-1/2">
          <div className="font-bold text-xl my-2">Order a new filming</div>
          <div className="bg-white rounded shadow">
            <div className="p-6">
              <NewOrder
                handleReturnedLocation={ this.handleReturnedLocation }
                handleReturnedPayment={ this.handleReturnedPayment }
                plan={ this.state.selectedPlan }
                price={ this.state.price }
                actualPrice={ this.state.amountPaid } />
              <div className="">
                <button onClick={ this.submitOrder } className="button-green">
                  <span className="action-button-overlay"></span>Order now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(CreateOrder, {
    props: ({ ownProps, mutate }) => ({
      submitOrder: ({ state, plan }) => mutate({ variables: {
        input: {
          order: {
            status: "pending",
            amountPaid: state.amountPaid,
            discountId: state.discountId,
            plan: {
              id: state.selectedPlan.planId,
              name: state.selectedPlan.name,
              actualPrice: state.selectedPlan.actualPrice,
            },
            address: {
              address1: state.address1,
              address2: state.address2,
              city: state.city,
              state: state.state,
              zipCode: state.zip,
              lat: state.lat,
              lng: state.lng
            } }} } }) })
})(Reorder)
