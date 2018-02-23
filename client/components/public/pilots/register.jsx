// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { css } from 'aphrodite'
import { Link, Redirect } from 'react-router-dom'
import { pick } from 'ramda'
import Header from '../header'
import Loading from '../../misc/loader'
import Config from '../../../utils/config'
import DragDropUploader from '../../assets/drag_drop_uploader'
import FormHeader from '../../misc/form_section_header'
import User from '../../users/signup'
import ContactList from '../../contacts/list'
import Location from '../../addresses/location'
import CreateUserAsPilot from '../../../mutations/create_pilot'
import cL from '../../../styles/common_layout'
import cF from '../../../styles/common_forms'
import cE from '../../../styles/common_elements'
import cErr from '../../../styles/common_errors'
import reg from './styles/register'
const env = window.location.host === "homefilming.com" ? "production" : "development"
const stripeClientId = Config.stripe_platform[env]
const returnUri = Config.base_url[env]

type Props = {
  CreateUserAsPilot: Function,
  submitPilot: Function
}

type State = {
  userVerified: boolean,
  contactsVerified: boolean,
  locationVerified: boolean,
  loading: boolean,
  name?: string,
  email?: string,
  password?: string,
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  zip?: string,
  lat?: string,
  lng?: string,
  workRadius?: number,
  insurance: Object,
  license: Object,
  avatar: Object,
  contacts: Array<Object>,
  errors: Array<Object>
}

class PilotRegister extends Component<Props, State> {

  handleReturnedUser: Function
  handleReturnedContacts: Function
  handleReturnedLocation: Function
  infoCriteriaMet: Function
  uploadCriteriaMet: Function
  renderButtonText: Function
  returnUploadInstance: Function
  handleSubmit: Function

  constructor(){
    super()

    this.state = {
      userVerified: false,
      locationVerified: false,
      contactsVerified: false,
      loading: false,
      insurance: {},
      license: {},
      avatar: {},
      contacts: [],
      errors: []
    }

    this.handleReturnedUser = this.handleReturnedUser.bind(this)
    this.handleReturnedLocation = this.handleReturnedLocation.bind(this)
    this.handleReturnedContacts = this.handleReturnedContacts.bind(this)
    this.renderButtonText = this.renderButtonText.bind(this)
    this.infoCriteriaMet = this.infoCriteriaMet.bind(this)
    this.uploadCriteriaMet = this.uploadCriteriaMet.bind(this)
    this.returnUploadInstance = this.returnUploadInstance.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleReturnedUser(verified: boolean, { name, email, password }: Object){
    this.setState({ userVerified: verified, name, email, password })
  }

  handleReturnedContacts(verified: boolean, contacts: Array<Object>){
    this.setState({ contactsVerified: verified, contacts })
  }

  handleReturnedLocation({ address1, address2, city, state, zip, lat, lng, workRadius }: Object){
    if(lat && lng && workRadius ){ this.setState({ address1, address2, city, state, zip, lat, lng, workRadius, locationVerified: true }) }
  }

  returnUploadInstance(upload: Object){

    this.setState({ [upload.opts.meta.instanceOf]: upload }, function(){
      console.log("UPLOAD", this.state)
    })
  }

  infoCriteriaMet(){
    return this.state.locationVerified &&
    this.state.userVerified &&
    this.state.contactsVerified ? true : false
  }

  uploadCriteriaMet(){
    return this.state.license.plugins &&
    this.state.insurance.plugins ? true : false
  }

  runMutation(){
    console.log(Config)
    this.setState({ loading: !this.state.loading }, async () => {
      const contacts = this.state.contacts.map(c => pick(['type', 'content', 'status'], c))
      const resolved = await this.props.submitPilot({ contacts, state: this.state }).catch(err => {
        console.log('STATE', this.state)
        this.handleGQLErrors(err)
      })
      if(resolved){
        const { data: { createPilot: { user, auth } } } = resolved
        await localStorage.setItem('hf_auth_header_token', auth.token)
        this.state.insurance.plugins.uploader[0].opts.headers.authorization = auth.token
        this.state.license.plugins.uploader[0].opts.headers.authorization = auth.token
        const insurance = await this.state.insurance.upload()
        const license = await this.state.license.upload()
        if(this.state.avatar.plugins){
          this.state.avatar.plugins.uploader[0].opts.headers.authorization = auth.token
          const avatar = await this.state.avatar.upload()
        }
        window.location = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${returnUri}/signup-pilot&client_id=${stripeClientId}&state=${user.id}`
      }
    })
  }

  handleGQLErrors(err){
    err.graphQLErrors.map((error) => {
      if(error.message === "UniqueEmailError") {
        this.setState((prevState) => ({ errors: prevState.errors.concat(
          { type: "email", section: "Email address is taken",
            message: "The email address you entered is already in use. Would you like to login?" }) }) )
      } else if(error.message === "RequiredFieldError") {
        this.setState((prevState) => ({ errors: prevState.errors.concat(
          { type: "user", section: "Missing Required Field", message: "Please check all your info." }) }) )
      }
    })
  }

  submitErrorCheck(){
    if( this.infoCriteriaMet() && this.uploadCriteriaMet()){
      return true
    } else {
      if(!this.state.locationVerified){ this.setState((prevState) => ({ errors: prevState.errors.concat(
        { type: "location", section: "Location", message: "Please verify you submited your location and workable area." }) })) }
      if(!this.state.userVerified){ this.setState((prevState) => ({ errors: prevState.errors.concat(
        { type: "user", section: "User info", message: "Please make sure all your user fields are valid." }) })) }
      if(!this.state.contactsVerified){ this.setState((prevState) => ({ errors: prevState.errors.concat(
        { type: "contacts", section: "Contacts", message: "Please add at least one valid point of contact." }) })) }
      if(!this.state.license.plugins || !this.state.insurance.plugins){ this.setState((prevState) => ({ errors: prevState.errors.concat(
        { type: "uploads", section: "Upload Documents", message: "Both Documents are required for review." }) })) }
    }
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
    if( this.infoCriteriaMet() && this.uploadCriteriaMet() && this.state.avatar.plugins ){
      return "Continue..."
    } else if ( this.infoCriteriaMet() && this.uploadCriteriaMet() ) { return "Don't forget your avatar..."
    } else if ( this.infoCriteriaMet() ) { return "License and insurance required..."
    } else { return "Please enter required info..." }
  }

  handleSubmit(){
    if(this.state.errors.length > 0) { this.setState({ errors: [] }) }
    if(this.submitErrorCheck()) { this.runMutation() } else { return false }
  }

  render(){
    return(
      <div>
        { this.state.loading ? <Loading /> : null }
        <div className={`${css(reg.container)} columns`}>
          <div className={`${css(reg.uploads)} column`}>
            <h3 className={css(reg.uploadTitle)}>Upload Documents</h3>
            <h4 className={css(reg.uploadInstruct)}>Please upload the required documents below.</h4>
            <div className={css(reg.upload)}>
              <DragDropUploader
                header="Upload insurance"
                padding={true}
                fileTypeName="proof of insurance"
                source="Signup-Insurance"
                fieldname="insurance"
                mimes="documents"
                endpoint="/insurance-uploader"
                returnUploadInstance={ this.returnUploadInstance }
              />
            </div>
            <div className={css(reg.upload)}>
              <DragDropUploader
                header="Upload FAA License"
                padding={true}
                fileTypeName="FAA license"
                source="Signup-License"
                fieldname="license"
                mimes="documents"
                endpoint="/license-uploader"
                returnUploadInstance={ this.returnUploadInstance }
              />
            </div>
          </div>
          <div className={`${css(reg.mainArea)} column`}>
            <div className={`columns`}>
              <div className={`column is-two-thirds`}><Header title="homefilming" subtitle="Pilot sign up" /></div>
              <div className={`column`}>
                <DragDropUploader
                  header="Upload avatar"
                  fileTypeName="photo"
                  source="Signup-Avatar"
                  fieldname="avatar"
                  mimes="images"
                  endpoint="/avatar-uploader"
                  returnUploadInstance={ this.returnUploadInstance }
                />
              </div>
            </div>
            <div className={css(reg.section)}>
              <FormHeader text="Basic info" verified={ this.state.userVerified } />
              <User
                userVerified={ this.state.userVerified }
                handleReturnedUser={ this.handleReturnedUser } />
            </div>
            <div className={css(reg.section)}>
              <FormHeader text="Contact info" verified={ this.state.contactsVerified } />
              <ContactList editMode={true} handleReturnedContacts={ this.handleReturnedContacts } />
            </div>
            <div className={css(reg.section)}>
              <Location handleReturnedLocation={ this.handleReturnedLocation } />
            </div>
            { this.renderErrors() }
            <div className="message is-success">
              <div className="message-body">
                <p className={css(reg.textBottomMargin)}>Last Step is to set up how to get paid, we set this all
                  up through Stripe for simple secure payouts on both ends. Submiting this form will create your
                  account and briefly redirect you to a Stripe processing page. After which you will be redirected
                  back and be logged in.</p>
                <div className={css(reg.buttonArea, reg.buttonAreaUnique)}>
                  <button
                    className={css(cE.ctaButton, cE.ctaGreen)}
                    onClick={this.handleSubmit}>
                    <span className={css(cE.ctaButtonOverlay)}></span>
                    { this.renderButtonText() }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(CreateUserAsPilot, {
  props: ({ ownProps, mutate }) => ({
    submitPilot: ({ state, contacts }) => mutate({ variables: {
      input: {
        user: {
          name: state.name,
          email: state.email,
          password: state.password,
          contacts: contacts,
          workRadius: state.workRadius,
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
})(PilotRegister)