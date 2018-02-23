// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { pick, pathOr } from 'ramda'
import Header from '../header'
import Loading from '../../misc/loader'
import ContactList from '../../contacts/list'
import User from '../../users/signup'
import FormHeader from '../../misc/form_section_header'
import odr from '../agent/styles/order'
import cE from '../../../styles/common_elements'
import cF from '../../../styles/common_forms'
import cErr from '../../../styles/common_errors'
import reg from './styles/register'
import CreateUserMigration from '../../../mutations/create_user'
const env = window.location.host === "homefilming.com" ? "production" : "development"

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
  handleReturnedUser: Function
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
    this.handleReturnedUser = this.handleReturnedUser.bind(this)
    this.handleReturnedContacts = this.handleReturnedContacts.bind(this)
    this.renderValidated = this.renderValidated.bind(this)
    this.runMutation = this.runMutation.bind(this)
    this.allCriteriaVerified = this.allCriteriaVerified.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  renderValidated(){
    return (<span
      className={`${css(cF.check)} icon is-small is-right`}
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

  handleReturnedContacts(verified, contacts){
    this.setState({ contactsVerified: verified, contacts })
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
    if ( this.allCriteriaVerified() ) { return "Submit"
    } else { return "Please enter required info..." }
  }

  runMutation(){
    this.setState({ loading: !this.state.loading }, async () => {
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
        { this.state.loading ? <Loading /> : null }
        <div className={`${css(reg.container)}`}>
          <div className={css(reg.section)}>
            <Header title="homefilming" subtitle="Sign up" />
          </div>
          <div className={css(reg.section)}>
            <div className={`dropdown ${this.state.userTypeOpen ? 'is-active' : '' }`}>
              <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={ this.toggleUserTypeOpen }>
                  <span>{ this.state.userTypeTitle ? this.state.userTypeTitle : 'UserType' }</span>
                  <span className="icon is-small"><i className="fa fa-angle-down" aria-hidden="true"></i></span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  {[['Agent', 'agent'], ['Pilot', 'pilot'], ['Unapproved Admin', 'unapproved_admin']].map((type, i) => (
                    <a
                      key={`opts_${i}`}
                      className="dropdown-item"
                      onClick={ this.userTypeSelect }
                      value={type[1]}
                      title={type[0]}
                    >{type[0]}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={css(reg.section)}>
            <FormHeader text="Basic info" verified={ this.state.userVerified } />
            <User
              userVerified={this.state.userVerified}
              handleReturnedUser={ this.handleReturnedUser } />
          </div>
          <div className={css(reg.section)}>
            <FormHeader text="Contact info" verified={ this.state.contactsVerified } />
            <ContactList editMode={true} handleReturnedContacts={ this.handleReturnedContacts } />
          </div>
          { this.renderErrors() }
          <div className={css(reg.section)}>
            <button
              className={ css(cE.ctaButton, cE.ctaGreen) }
              onClick={ this.handleSubmit }>
              <span className={ css(cE.ctaButtonOverlay) }></span>
              { this.renderButtonText() }
            </button>
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
