// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { pick, pathOr } from 'ramda'
import Header from '../misc/header'
import Loading from '../misc/loader'
import Config from '../../../api/config'
import ContactList from '../misc/contact_list'
import User from '../misc/user'
import Payment from '../misc/payment'
import AddressMapper from '../misc/address_mapper'
import DragDropUploader from '../misc/drag_drop_uploader'
import CreateOrderWithUser from '../../mutations/order'
import jwtDecode from 'jwt-decode'
import odr from './styles/order'
import cL from '../../styles/common_layout'
import cE from '../../styles/common_elements'
import cF from '../../styles/common_forms'
import cErr from '../../styles/common_errors'

type Props = {
  updateMapInSummary: Function,
  submitOrder: Function,
  selectedPlan: Object,
  history: Object
}

type State = {
  addressVerified: boolean,
  userVerified: boolean,
  contactsVerified: boolean,
  paymentVerified: boolean,
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
  avatar: Object,
  contacts: Array<Object>,
  errors: Array<Object>
}

class OrderForm extends Component<Props, State> {

  card: Function
  stripe: Function
  elements: Function
  setAddressVerified: Function
  setUserVerified: Function
  setContactsVerified: Function
  setPaymentVerified: Function
  renderValidated: Function
  fetchStripeToken: Function
  returnUppyInstance: Function
  runMutation: Function
  allCriteriaVerified: Function
  handleSubmit: Function

  constructor(){
    super()
    this.state = {
      addressVerified: false,
      userVerified: false,
      contactsVerified: false,
      paymentVerified: false,
      avatarVerified: false,
      loading: false,
      userType: "agent",
      avatar: {},
      contacts: [],
      errors: []
    }

    this.stripe = Stripe(Config.stripe_test.publishable_key)
    this.elements = this.stripe.elements()
    this.setAddressVerified = this.setAddressVerified.bind(this)
    this.setUserVerified = this.setUserVerified.bind(this)
    this.setContactsVerified = this.setContactsVerified.bind(this)
    this.renderValidated = this.renderValidated.bind(this)
    this.fetchStripeToken = this.fetchStripeToken.bind(this)
    this.returnUppyInstance = this.returnUppyInstance.bind(this)
    this.runMutation = this.runMutation.bind(this)
    this.allCriteriaVerified = this.allCriteriaVerified.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    console.log('PROPS', this.props)
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
        className={`${css(cF.check)} icon is-small is-right`}
        style={{opacity: `${ this.state.userVerified ? 1 : 0 }` }}>
        <i className="fa fa-check"></i></span>)
  }

  setAddressVerified({ address1, address2, city, state, zip, lat, lng }){
    if (address1 && city && state && zip && lat && lng){
      this.setState({ address1, address2, city, state, zip, lat, lng, addressVerified: true }, () => {
        this.props.updateMapInSummary([lat, lng])
      })
    }
  }

  setUserVerified(verified, { name, email, password }){
    this.setState({ userVerified: verified, name, email, password })
  }

  setContactsVerified(verified, contacts){
    this.setState({ contactsVerified: verified, contacts })
  }

  allCriteriaVerified(){
    return this.state.addressVerified &&
    this.state.userVerified &&
    this.state.contactsVerified &&
    this.state.paymentVerified ? true : false
  }

  returnUppyInstance(avatar){
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
      if(error.message = "UniqueEmailError") {
        this.setState((prevState) => ({ errors: prevState.errors.concat(
          { type: "email", section: "Email address is taken",
            message: "The email address you entered is already in use. Would you like to login?" }) }) )
      } else if(error.message = "RequiredFieldError") {
        this.setState((prevState) => ({ errors: prevState.errors.concat(
          { type: "user", section: "Missing Required Field",
            message: "Please check all your info." }) }) )
      }
    })
  }

  renderErrors(){
    return (
      <div className={`notification is-danger ${css(cErr.areaHidden)}
        ${ this.state.errors.length > 0 ? css(cErr.area) : ""}`}>
        <h2 className={`${css(cErr.header)}`}>Please correct these errors</h2>
        { this.state.errors.map((err, i) => (
          <div key={`error_${i}`} className={css(cErr.section)}>
            <h3 className={`${css(cErr.title)}`}>{err.section}</h3>
            <p className={`${css(cErr.text)}`}>{err.message}</p>
            { err.type === "email" ? <Link to="/login" className={css(cErr.buttonWithOutline)}>Login</Link> : null }
          </div>
        ))}
      </div>
    )
  }

  renderButtonText(){
    if( this.allCriteriaVerified() && this.state.avatar.plugins ){ return "Submit"
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
      const contacts = this.state.contacts.map(c => pick(['type', 'content'], c))
      const resolved = await this.props.submitOrder({ contacts, token, state: this.state }).catch(err => {
        this.handleGQLErrors(err)
      })
      const { data: { createOrderWithUser: { order, auth } } } = resolved
      localStorage.setItem('hf_auth_header_token', auth.token)
      if(this.state.avatar.plugins){
        this.state.avatar.plugins.uploader[0].opts.headers.authorization = auth.token
        const { successful } = await this.state.avatar.upload()
        if(successful){ this.setState({ loading: !this.state.loading })
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
      <div>
        { this.state.loading ? <Loading /> : null }
        <div className={`columns`}>
          <div className={`column is-two-thirds`}><Header title="homefilming" subtitle="Sign up" /></div>
          <div className={`column`}>
            <DragDropUploader
              header="Upload avatar"
              fileTypeName="photo"
              source="MainOrder-Avatar"
              fieldname="avatar"
              mimes="images"
              endpoint="/avatar-uploader"
              returnUppyInstance={ this.returnUppyInstance }
            />
          </div>
        </div>
        <div className={css(odr.section)}>
          <h2 className={css(odr.sectionHeader)}>Address of home to film
            <span className={`${css(cF.check)} icon is-small is-right`}
              style={{opacity: `${ this.state.addressVerified ? 1 : 0 }` }}>
              <i className="fa fa-check"></i></span>
          </h2>
          <AddressMapper setAddressVerified={ this.setAddressVerified } />
        </div>
        <div className={css(odr.section)}>
          <div className={css()}>
            <div>
              <h4 className={css(cF.subtitle)}>User info
                <span className={`${css(cF.check)} icon is-small is-right`}
                  style={{opacity: `${ this.state.userVerified ? 1 : 0 }` }}>
                  <i className="fa fa-check"></i></span>
              </h4>
              <User
                userVerified={this.state.userVerified}
                setUserVerified={this.setUserVerified} />
            </div>
            <div>
              <h4 className={css(cF.subtitle)}>Contact info
                <span className={`${css(cF.check)} icon is-small is-right`}
                  style={{opacity: `${ this.state.contactsVerified ? 1 : 0 }` }}>
                  <i className="fa fa-check"></i></span>
              </h4>
              <ContactList setContactsVerified={this.setContactsVerified} />
            </div>
          </div>
        </div>
        <div className={css(odr.section)}>
          <h4 className={css(cF.subtitle)}>Payment
            <span className={`${css(cF.check)} icon is-small is-right`}
              style={{opacity: `${ this.state.paymentVerified ? 1 : 0 }` }}>
              <i className="fa fa-check"></i></span>
          </h4>
          <div id="card-element" className={css(odr.paymentInput)}></div>
        </div>
        { this.renderErrors() }
        <div className={css(odr.buttonArea)}>
          <button
            className={css(cE.ctaButton, cE.ctaGreen)}
            onClick={this.handleSubmit}>
            <span className={css(cE.ctaButtonOverlay)}></span>
            { this.renderButtonText() }
          </button>
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
          plan: {
            id: ownProps.selectedPlan.planId,
            name: ownProps.selectedPlan.name,
            actualPrice: ownProps.selectedPlan.actualPrice,
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
      }
    }})
  })
})(OrderForm)
