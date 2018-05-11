// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { pick, pathOr } from 'ramda'
import { toast } from 'react-toastify'
import ContactList from '../../contacts/list'
import User from '../../users/signup'
import DragDropUploader from '../../assets/drag_drop_uploader'
import { isValidEmail, isValidName, isValidPassword } from '../../../utils/validators'
import CreateUserMigration from '../../../mutations/create_user'
const env = window.location.host.includes("homefilming.com") ? "production" : "development"

type Props = {
  submitUser: Function,
  history: Object
}

type State = {
  userVerified: boolean,
  contactsVerified: boolean,
  userTypeOpen: boolean,
  loading: boolean,
  userType?: string,
  userTypeTitle?: string,
  type: 'agent' | 'pilot' | 'unapproved_editor' | 'unapproved_admin',
  name?: string,
  email?: string,
  password?: string,
  contacts: Array<Object>,
  errors: Array<Object>
}

class CreateUser extends Component<Props, State> {

  toggleUserTypeOpen: Function
  userTypeSelect: Function
  checkUserVerified: Function
  handleInputChange: Function
  handleReturnedContacts: Function
  renderValidated: Function
  runMutation: Function
  allCriteriaVerified: Function
  handleSubmit: Function

  constructor(){
    super()

    this.state = {
      userVerified: false,
      contactsVerified: false,
      userTypeOpen: false,
      loading: false,
      type: 'unapproved_admin',
      contacts: [],
      errors: []
    }

    this.toggleUserTypeOpen = this.toggleUserTypeOpen.bind(this)
    this.userTypeSelect = this.userTypeSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.checkUserVerified = this.checkUserVerified.bind(this)
    this.handleReturnedContacts = this.handleReturnedContacts.bind(this)
    this.renderValidated = this.renderValidated.bind(this)
    this.runMutation = this.runMutation.bind(this)
    this.allCriteriaVerified = this.allCriteriaVerified.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  renderValidated(){
    return (<span
      className=""
      style={{opacity: `${ this.state.userVerified ? 1 : 0 }` }}>
      <i className="fas fa-check"></i></span>)
  }

  toggleUserTypeOpen(){
    this.setState({ userTypeOpen: !this.state.userTypeOpen })
  }

  userTypeSelect(e: SyntheticEvent<*>){
    this.setState({ userType: e.currentTarget.getAttribute('value'),
      userTypeTitle: e.currentTarget.getAttribute('title'),
      userTypeOpen: !this.state.userTypeOpen })
  }

  handleReturnedUser(verified, { name, email, password }){
    this.setState({ userVerified: verified, name, email, password })
  }

  handleReturnedContacts(contacts){
    this.setState({ contacts, contactsVerified: contacts.length > 0 })
  }

  returnUploadInstance(){

  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value }, () => {
      this.checkUserVerified()
    })
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
    return this.state.userVerified &&
    this.state.contactsVerified ? true : false
  }

  submitErrorCheck(){
    if( this.allCriteriaVerified() ){
      return true
    } else {
      if(!this.state.userVerified) { this.setState((prevState) => ({ errors: prevState.errors.concat(
        { type: "user", section: "User info", message: "Please make sure all your user fields are valid." }) })) }
      if(!this.state.contactsVerified) { this.setState((prevState) => ({ errors: prevState.errors.concat(
        { type: "contacts", section: "Contacts", message: "Please add at least one valid point of contact." }) })) }
    }
  }

  handleGQLErrors(err){
    console.log(err)
    err.graphQLErrors.map((error) => {
      if(error.message === "UniqueEmailError") {
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
          <div key={`error_${i}`} className="my-4">
            <h3 className="text-sm font-bold">{err.section}</h3>
            <p className="text-sm">{err.message}</p>
            { err.type === "email" ?
              <Link to="/login" className="button-blue">
                <span className="action-button-overlay"></span>Login
              </Link>
            : null }
          </div>
        ))}
      </div>
    )
  }

  renderButtonText(){
    if ( this.allCriteriaVerified() ) { return "Submit"
    } else { return "Please enter required info..." }
  }

  runMutation(){
    this.setState({ loading: !this.state.loading }, async () => {
      toast.info('⏱️ Creating order... One moment please.', {
        autoClose: false
      })
      const contacts = this.state.contacts.map(c => pick(['type', 'content', 'status', 'default'], c))
      let resolved = await this.props.submitUser({ contacts, state: this.state }).catch(err => {
        this.handleGQLErrors(err)
      })
      const { data: { createUser: { user, auth } } } = resolved
      localStorage.setItem('hf_auth_header_token', auth.token)
      this.setState({ loading: !this.state.loading }, function(){
        const { history } = this.props
        history.push('/dashboard')
      })
    })
  }

  async handleSubmit(e){
    if(this.state.errors.length > 0) { this.setState({ errors: [] }) }
    if(this.submitErrorCheck()) { this.runMutation() } else { return false }
  }

  render(){
    return (
      <div>
        <div className="signup-container">
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
                  <div className="flex">
                    <div className="flex-1"></div>
                    <Link className="w-48 h-6 block" to="/"><img src={`/${require('../../../assets/images/hf_logo_dark@2x.png')}`} /></Link>
                  </div>
                  <div className="text-right text-sm font-bold">Create Admin</div>
                </div>
                <div className={`ml-6 mt-6 dropdown relative inline-block ${this.state.userTypeOpen ? 'is-active' : '' }`}>
                  <div className="dropdown-trigger hover:cursor-pointer" onClick={ this.toggleUserTypeOpen }>
                    <button
                      className="select-faker"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu">
                      <span>{ this.state.userTypeTitle ? this.state.userTypeTitle : 'UserType' }</span>
                      <span className="inline-block ml-6">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div className={`dropdown-menu ${ this.state.userTypeOpen ? 'block' : 'hidden' }`} id="dropdown-menu" role="menu">
                    <div className="p-2 flex flex-wrap bg-white border border-grey rounded">
                      {[['Agent', 'agent'], ['Pilot', 'pilot'], ['Unapproved Admin', 'unapproved_admin']].map((type, i) => (
                        <a
                          key={`opts_${i}`}
                          className="w-full block px-2 py-1 hover:cursor-pointer"
                          onClick={ this.userTypeSelect }
                          value={type[1]}
                          title={type[0]}
                        >{type[0]}</a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-2">
                  <div className="mb-4">
                    <div className="text-sm font-bold mt-4">Full name</div>
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
                    <div className="text-xs mt-1">
                      Password must be at least 8 characters in with capital and lowercase letters and include at least one number.
                    </div>
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
            <div className="pb-2">
              <div className="my-4">
                <h3 className="mb-1">Points of contact</h3>
              </div>
              <ContactList
                restrictedMode={ true }
                editMode={ true }
                handleReturnedContacts={ this.handleReturnedContacts } />
            </div>
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
      </div>
    )
  }
}

export default graphql(CreateUserMigration, {
  props: ({ mutate }) => ({
    submitUser: ({ state, contacts }) => mutate({ variables: {
      input: {
        user: {
          name: state.name,
          email: state.email,
          password: state.password,
          type: state.userType,
          contacts: contacts
        }
      }
    }})
  })
})(CreateUser)
