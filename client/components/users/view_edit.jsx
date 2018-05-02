// @flow
import React, { Component } from 'react'
import { graphql, compose, Mutation } from 'react-apollo'
import { splitEvery, pick, propOr } from 'ramda'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Loading from '../misc/loader'
import ContactList from '../contacts/list'
import Location from '../addresses/location'
import UserAssets from './user_assets'
import jwtDecode from 'jwt-decode'
import GetUser from '../../queries/get_user'
import GetUsers from '../../queries/user_collections'
import VerifyUser from '../../mutations/verify_user'
import UpdateUser from '../../mutations/update_user'
import DeactivateUser from '../../mutations/deactivate_user'
import { dateTimeShort } from '../../utils/helpers'
import StripeLogo from '../../assets/images/powered_by_stripe2x.png'
import { isValidEmail, isValidName, isValidPassword } from '../../utils/validators'
const linkToApiAccount = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }applications/users/`
const linkToApiCustomer = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }customers/`

type Props = {
  data: Object,
  qGetUser: Object,
  qGetAssets: Object,
  toggleDefaultAsset: Function,
  destroyAsset: Function,
  submitVerify: Function,
  submitUser: Function
}

type State = {
  editModeEnabled: boolean,
  loading: boolean,
  isVerified?: boolean,
  name?: string,
  email?: string,
  bio?: string,
  password?: string,
  confirmPassword?: string,
  deactivatedReason?: string,
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  zip?: string,
  lat?: string,
  lng?: string,
  workRadius?: number,
  nameChanged: boolean,
  emailChanged: boolean,
  passwordChanged: boolean,
  contactsChanged: boolean,
  contacts?: Array<Object>,
  errors: Array<Object>
}

class UserViewEdit extends Component<Props, State>{

  handleInputChange: Function
  handleNameChange: Function
  handleEmailChange: Function
  handlePasswordChange: Function
  handleReturnedContacts: Function
  handleReturnedLocation: Function
  handleDeactivationToggle: Function
  handleGQLErrors: Function
  toggleVerified: Function
  toggleEditMode: Function
  buildInput: Function
  checkUserVerified: Function
  handleSubmit: Function

  constructor(props){
    super(props)
    this.state = {
      editModeEnabled: false,
      loading: false,
      emailChanged: false,
      nameChanged: false,
      passwordChanged: false,
      contactsChanged: false,
      errors: []
    }

    this.handleGQLErrors = this.handleGQLErrors.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleDeactivationToggle = this.handleDeactivationToggle.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleReturnedContacts = this.handleReturnedContacts.bind(this)
    this.handleReturnedLocation = this.handleReturnedLocation.bind(this)
    this.toggleVerified = this.toggleVerified.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.buildInput = this.buildInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){

  }

  getConnectionInfo(user){
    if(user.type === "agent"){
      if(user.customerId){
        return <a href={`${linkToApiCustomer}${user.customerId}`} target="_blank">{user.customerId}</a>
      } else { return 'Not connected yet' }
    } else if(user.type === "pilot"){
      if(user.accountId){
        return <a href={`${linkToApiAccount}${user.accountId}`} target="_blank">{user.accountId}</a>
      } else { return 'Not connected yet' }
    } else if(user.type === "admin"){
      return 'Not applicable'
    }
  }

  toggleEditMode(){
    this.setState({ editModeEnabled: !this.state.editModeEnabled })
  }

  toggleVerified(){
    this.setState({ loading: !this.state.loading }, async function(){
      const user = this.props.qGetUser.getUser.user
      const resolved = await this.props.submitVerify(user.id, !user.isVerified)
        .catch(err => { this.setState(prevState => { errors: prevState.errors.concat(err) }) })
      if(resolved){ this.setState({ loading: !this.state.loading, isVerified: resolved.data.verifyUser.user.isVerified }) }
    })
  }

  handleReturnedContacts(verified, contacts){
    if(verified){
      this.setState({ contacts })
    }
  }

  handleGQLErrors(err){
    console.log('ERR', err)
  }

  handleReturnedLocation(loc: Object){
    this.setState({
      address1: loc.address1,
      address2: loc.address2,
      city: loc.city,
      state: loc.state,
      zip: loc.zip,
      lat: loc.lat,
      lng: loc.lng,
      workRadius: loc.workRadius })
  }

  handleNameChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({
      name: e.currentTarget.value,
      nameChanged: true
    })
  }

  handleEmailChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({
      email: e.currentTarget.value,
      emailChanged: true
    })
  }

  handlePasswordChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({
      password: e.currentTarget.value,
      passwordChanged: true
    }, function(){
      if(this.state.confirmPassword === "" && this.state.password === ""){
        this.setState({ passwordChanged: false })
      }
    })
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
  }

  async handleDeactivationToggle(deactivateUser: Function, user: Object, e: SyntheticInputEvent<*>){
    console.log(user)
    const { data } = await deactivateUser({ variables: { input: {id: user.id }},
      refetchQueries: [{
        query: GetUser,
        variables: { input: {
          id: user.id ,
          authorizedId: user.id,
          deactivatedReason: this.state.deactivatedReason }
        }
      }]
    })
  }

  checkRequiredInfo(){
    if(this.state.nameChanged && !isValidName(this.state.name)){ this.setState((prevState) => ({ errors: prevState.errors.concat(
      { type: "user", message: "Please verify you submited your location and workable area." }) })) }
    if(this.state.emailChanged && !isValidEmail(this.state.email)){ this.setState((prevState) => ({ errors: prevState.errors.concat(
      { type: "user", message: "Please make sure all your user fields are valid." }) })) }
    if(this.state.passwordChanged &&
      !isValidPassword(this.state.password) &&
      this.state.password === this.state.confirmPassword ){ this.setState((prevState) => ({ errors: prevState.errors.concat(
      { type: "user", message: "Please add at least one valid point of contact." }) })) }
    if(this.state.errors.length === 0){ return true } else { return false }
  }

  buildInput(){
    const whitelistUser = [ "name", "email", "password", "bio", "workRadius" ]
    const whitelistAddress = [ "address1", "address2", "city", "state", "zip", "lat", "lng" ]

    const input: Object = {
      id: this.props.qGetUser.getUser.user.id,
      authorizedId: this.props.qGetUser.getUser.user.id,
      user: { address: { } }
    }

    const contacts = this.state.contacts ? this.state.contacts.map(c =>
      pick(['id', 'type', 'content', 'status', 'default'], c)) : null
    input.user.contacts = contacts

    whitelistUser.map(attr => { if(this.state[attr]){ input.user[attr] = this.state[attr]} })
    whitelistAddress.map(attr => { if(this.state[attr]){ input.user.address[attr] = this.state[attr] } })
    return input
  }

  handleSubmit(){
    const user = this.props.qGetUser.getUser.user
    if(this.checkRequiredInfo()){
      const input = this.buildInput()
      this.setState({ loading: !this.state.loading }, async function(){
        const resolved = this.props.submitUser(input).catch(err => {
          this.handleGQLErrors(err)
        })
        if(resolved){
          this.toggleEditMode()
          this.setState({ loading: !this.state.loading })
        }
      })
    }
  }

  render(){
    const currentUser = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const { loading, getUser } = this.props.qGetUser
    if(loading){return (<div></div>)}
    const user = getUser.user
    const userid = parseInt(user.id)
    const edit = this.state.editModeEnabled
    return (
      <div className="flex flex-wrap md:-mx-4">
        <div className="w-full md:w-1/4 p-4">
          <UserAssets user={ user } editModeEnabled={ this.state.editModeEnabled } currentUser={ currentUser } />
        </div>
        <div className="w-full md:w-3/4 p-4">
          <div id="profile" className="bg-white rounded shadow p-4">
            <div className="flex">
              <h3 className="font-bold flex-1">{ currentUser.id === userid ? 'Settings' : 'Profile' }</h3>
              <div onClick={ this.toggleEditMode } className="hover:cursor-pointer">edit</div>
              { currentUser.type === "admin" ?
                <div onClick={ this.toggleVerified } className={`${user.isVerified ? 'button-red ' : 'button-green' } ml-4 w-24`}>
                  <span className="action-button-overlay"></span>
                  { user.isVerified ? 'Unverify' : 'Verify'}
                </div>
              : null }
            </div>
            { user.type === "pilot" && currentUser.type === "admin" ?
              <div className="border border-red-darker bg-red-lightest rounded mt-4 p-4">
                <h3>Bailed Missions</h3>
                <ul>
                  { user.bailedMissions.map((bm, i) => (
                    <li key={`bailed_${i}`} className="py-1">
                      {dateTimeShort(bm.createdAt)} - <Link to={`/admin/order/${bm.orderId}`}>View mission details</Link>
                    </li>
                  )) }
                </ul>
                <div className="mt-4">
                  <Mutation mutation={DeactivateUser}>
                    {(deactivateUser) => (
                      <div className="mt-4 flex">
                        <div className="flex-1 mr-4">
                          { user.deactivated ? null :
                            <input
                              onChange={ this.handleInputChange }
                              name="deactivatedReason"
                              className="input flex-1"
                              type="text"
                              placeholder="Reason for deactivation (pilot will see this)"
                              defaultValue={user.deactivatedReason} />
                            }
                        </div>
                        <div className="">
                          <button
                            className={` ${ user.deactivated ? 'button-green' : 'button-red' }`}
                            onClick={(e) => this.handleDeactivationToggle(deactivateUser, user, e) }>
                            <span className="action-button-overlay"></span>{ user.deactivated ? 'Reactivate' : 'Deactivate' }
                          </button>
                        </div>
                      </div>
                    )}
                  </Mutation>
                </div>
              </div>
            : null }
            <div className="my-4 w-full">
              <div className="text-xs">Name</div>
              { edit ?
                <div className="">
                  <input
                    onChange={this.handleNameChange}
                    name="new_name"
                    className="input"
                    type="text"
                    placeholder="Name"
                    defaultValue={user.name} />
                </div>
              : <div className="title">{user.name}</div> }
            </div>
            <div className="my-4 w-full">
              <div className="text-xs">Email</div>
              { edit ?
                <div className="block">
                  <input
                    onChange={this.handleEmailChange}
                    name="new_email"
                    className="input"
                    type="text"
                    placeholder="Email"
                    defaultValue={user.email} />
                </div>
              : <div className="title">{user.email}</div> }
            </div>
            { currentUser.id === userid || currentUser.type === "admin" ?
              <div className="my-4 w-full">
                <div className="text-xs">Api Connects</div>
                <div className="rounded-lg border border-grey-light bg-grey-lighter p-4">
                  <div className="text-xs">
                    { user.type === "agent" ? 'Stripe Customer ID' : null }
                    { user.type === "pilot" ? 'Stripe Account ID' : null }
                    { user.type === "admin" ? 'Stripe ID' : null }
                  </div>
                  <div className="">
                    { this.getConnectionInfo(user) }
                  </div>
                </div>
              </div>
            : null }
            <div className="my-4 w-full">
              <div className="text-xs">Bio</div>
              { edit ?
                <div className="block">
                  <textarea
                    onChange={this.handleInputChange}
                    name="bio"
                    className="input"
                    placeholder="Tell us about yourself."
                    defaultValue={user.bio}>
                    </textarea>
                </div>
              : <p>{user.bio ? user.bio : 'No bio yet.'}</p> }
            </div>
            { edit ?
              <div className="flex my-4 w-full rounded-lg border border-yellow-light bg-yellow-lightest p-4">
                <div className="flex-1 mr-4">
                  <div className="text-xs">Change password</div>
                  <div className="control">
                    <input
                      onChange={this.handlePasswordChange}
                      name="new_password"
                      className="input"
                      type="password"
                      autoComplete="off"
                      placeholder="Password" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs">Confirm change password</div>
                  <div className="control">
                    <input
                      onChange={this.handleInputChange}
                      name="confirmPassword"
                      className="input"
                      type="password"
                      placeholder="Password Confirm" />
                  </div>
                </div>
              </div>
            : null }
            <div className="my-6">
              <div className="text-xs">Contacts</div>
              <ContactList restrictedMode={ user.type === 'agent' ? true : false } editMode={ this.state.editModeEnabled } contacts={user.contacts} handleReturnedContacts={ this.handleReturnedContacts } />
            </div>
            { user.type === "pilot" && edit ?
              <div className="my-6">
                <div className="text-xs">Pilot location</div>
                <Location handleReturnedLocation={ this.handleReturnedLocation } />
              </div>
            : null }
            { edit && (currentUser.id === userid || currentUser.type === "admin") ?
              <a
                className="button-green"
                onClick={this.handleSubmit}>
                <span className="action-button-overlay"></span>
                Save Changes
              </a>
            : null }
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql( GetUser, {
    name: "qGetUser",
    options: ({ userid }) => ({ variables: {
    input: {
      id: userid || jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
      authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id
    } } }) }),
  graphql( VerifyUser, {
    props: ({ ownProps, mutate }) => ({
      submitVerify: (id, isVerified) => mutate({
        variables: { input: { id, authorizedId: id, user: { isVerified, refreshToken: true } } },
        refetchQueries: [{
          query: GetUser,
          variables: { input: {
            id: id ,
            authorizedId: id }
          }
        }]
  }) }) }),
  graphql( UpdateUser, {
    props: ({ ownProps, mutate }) => ({
      submitUser: (input) => {
        console.log('ownProps', ownProps)
        return mutate({
        variables: { input: input },
        refetchQueries: [{
          query: GetUser,
          variables: { input: {
            id: ownProps.userid || jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
            authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id }
          }
        }] })} }) })
)(UserViewEdit)
