// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import jwtDecode from 'jwt-decode'
import DragDropUploader from '../assets/drag_drop_uploader'
import GetAssets from '../../queries/asset_collections'
import ToggleDefaultAsset from '../../mutations/toggle_default_asset'
import DestroyAsset from '../../mutations/destroy_asset'
import { dateShort } from '../../utils/helpers'

type Props = {
  toggleDefaultAsset: Function,
  destroyAsset: Function,
  editModeEnabled: boolean,
  currentUser: Object,
  qGetAssets: Object,
  user: Object
}

type State = {
}

class UserAssets extends Component<Props, State> {

  handleToggleDefaultAsset: Function
  handleDestroyAsset: Function
  returnUploadInstance: Function
  renderAvatar: Function

  constructor(props: Object){
    super(props)

    this.state ={

    }

    this.handleToggleDefaultAsset = this.handleToggleDefaultAsset.bind(this)
    this.handleDestroyAsset = this.handleDestroyAsset.bind(this)
    this.returnUploadInstance = this.returnUploadInstance.bind(this)
    this.renderAvatar = this.renderAvatar.bind(this)
  }

  returnUploadInstance(upload){
    console.log('Upload', upload)
    // this.props.qGetAssets.startPolling(1000)
    // setInterval(() => {
    //   this.props.qGetAssets.stopPolling()
    // },60000)
  }

  handleToggleDefaultAsset(e: SyntheticEvent<*>){
    this.props.toggleDefaultAsset(e.currentTarget.getAttribute('assetid'), e.currentTarget.getAttribute('userid'))
  }

  handleDestroyAsset(e: SyntheticEvent<*>){
    this.props.destroyAsset(e.currentTarget.getAttribute('assetid'), e.currentTarget.getAttribute('userid'))
  }

  renderAvatar(av, user){
    return (
      <li key={`avatar_${av.id}`} className="flex mb-2">
        <div className="w-1/4 mr-4">
          <img src={`${av.url}`} className="rounded" />
        </div>
        <div className="w-3/4">
          <div className="mb-3 mt-2 hover:cursor-pointer" onClick={this.handleToggleDefaultAsset} userid={user.id} assetid={av.id}>make default</div>
          <div className="hover:cursor-pointer" onClick={this.handleDestroyAsset} userid={user.id} assetid={av.id}>delete</div>
        </div>
      </li>
    )
  }

  render(){
    const { loading, getAssets } = this.props.qGetAssets
    if(loading){return (<div></div>)}
    const avatars = getAssets.assets
    const currentAvatar = avatars.length > 0 ? avatars.find(av => av.default === true) : null
    const avatarList = avatars.length > 1 ? avatars.filter(av => av.default !== true) : null
    const edit = this.props.editModeEnabled
    return(
      <div>
        { currentAvatar ?
          <img src={`${currentAvatar.url}`} className="rounded-lg" />
        : null }
        { edit ?
          <div className="mt-4">
            <DragDropUploader
              header="Upload avatar"
              fileTypeName="photo"
              auto={true}
              padding={true}
              uploadToId={ this.props.user.id }
              source="Settings-Avatar"
              fieldname="avatar"
              mimes="images"
              endpoint="/uploads/avatar"
              returnUploadInstance={ this.returnUploadInstance }
            />
            <div className="mt-6">
              <h3 className="font-bold mb-2 text-right">Avatars</h3>
              <ul className="" id="avatarList">
                { avatarList ? avatarList.map((av, i) => this.renderAvatar(av, this.props.user)) : null }
              </ul>
            </div>
          </div>
        : avatarList ?
          <div className="flex flex-wrap -mx-2">
            { avatarList.map((av, i) => (
              <div key={`avatar_${av.id}`} className="w-1/3 p-2">
                <img src={`${av.url}`} className="rounded" />
              </div>
            )) }
          </div>
        : null }
        { this.props.user.type === "pilot" || (this.props.currentUser.type === "admin" && this.props.user.type === "pilot") ?
          <div className="mt-6">
            <h3 className="font-bold mb-2 text-right">Piloting documents</h3>
            { this.props.user.insurances ? this.props.user.insurances.map((ins, i) => (
              <article className="my-1" key={`ins_${i}`}>
                <div className="text-right">
                  <strong>Insurance</strong> { dateShort(ins.createdAt) } <strong><a href={`${ins.url}`} target="_blank">{ins.type ? ins.type : 'File' }</a></strong>
                </div>
              </article>
            )) : null}
            { this.props.user.licenses ? this.props.user.licenses.map((lic, i) => (
              <article className="my-1" key={`lic_${i}`}>
                <div className="text-right">
                  <strong>FAA License</strong> { dateShort(lic.createdAt) } <strong><a href={`${lic.url}`} target="_blank">{lic.type ? lic.type : 'File' }</a></strong>
                </div>
              </article>
            )) : null }
            { edit ?
              <div>
                <div className="mb-4 mt-6">
                  <DragDropUploader
                    header="Upload insurance"
                    padding={true}
                    fileTypeName="proof of insurance"
                    auto={true}
                    uploadToId={this.props.user.id}
                    source="Signup-Insurance"
                    fieldname="insurance"
                    mimes="documents"
                    endpoint="/uploads/insurance"
                    returnUploadInstance={ this.returnUploadInstance }
                  />
                </div>
                <div className="mb-4">
                  <DragDropUploader
                    header="Upload FAA License"
                    padding={true}
                    auto={true}
                    uploadToId={this.props.user.id}
                    fileTypeName="FAA license"
                    source="Signup-License"
                    fieldname="license"
                    mimes="documents"
                    endpoint="/uploads/license"
                    returnUploadInstance={ this.returnUploadInstance }
                  />
                </div>
              </div>
            : null }
          </div>
        : null }
      </div>
    )
  }
}

export default compose(
  graphql( GetAssets, {
    name: "qGetAssets",
    options: (props) => {
      console.log('PROPS', props.user.id)
      return { variables: {
    input: {
      authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
      modelId: props.user.id || jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
      modelType: 'user',
      modelName: 'avatar'
    } } } }}),
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
  }) }) })
)(UserAssets)
