// @flow
import React, { Component } from 'react'
import { graphql, compose, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { test, contains } from 'ramda'
import { Player } from 'video-react'
import Config from '../../utils/config'
import { getEnv } from '../../utils/helpers'
import jwtDecode from 'jwt-decode'
import AssetsQuery from '../../queries/asset_collections'
import ToggleDefaultAsset from '../../mutations/toggle_default_asset'
// import CreateSocialMutation from '../../mutations/create_social'
const env = getEnv(window.location.host)
const assetUrl = `${Config.aws.baseUrl}${env}/orders/`

type Props = {
  // handleImageEdit?: Function,
  // setDefaultPhoto?: Function,
  asset: Object,
  orderId?: Number,
  uuid?: string
}

type State = {
  url: string,
  watermarked: boolean
}

class AssetWrapper extends Component<Props, State> {

  // shareTwitter: Function
  // shareFacebook: Function
  // sendMessage: Function
  copyLink: Function
  toggleWatermark: Function
  // setAsDefault: Function
  // handleInputChange: Function
  // cancelShare: Function

  constructor(props: Object){
    super(props)

    this.state ={
      url: `${
        props.asset.type === 'video' ?
          assetUrl + props.asset.assetableId + '/video_wm/' + props.asset.name
        : assetUrl + props.asset.assetableId + '/wm_thumb/' + props.asset.name }`,
      watermarked: true
    }

    // this.shareTwitter = this.shareTwitter.bind(this)
    // this.shareFacebook = this.shareFacebook.bind(this)
    this.copyLink = this.copyLink.bind(this)
    // this.sendMessage = this.sendMessage.bind(this)
    this.toggleWatermark = this.toggleWatermark.bind(this)
    // this.setAsDefault = this.setAsDefault.bind(this)
    // this.handleInputChange = this.handleInputChange.bind(this)
    // this.cancelShare = this.cancelShare.bind(this)
  }

  // shareTwitter(e: SyntheticEvent<*>){
  //   if(this.state.selectedAction === 'twitter'){
  //     this.setState({ selectedAction: '' })
  //   } else {
  //     this.setState({ selectedAction: 'twitter' })
  //   }
  // }
  //
  // shareFacebook(e: SyntheticEvent<*>){
  //   if(this.state.selectedAction === 'facebook'){
  //     this.setState({ selectedAction: '' })
  //   } else {
  //     this.setState({ selectedAction: 'facebook' })
  //   }
  // }

  // handleInputChange(e: SyntheticEvent<*>){
  //   this.setState({ message: e.currentTarget.value }, function(){
  //     console.log('tweet', this.state)
  //   })
  // }
  //
  // cancelShare(){
  //   this.setState({ selectedAction: '' })
  // }
  //
  // async sendMessage(e: SyntheticEvent<*>, createSocial: Function){
  //   const { id, assetableId } = this.props.asset
  //   if(this.state.selectedAction === 'facebook'){
  //
  //   } else if(this.state.selectedAction === 'twitter'){
  //     if(this.state.message && this.state.message.length < 200){
  //       console.log('this.props.asset', this.props.asset)
  //       const resolved = await createSocial({
  //         variables: { input: {
  //           social: {
  //             postedTo: `${this.state.selectedAction}`,
  //             message: `${this.state.url} ${this.state.message ? this.state.message : ''}`,
  //             assetId: id,
  //             orderId: assetableId
  //           }
  //         }
  //       }})
  //
  //       // set status
  //       // console.log('tweet', tweet)
  //     }
  //   }
  // }



  copyLink(e: SyntheticEvent<*>){
    console.log(e)
    // const range = e.currentTarget
    // const selected =
    // e.currentTarget.querySelector('div')
    var range = document.createRange()
    const a = range.selectNode(e.currentTarget)
    // const c = window.getSelection().addRange(a)
    // const b = document.execCommand('copy')
    console.log('hgjhg',a)
  }

  toggleWatermark(e: SyntheticEvent<*>){
    if(this.props.asset.type === 'image'){
      if(this.state.watermarked){
        this.setState((prevState) => ({
          url: prevState.url.replace(/wm_thumb/, 'photo_thumb'),
          watermarked: false }))
      } else {
        this.setState((prevState) => ({
          url: prevState.url.replace(/photo_thumb/, 'wm_thumb'),
          watermarked: true }))
      }
    } else {
      if(this.state.watermarked){
        this.setState((prevState) => ({
          url: prevState.url.replace(/video_wm/, 'video_og'),
          watermarked: false }))
      } else {
        this.setState((prevState) => ({
          url: prevState.url.replace(/video_og/, 'video_wm'),
          watermarked: true }))
      }
    }
  }

  // setAsDefault(e: SyntheticEvent<*>){
  //   if(!this.state.default){
  //     this.props.setDefaultPhoto({
  //       id: this.props.asset.id,
  //       authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
  //       modelId: this.props.orderId,
  //       modelType: 'order',
  //       modelName: 'photo'
  //     }).then(res => {
  //       this.props.handleImageEdit()
  //     })
  //   }
  // }

  render(){
    const wmString = this.state.watermarked ? '/wm/' : '/photo/'
    return(
      <div className="p-4">
        <div className="bg-white rounded shadow">
          { this.props.asset.type === 'video' ?
            <div className="flex flex-wrap pb-4">
              <div className="w-3/4 px-4 mt-4">
                <Player src={ this.state.url } className="rounded-lg" />
                <div className="flex mt-4">
                  <div className="mr-4 flex items-center">
                    Gallery link
                  </div>
                  <div className="flex-1">
                    <input type="text"
                      className="input"
                      name="link"
                      value={`${ window.location.origin }/gallery/${ this.props.uuid ? this.props.uuid : '' }`}
                      readOnly />
                  </div>
                </div>
              </div>
              <div className="w-1/4 px-4 md:pr-8 md:pl-4 mt-8">
                <div className="font-bold mb-4">Your Aerial Video</div>
                <Link className="big-button bg-blue-lightest mb-4" to={`/gallery/${ this.props.uuid ? this.props.uuid : '' }`} target="_blank">
                  Visit Gallery
                </Link>
                <div className="big-button hover mb-4" onClick={ this.copyLink }>Copy link</div>
                <div className="big-button hover mb-4" onClick={ this.toggleWatermark }>Toggle watermark</div>
                <div className="rounded-lg border border-grey-light bg-grey-lighter p-4">
                  <div className="font-bold text-sm">Socialize</div>
                  <p className="text-xs my-2">Would you like to add a link to your Gallery in your message?</p>
                  <textarea
                    className="input h-32 mb-2"
                    placeholder={`Share message`}>
                  </textarea>
                  <div className="flex -mx-2">
                    {/* <Mutation mutation={CreateSocialMutation}>
                      {(createSocial, { loading, error }) => (
                        <div className="flex-1 share-button hover hover:text-twitter" >
                          <i className="fab fa-twitter inline-block"></i><span className=" text-xs inline-block ml-1">Tweet</span>
                        </div>
                      )}
                    </Mutation> */}
                    <div className="flex-1 share-button hover hover:text-facebook">
                      <i className="fab fa-facebook "></i><span className=" text-xs inline-block ml-1">Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          : <div>
            <div className="hover" onClick={ this.toggleWatermark }>
              <img src={ this.state.url } alt={`photo`}  />
            </div>
              <div className="px-4 pt-4">
                <div className="flex flex-wrap -mx-2">
                  {/* { this.state.selectedAction === 'twitter' ?
                    <Mutation mutation={CreateSocialMutation}>
                      {( createSocial, { loading, error }) => (
                        <div className="share-button hover hover:text-twitter" onClick={ e => this.sendMessage(e, createSocial) }>
                          <i className="fab fa-twitter inline-block"></i><span className=" text-xs inline-block ml-1">Send</span>
                        </div>
                      )}
                    </Mutation> : */}
                  <a className="share-button hover hover:text-twitter" href={`https://twitter.com/intent/tweet?url=${
                    assetUrl + this.props.asset.assetableId + wmString + this.props.asset.name}&hashtags=homefilming`} >
                    <i className="fab fa-twitter "></i>
                  </a>
                {/* } */}

                  {/* { this.state.selectedAction === 'facebook' ?
                    <div className="share-button hover hover:text-facebook" onClick={ this.sendMessage }>
                      <i className="fab fa-facebook "></i><span className=" text-xs inline-block ml-1">Share</span>
                    </div> : */}
                  <div className="share-button hover hover:text-facebook">
                    <i className="fab fa-facebook "></i>
                  </div>
                {/* } */}

                  <div className="share-button hover hover:text-facebook">
                    <div className="card-button hover">Copy link</div>
                  </div>

                </div>
              </div>
              {/* <div className="p-4">
                <div className="flex flex-wrap -mx-2">
                  <div className="flex-1 mx-2">
                    <div className="card-button hover">Copy link</div>
                  </div>
                </div>
              </div> */}
            </div> }
          </div>
        </div>
    )
  }
}

export default AssetWrapper
