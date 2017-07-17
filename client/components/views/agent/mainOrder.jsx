import React, { Component } from 'react'
import { css } from 'aphrodite'
import _ from 'lodash'
import { graphql } from 'react-apollo'
import Header from '../misc/header'
import Config from '../../../../server/config'
import Formsy from 'formsy-react'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import PlanSummary from './planSummary'
import Signup from './signup'
// import Payment from '../misc/payment'
import AddressMapper from '../misc/addressMapper'
import order from '../../../styles/commonForms'
import cL from '../../../styles/commonLayout'
import Plans from '../../../utils/pricingPlans.json'
import CreateOrderWithUser from '../../../mutations/order'

class MainOrder extends Component {
  constructor(){
    super()
    this.state = {
      addressVerified: false,
      userVerified: false,
      canSubmit: false,
      uType: "agent",
      selectedPlan: "",
      saveCard: false,
      contacts: [],
    }

    this.stripe = Stripe(Config.stripe.publishable_key)
    this.elements = this.stripe.elements()
    this.enableSubmitButton = this.enableSubmitButton.bind(this)
    this.disableSubmitButton = this.disableSubmitButton.bind(this)
    this.isVerified = this.isVerified.bind(this)
    this.checkAddressVerified = this.checkAddressVerified.bind(this)
    this.checkUserVerified = this.checkUserVerified.bind(this)
    this.checkPaymentVerified = this.checkPaymentVerified.bind(this)
    this.setTargetAddress = this.setTargetAddress.bind(this)
    this.setUserInfo = this.setUserInfo.bind(this)
    this.contactsCollection = this.contactsCollection.bind(this)
    this.paymentInfo = this.paymentInfo.bind(this)
    this.handleSaveCardToggle = this.handleSaveCardToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchStripeToken = this.fetchStripeToken.bind(this)
    this.runMutation = this.runMutation.bind(this)
  }

  componentDidMount(){
    this.card = this.elements.create('card')
    console.log(this.props.match)
    const choosenPlan = _.find(Plans, {name: this.props.match.params.plan})
    this.setState({ selectedPlan: choosenPlan }, (res) => {
      this.card.mount('#card-element')
    })
  }

  setTargetAddress(address){
    this.setState({ ...address }, () => {
      this.checkAddressVerified()
    })
  }

  checkAddressVerified(){
    if (this.state.address1 && this.state.city && this.state.state
      && this.state.zip && this.state.lat && this.state.lng){
        this.setState({ addressVerified: true})
      } else {
        this.setState({ addressVerified: false})
      }
  }

  setUserInfo(user){
    this.setState({ ...user }, () => {
      this.checkUserVerified()
    })
  }

  checkUserVerified(){
    if (this.state.name && this.state.email && this.state.password){
      this.setState({ userVerified: true})
    } else {
      this.setState({ userVerified: false})
    }
  }

  paymentInfo(payment){
    this.setState({ ...payment }, () => {
      this.checkPaymentVerified()
    })
  }

  checkPaymentVerified(){
    console.log('state', this.state)
    // if (this.cardName. && this.state.cardNumber && this.state.cardExpires && this.state.cardCvc){
    //     this.setState({ paymentVerified: true})
    //   } else {
    //     this.setState({ paymentVerified: false})
    //   }
  }

  contactsCollection(contacts){
    // this.setState({ ...user }, () => {
    //   console.log('stateUser', this.state)
    // })
  }

  async fetchStripeToken(){
    const result = await this.stripe.createToken(this.card)
    if (result.error) {
      var errorElement = document.getElementById('card-errors')
      errorElement.textContent = token.error.message
    } else {
      this.runMutation(JSON.stringify(result.token))
    }
  }

  async runMutation(paymentToken){
    const resolved = await this.props.createOrderWithUserMutation({ variables: {
      input: {
        stripeInfo: paymentToken,
        saveCard: this.state.saveCard,
        plan: JSON.stringify(this.state.selectedPlan),
        address: {
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
          lat: this.state.lat,
          lng: this.state.lng
        },
        user: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          type: this.state.uType
        }
      }
    }})
    console.log('resolved2', resolved)
  }

  handleSaveCardToggle(evt, isInputChecked){
    this.setState({saveCard: isInputChecked})
  }

  handleSubmit(evt){
    evt.preventDefault()
    this.fetchStripeToken()
  }

  isVerified(verified_state){
    if (verified_state){
      return "verified"
    } else {
      return "not verified"
    }
  }

  enableSubmitButton() {
    this.setState({canSubmit: true})
  }

  disableSubmitButton() {
    this.setState({canSubmit: false})
  }

  render(){
    if (this.state.selectedPlan){
      return (
        <div className={css(cL.centerMainContent)}>
          <Formsy.Form
            onValid={this.enableSubmitButton}
            onInvalid={this.disableSubmitButton}
          >
            <div className={css(order.mainContainer)}>
              <Header title="Lets get started..." />
              <div className={css(order.section)}>
                <h2 className={css(order.sectionHeader)}>Address of Home to Film</h2>
                <AddressMapper setTargetAddress={this.setTargetAddress} />
                {this.isVerified(this.state.addressVerified)}
              </div>
              <div className={css(order.section)}>
                <h2 className={css(order.sectionHeader)}>Signup</h2>
                <Signup setUserInfo={this.setUserInfo} contactsCollection={this.contactsCollection} />
              </div>
              <div className={css(order.section)}>
                <h2 className={css(order.sectionHeader)}>Payment</h2>
                <PlanSummary planSpecifics={this.state.selectedPlan} selected={true} />
                {/* <Payment stripeElements={this.elements} /> */}
                <div id="card-element"></div>
                <div>
                  <Toggle
                    label="Save Card"
                    defaultToggled={this.state.SaveCard}
                    labelPosition="right"
                    onToggle={this.handleSaveCardToggle}
                  />
                </div>
              </div>
              <div className={css(order.footer)}>
                <RaisedButton
                  label="Signup"
                  primary={ true }
                  fullWidth={ true }
                  onClick={this.handleSubmit}
                  // disabled={ !this.state.canSubmit }
                />
              </div>
            </div>
          </Formsy.Form>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default graphql(CreateOrderWithUser, {name: 'createOrderWithUserMutation'})(MainOrder)
