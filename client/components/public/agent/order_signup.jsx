// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { pick, pathOr } from 'ramda'
import { isValidEmail, isValidName, isValidPassword } from '../../../utils/validators'
import Loading from '../../misc/loader'
import Config from '../../../utils/config'
import ContactList from '../../contacts/list'
import NewOrder from '../../orders/new_order'
import DragDropUploader from '../../assets/drag_drop_uploader'
import CreateOrderWithUser from '../../../mutations/create_order_user'
import jwtDecode from 'jwt-decode'
import Plans from '../../../utils/pricing_plans.json'
const env = window.location.host.includes("homefilming.com") ? "production" : "development"
const publishable_key = Config.stripe[env].publishable_key

type Props = {
  submitOrder: Function,
  history: Object,
  match: Object
}

type State = {
  addressVerified: boolean,
  userVerified: boolean,
  contactsVerified: boolean,
  paymentVerified: boolean,
  selectedPlan: Object,
  amountPaid?: string,
  price?: string,
  loading: boolean,
  userType: 'agent' | 'pilot' | 'admin',
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  zip?: string,
  lat?: string,
  lng?: string,
  name?: string,
  email?: string,
  password?: string,
  discountId?: number | null,
  avatar: Object,
  contacts: Array<Object>,
  errors: Array<Object>
}

class OrderForm extends Component<Props, State> {

  card: Function
  stripe: Function
  elements: Function
  handleReturnedLocation: Function
  handleReturnedPayment: Function
  handleInputChange: Function
  handleReturnedContacts: Function
  handleReturnedPayment: Function
  renderValidated: Function
  fetchStripeToken: Function
  returnUploadInstance: Function
  runMutation: Function
  allCriteriaVerified: Function
  handleSubmit: Function

  constructor(props: Object){
    super()
    this.state = {
      addressVerified: false,
      userVerified: false,
      contactsVerified: false,
      paymentVerified: false,
      avatarVerified: false,
      selectedPlan: Plans.filter(p => p.name === props.match.params.plan ? p : null)[0],
      price: Plans.filter(p => p.name === props.match.params.plan ? p : null)[0].price,
      amountPaid: Plans.filter(p => p.name === props.match.params.plan ? p : null)[0].actualPrice,
      loading: false,
      userType: "agent",
      avatar: {},
      contacts: [],
      errors: []
    }

    this.stripe = Stripe(publishable_key)
    this.elements = this.stripe.elements()
    this.handleReturnedLocation = this.handleReturnedLocation.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleReturnedContacts = this.handleReturnedContacts.bind(this)
    this.handleReturnedPayment = this.handleReturnedPayment.bind(this)
    this.renderValidated = this.renderValidated.bind(this)
    this.fetchStripeToken = this.fetchStripeToken.bind(this)
    this.returnUploadInstance = this.returnUploadInstance.bind(this)
    this.runMutation = this.runMutation.bind(this)
    this.allCriteriaVerified = this.allCriteriaVerified.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  renderValidated(){
    return (<span
        style={{opacity: `${ this.state.userVerified ? 1 : 0 }` }}>
        <i className="fas fa-check"></i></span>)
  }

  handleReturnedLocation({ address1, address2, city, state, zip, lat, lng }){
    if (address1 && city && state && zip && lat && lng){
      this.setState({ address1, address2, city, state, zip, lat, lng, addressVerified: true })
    }
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value }, () => {
      this.checkUserVerified()
    })
  }

  handleReturnedContacts(contacts){
    this.setState({ contacts, contactsVerified: contacts.length > 0 })
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


  checkUserVerified(){
    if (isValidName(this.state.name) &&
      isValidEmail(this.state.email) &&
      isValidPassword(this.state.password) &&
      this.state.confirmPassword === this.state.password){
        this.setState({ userVerified: true })
      } else {
        this.setState({ userVerified: false })
      }
  }

  allCriteriaVerified(){
    return this.state.addressVerified &&
    this.state.userVerified &&
    this.state.contactsVerified &&
    this.state.paymentVerified ? true : false
  }

  returnUploadInstance(avatar){
    this.setState({ avatar })
  }

  submitErrorCheck(){
    if( this.allCriteriaVerified() ){
      return true
    } else {
      if(!this.state.addressVerified) { this.setState((prevState) => ({ errors: prevState.errors.concat(
        { type: "address", section: "Address", message: "Please choose a address option from the dropdown list." }) })) }
      if(!this.state.userVerified) { this.setState((prevState) => ({ errors: prevState.errors.concat(
        { type: "user", section: "User info", message: "Please make sure all your user fields are valid." }) })) }
      if(!this.state.contactsVerified) { this.setState((prevState) => ({ errors: prevState.errors.concat(
        { type: "contacts", section: "Contacts", message: "Please add at least one valid point of contact." }) })) }
    }
  }

  handleGQLErrors(err){
    err.graphQLErrors.map((error) => {
      if(error.message === "UniqueEmailError" || error.name === "Constraint") {
        this.setState((prevState) => ({ errors: prevState.errors.concat(
          { type: "email", section: "Email address is taken",
            message: "The email address you entered is already in use. Would you like to login?" }) }) )
      } else if(error.message === "RequiredFieldError") {
        this.setState((prevState) => ({ errors: prevState.errors.concat(
          { type: "user", section: "Missing Required Field",
            message: "Please check all your info." }) }) )
      }
    })
  }

  renderErrors(){
    return (
      <div className={`error-area hide-error ${ this.state.errors.length > 0 ? ' show-error' : ''}`}>
        <h2 className="text-base font-bold">Please correct these errors</h2>
        { this.state.errors.map((err, i) => (
          <div key={`error_${i}`} className="mt-4">
            <h3 className="text-sm font-bold">{err.section}</h3>
            <p className="text-sm mt-1">{err.message}</p>
            { err.type === "email" ?
            <Link to="/login" className="button-blue w-1/4 mt-2">
              <span className="action-button-overlay"></span>Login
            </Link> : null }
          </div>
        ))}
      </div>
    )
  }

  renderButtonText(){
    if( this.allCriteriaVerified() && this.state.avatar.plugins ){ return "Submit Order"
    } else if ( this.allCriteriaVerified() ) { return "Don't forget your avatar..."
    } else { return "Please enter required info..." }
  }

  async fetchStripeToken(){
    const result = await this.stripe.createToken(this.card)
    if (result.error) {
      const errors = Object.assign(result.error, { section: "Payment" })
      this.setState((prevState) => ({ errors: prevState.errors.concat(errors) }))
    } else {
      return JSON.stringify(result.token)
    }
  }

  runMutation(token){
    this.setState({ loading: !this.state.loading }, async () => {
      const contacts = this.state.contacts.map(c => pick(['type', 'content', 'status', 'default'], c))
      const resolved = await this.props.submitOrder({ contacts, token, state: this.state }).catch(err => {
        this.handleGQLErrors(err)
      })
      const { data: { createOrderWithUser: { order, auth } } } = resolved
      localStorage.setItem('hf_auth_header_token', auth.token)
      if(this.state.avatar.plugins){
        this.state.avatar.setMeta({uploadToId: order.agentId})
        this.state.avatar.plugins.uploader[0].opts.headers.authorization = auth.token
        const res = await this.state.avatar.upload()
        if(res.successful.length > 0){ this.setState({ loading: !this.state.loading })
        } else {  }
      } else {
        this.setState({ loading: !this.state.loading })
      }
        const { history } = this.props
        history.push('/dashboard')
    })
  }

  async handleSubmit(e){
    if(this.state.errors.length > 0) { this.setState({ errors: [] }) }
    const token = await this.fetchStripeToken()
    if(this.submitErrorCheck()) { this.runMutation(token) } else { return false }
  }

  render(){
    return (
      <div className="signup-container">
        { this.state.loading ? <Loading /> : null }
        <div className="w-full rounded shadow p-6 border border-grey-dark">
          <div className="signup-header">
            <div className="w-48 h-48">
              <DragDropUploader
                header="Upload avatar"
                circle={true}
                fileTypeName="photo"
                source="MainOrder-Avatar"
                fieldname="avatar"
                mimes="images"
                endpoint="/uploads/avatar"
                returnUploadInstance={ this.returnUploadInstance }
              />
            </div>
            <div className="flex-1 -mr-6">
              <div className="">
                <h2 className="text-right py-1"><Link className="no-underline" to="/">Homefilming</Link></h2>
                <div className="text-right text-sm font-bold">Create Order</div>
              </div>
              <div className="px-6 pt-8 pb-2">
                <div className="mb-4">
                  <div className="text-sm font-bold mt-4">Full name</div>
                  <p className="text-xs mt-1 mb-2">This is how your name will appear in all
                    images/video watermarking</p>
                  <input
                    onChange={this.handleInputChange}
                    className="input"
                    name="name"
                    type="text"
                    placeholder="Full Name" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b">
            <div className="mb-4">
              <div className="text-xs">Email address</div>
              <input
                onChange={this.handleInputChange}
                className="input"
                name="email"
                type="text"
                placeholder="Email address" />
            </div>
            <div className="flex mb-4 -mx-2">
              <div className="flex-1 mx-2">
                <div className="text-xs">Create password</div>
                <input
                  onChange={this.handleInputChange}
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Create password" />
              </div>
              <div className="flex-1 mx-2">
                <div className="text-xs">Confirm password</div>
                <input
                  onChange={this.handleInputChange}
                  className="input"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password" />
              </div>
            </div>
          </div>
          <div className="border-b pb-2">
            <div className="my-4">
              <h3 className="mb-1">Points of contact</h3>
              <p className="text-xs">These points of contact will be added to the watermarking of your assets.</p>
            </div>
            <ContactList
              restrictedMode={ true }
              editMode={ true }
              handleReturnedContacts={ this.handleReturnedContacts } />
          </div>
          <div className="my-4">
            <h3 className="mb-1">Order</h3>
            <p className="text-xs mt-1 mb-2">This is how your name will appear in all
              images/video watermarking</p>
          </div>
          <NewOrder
            handleReturnedLocation={ this.handleReturnedLocation }
            handleReturnedPayment={ this.handleReturnedPayment }
            plan={ this.state.selectedPlan.name }
            price={ this.state.price }
            actualPrice={ this.state.amountPaid } />
          { this.renderErrors() }
          <div className="mt-4">
            <a
              className="button-green"
              onClick={this.handleSubmit}>
              <span className="action-button-overlay"></span>
              { this.renderButtonText() }
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(CreateOrderWithUser, {
  props: ({ ownProps, mutate }) => ({
    submitOrder: ({ state, contacts, token }) => mutate({ variables: {
      input: {
        user: {
          stripeToken: JSON.parse(token).id,
          name: state.name,
          email: state.email,
          password: state.password,
          contacts: contacts
        },
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
          }
        }
      }}})})
})(OrderForm)
