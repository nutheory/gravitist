// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { StyleSheet, css } from 'aphrodite'
import { splitEvery, pick, propOr } from 'ramda'
import moment from 'moment'
import Loading from '../misc/loader'
import DragDropUploader from '../assets/drag_drop_uploader'
import ContactList from '../contacts/list'
import Location from '../addresses/location'
import jwtDecode from 'jwt-decode'
import Toggle from '../misc/toggle'
import view from './styles/view'
import cE from '../../styles/common_elements'
import cF from '../../styles/common_forms'
import GetUser from '../../queries/get_user'
import GetUsers from '../../queries/user_collections'
import GetAssets from '../../queries/asset_collections'
import VerifyUser from '../../mutations/verify_user'
import UpdateUser from '../../mutations/update_user'
import ToggleDefaultAsset from '../../mutations/toggle_default_asset'
import DestroyAsset from '../../mutations/destroy_asset'
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
  handleDestroyAsset: Function
  handleToggleDefaultAsset: Function
  handleGQLErrors: Function
  returnVerified: Function
  returnUploadInstance: Function
  returnEditMode: Function
  buildInput: Function
  checkUserVerified: Function
  renderAvatar: Function
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
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleReturnedContacts = this.handleReturnedContacts.bind(this)
    this.handleToggleDefaultAsset = this.handleToggleDefaultAsset.bind(this)
    this.handleDestroyAsset = this.handleDestroyAsset.bind(this)
    this.returnUploadInstance = this.returnUploadInstance.bind(this)
    this.returnVerified = this.returnVerified.bind(this)
    this.returnEditMode = this.returnEditMode.bind(this)
    this.buildInput = this.buildInput.bind(this)
    this.renderAvatar = this.renderAvatar.bind(this)
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

  returnEditMode(){
    this.setState({ editModeEnabled: !this.state.editModeEnabled }, function(){
      const el = document.getElementById('edit-toggle-pencil')
      if(this.state.editModeEnabled) {
        el ? el.classList.add(css(view.toggleBlue)) : null
      } else {
        el ? el.classList.remove(css(view.toggleBlue)) : null
      }
    })
  }

  returnVerified(verified){
    this.setState({ loading: !this.state.loading }, async function(){
      const resolved = await this.props.submitVerify(this.props.qGetUser.getUser.user.id, !verified)
        .catch(err => { this.setState(prevState => { errors: prevState.errors.concat(err) }) })
      if(resolved){
        this.setState({
          loading: !this.state.loading,
          isVerified: resolved.data.verifyUser.user.isVerified }, function(){
          const el = document.getElementById('verify-toggle-check')
          if(this.state.isVerified) {
            el ? el.classList.add(css(view.toggleBlue)) : null
          } else {
            el ? el.classList.remove(css(view.toggleBlue)) : null
          }
        })
      }
    })
  }

  returnUploadInstance(upload){
    console.log('Upload', upload)
    // this.props.qGetAssets.startPolling(1000)
    // setInterval(() => {
    //   this.props.qGetAssets.stopPolling()
    // },60000)
  }


  handleReturnedContacts(verified, contacts){
    if(verified){
      console.log('returned', contacts)
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
    console.log("changed")
    this.setState({
      password: e.currentTarget.value,
      passwordChanged: true
    }, function(){
      console.log("fired")
      if(this.state.confirmPassword === "" && this.state.password === ""){
        this.setState({ passwordChanged: false })
      }
    })
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
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
      id: this.props.data.getUser.user.id,
      authorizedId: this.props.data.getUser.user.id,
      user: { address: { } }
    }

    const contacts = this.state.contacts ? this.state.contacts.map(c =>
      pick(['id', 'type', 'content', 'status', 'default'], c)) : null
    input.user.contacts = contacts

    whitelistUser.map(attr => { if(this.state[attr]){ input.user[attr] = this.state[attr]} })
    whitelistAddress.map(attr => { if(this.state[attr]){ input.user.address[attr] = this.state[attr] } })

    return input
  }

  handleToggleDefaultAsset(e: SyntheticEvent<*>){
    this.props.toggleDefaultAsset(e.currentTarget.getAttribute('assetid'), e.currentTarget.getAttribute('userid'))
  }

  handleDestroyAsset(e: SyntheticEvent<*>){
    this.props.destroyAsset(e.currentTarget.getAttribute('assetid'), e.currentTarget.getAttribute('userid'))
  }

  handleSubmit(){
    const user = this.props.data.getUser.user
    if(this.checkRequiredInfo()){
      const input = this.buildInput()
      this.setState({ loading: !this.state.loading }, async function(){
        const resolved = this.props.submitUser(input).catch(err => {
          this.handleGQLErrors(err)
        })
        if(resolved){
          this.returnEditMode()
          this.setState({ loading: !this.state.loading })
        }
      })
    }
  }

  renderAvatar(av, user){
    return (
      <li key={`avatar_${av.id}`} className={`columns`}>
        <div className={`column is-one-third`}>
          <img src={`${av.url}`} className={css(view.avatarWrapper)} />
        </div>
        <div className={`column`}>
          <p onClick={this.handleToggleDefaultAsset} userid={user.id} assetid={av.id}>make default</p><br />
          <p onClick={this.handleDestroyAsset} userid={user.id} assetid={av.id}>delete</p>
        </div>
      </li>
    )
  }

  render(){
    const currentUser = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const resGetUser = this.props.qGetUser
    const resGetAssets = this.props.qGetAssets
    if(resGetUser.loading === true || resGetAssets.loading === true){return (<div></div>)}
    const user = resGetUser.getUser.user
    const avatars = resGetAssets.getAssets.assets
    const userid = parseInt(user.id)
    const avatarList = avatars.length > 0 ? splitEvery(3, avatars) : null
    const currentAvatar = avatars.length > 0 ? avatars.find(av => av.default === true) : null
    const edit = this.state.editModeEnabled
    return (
      <div>
        { this.state.loading ? <Loading /> : null }
        <div className="columns is-centered">
          <div className="column is-two-thirds is-narrow">
            <div className="columns">
              <div className={`${css(view.addFlex)} column`}>
                <div className={`title ${css(view.titleTopPadding)}`}>{currentUser.id === userid ? 'Settings' : 'Profile' }</div>
              </div>
              <div className="column">
                <div className={`${css(view.toggles)}`}>
                  { currentUser.type === "admin" && user.type === "pilot" ?
                    <div className={`${css(view.toggle)}`}>
                      <div id="verify-toggle-check"
                        className={`${css(view.toggleIcon)} ${ this.state.isVerified || user.isVerified ? css(view.toggleBlue) : '' }`}
                      ><i className="far fa-thumbs-up fa-2x" /></div>
                      <div className={`${css(view.toggleSwitch)}`}><Toggle
                        toggleState={ this.state.isVerified === undefined ? user.isVerified : this.state.isVerified }
                        returnToggleResult={this.returnVerified} /></div>
                    </div>
                  : null }
                  { currentUser.id === userid || currentUser.type === "admin" ?
                    <div className={`${css(view.toggle)}`}>
                      <div id="edit-toggle-pencil" className={`${css(view.toggleIcon)}`}><i className="far fa-edit fa-2x" /></div>
                      <div className={`${css(view.toggleSwitch)}`}>
                        <Toggle toggleState={ this.state.editModeEnabled } returnToggleResult={this.returnEditMode} />
                      </div>
                    </div>
                  : null }
                </div>
              </div>
            </div>
            <div className="columns">
              {/* left column start */}
              <div className="column is-one-third">
                <div className={css(view.currentAvatar)}>
                  { currentAvatar ?
                    <img src={`${currentAvatar.url}`} className={css(view.currentAvatarWrapper)} />
                  : null }
                </div>
                { edit ?
                  <div>
                    <div className={css(view.newAvatar)}>
                      <DragDropUploader
                        header="Upload avatar"
                        fileTypeName="photo"
                        auto={true}
                        uploadToId={user.id}
                        source="Settings-Avatar"
                        fieldname="avatar"
                        mimes="images"
                        endpoint="/avatar-uploader"
                        returnUploadInstance={ this.returnUploadInstance }
                      />
                    </div>
                    <ul className={`${css(view.avatarListWrapper)}`} id="avatarList">
                      { avatars ? avatars.map((av, i) => this.renderAvatar(av, user)) : null }
                    </ul>
                </div>
                : avatarList ?
                    avatarList.map((avRow, i) => (
                      <div key={`row_${i}`} className={`columns`}>
                        { avRow.map(av => (
                          <div key={`avatar_${av.id}`} className={`column is-one-third`}>
                            <img src={`${av.url}`} className={css(view.avatarWrapper)} />
                          </div> ))
                        }
                      </div>
                    ))
                  : null }
                { user.type === "pilot" || (currentUser.type === "admin" && user.type === "pilot") ?
                  <div>
                    <div className={`field ${css(view.fieldModify)}`}>
                      <label className="label">Insurance Uploads</label>
                      { user.insurances ? user.insurances.map((ins, i) => (
                        <article className="message is-link" key={`ins_${i}`}>
                          <div className="message-body">
                            {moment(Date.parse(ins.createdAt)).format('MMMM Do YYYY')} <strong><a href={`${ins.url}`} target="_blank">{ins.type ? ins.type : 'File' }</a></strong>
                          </div>
                        </article>
                      )) : null}
                    </div>
                    <div className={`field ${css(view.fieldModify)}`}>
                      <label className="label">FAA License Uploads</label>
                      { user.licenses ? user.licenses.map((lic, i) => (
                        <article className="message is-primary" key={`lic_${i}`}>
                          <div className="message-body">
                            {moment(Date.parse(lic.createdAt)).format('MMMM Do YYYY')} <strong><a href={`${lic.url}`} target="_blank">{lic.type ? lic.type : 'File' }</a></strong>
                          </div>
                        </article>
                      )) : null }
                    </div>
                  </div>
                : null }
              </div>
              {/* left column end */}
              {/* right column start */}
              <div className="column">
                <div className={`field ${css(view.fieldModify)}`}>
                  <label className="label">Name</label>
                  { edit ?
                    <div className="control">
                      <input
                        onChange={this.handleNameChange}
                        name="new_name"
                        className="input is-medium"
                        type="text"
                        placeholder="Name"
                        defaultValue={user.name} />
                    </div>
                  : <div className="title">{user.name}</div> }
                </div>
                <div className={`field ${css(view.fieldModify)}`}>
                  <label className="label">Email</label>
                  { edit ?
                    <div className="control">
                      <input
                        onChange={this.handleEmailChange}
                        name="new_email"
                        className="input is-medium"
                        type="text"
                        placeholder="Email"
                        defaultValue={user.email} />
                    </div>
                  : <div className="title is-4">{user.email}</div> }
                </div>
                { currentUser.id === userid || currentUser.type === "admin" ?
                  <div className={`field ${css(view.fieldModify)}`}>
                    <label className="label">Connections</label>
                    <div className="columns">
                      <div className="column">
                        <div className={css(view.connections)}>
                          <div className={css(view.apiInfo)}>
                            <div className={css(view.apiIdName)}>
                              { user.type === "agent" ? 'Customer ID' : null }
                              { user.type === "pilot" ? 'Account ID' : null }
                              { user.type === "admin" ? 'ID' : null }
                            </div>
                            <div className={css(view.apiId)}>
                              { this.getConnectionInfo(user) }
                            </div>
                          </div>
                          <div className={`${css(view.connectionIcon)}`}>
                            <img className={`${css(view.connectionIconInner)}`} src={`/${StripeLogo}`} alt="Powered by Stripe" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                : null }
                <div className={`field ${css(view.fieldModify)}`}>
                  <label className="label">Bio</label>
                  { edit ?
                    <div className="control">
                      <textarea
                        onChange={this.handleInputChange}
                        name="bio"
                        className="textarea"
                        placeholder="Tell us about yourself."
                        defaultValue={user.bio}>
                        </textarea>
                    </div>
                  : <p>{user.bio ? user.bio : 'No bio yet.'}</p> }
                </div>
                { edit ?
                  <div className="column">
                    <div className={`field ${css(view.fieldModify)}`}>
                      <div className={`${css(view.changePassword)} columns`}>
                        <div className="column">
                          <label className="label">Change password</label>
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
                        <div className="column">
                          <label className="label">Confirm change password</label>
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
                    </div>
                  </div>
                : null }
                <div className={`field ${css(view.fieldModify)}`}>
                  <label className="label">Contacts</label>
                  <ContactList editMode={this.state.editModeEnabled} contacts={user.contacts} handleReturnedContacts={ this.handleReturnedContacts } />
                </div>
                {/* pilot only */}

                { edit && (user.type === "pilot" || (currentUser.type === "admin" && user.type === "pilot")) ?
                  <div className={`field ${css(view.fieldModify)}`}>
                    <label className="label">Piloting documents</label>
                    <div className="columns">
                      <div className="column">
                        <DragDropUploader
                          header="Upload insurance"
                          padding={true}
                          fileTypeName="proof of insurance"
                          auto={true}
                          source="Signup-Insurance"
                          fieldname="insurance"
                          mimes="documents"
                          endpoint="/insurance-uploader"
                          returnUploadInstance={ this.returnUploadInstance }
                        />
                      </div>
                      <div className="column">
                        <DragDropUploader
                          header="Upload FAA License"
                          padding={true}
                          auto={true}
                          uploadToId={user.id}
                          fileTypeName="FAA license"
                          source="Signup-License"
                          fieldname="license"
                          mimes="documents"
                          endpoint="/license-uploader"
                          returnUploadInstance={ this.returnUploadInstance }
                        />
                      </div>
                    </div>
                    { user.type === "pilot" ?
                      <div className={`field ${css(view.fieldModify)}`}>
                        <label className="label">Pilot location</label>
                        <Location handleReturnedLocation={ this.handleReturnedLocation } />
                      </div>
                     : null }
                  </div>
                : null }
                { edit && (currentUser.id === userid || currentUser.type === "admin") ?
                  <div className="columns">
                    <div className={` column`}>
                      <button
                        className={css(cE.ctaButton, cE.ctaGreen)}
                        onClick={this.handleSubmit}>
                        <span className={css(cE.ctaButtonOverlay)}></span>
                        Save Changes
                      </button>
                    </div>
                  </div>
                : null }
              </div>
              {/* right column end */}
            </div>
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
  graphql( GetAssets, {
    name: "qGetAssets",
    options: ({ userid }) => ({ variables: {
    input: {
      authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
      modelId: userid || jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
      modelType: 'user',
      modelName: 'avatar'
    } } }) }),
  graphql( VerifyUser, {
    props: ({ ownProps, mutate }) => ({
      submitVerify: (id, isVerified) => mutate({
        variables: { input: { id, authorizedId: id, user: { isVerified, refreshToken: true } } },
  }) }) }),
  graphql( DestroyAsset, {
    props: ({ ownProps, mutate }) => ({
      destroyAsset: ( id, userId ) => mutate({
        variables: { input: { id, authorizedId: id, modelId: userId, modelType: 'user', modelName: 'avatar' } },
  }) }) }),
  graphql( ToggleDefaultAsset, {
    props: ({ ownProps, mutate }) => ({
      toggleDefaultAsset: ( id, userId ) => mutate({
        variables: { input: { id, authorizedId: id, modelId: userId, modelType: 'user', modelName: 'avatar' } },
        refetchQueries: [{
          query: GetAssets,
          variables: { input: {
            authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
            modelId: ownProps.userid || jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
            modelType: 'user',
            modelName: 'avatar' } } }]
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
