// @flow
import React, { Component } from 'react'
import { graphql, compose, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { test, contains } from 'ramda'
import FacebookProvider, { Feed } from 'react-facebook-sdk'
import { Player } from 'video-react'
import Config from '../../utils/config'
import { getEnv } from '../../utils/helpers'
import jwtDecode from 'jwt-decode'
import AssetsQuery from '../../queries/asset_collections'
import ToggleDefaultAsset from '../../mutations/toggle_default_asset'
// import CreateSocialMutation from '../../mutations/create_social'
const env = getEnv(window.location.host)
const assetUrl = `${Config.aws.baseUrl}${env}/orders/`
const shareUrl = `${Config.base_url[env]}/gallery/order`

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
                <Link className="no-underline block text-center rounded shadow p-2 border border-grey bg-blue-lightest mb-4" to={`/gallery/${ this.props.uuid ? this.props.uuid : '' }`} target="_blank">
                  Visit Gallery
                </Link>
                <div className="no-underline block text-center rounded shadow p-2 border border-grey hover mb-4" onClick={ this.copyLink }>Copy link</div>
                <div className="no-underline block text-center rounded shadow p-2 border border-grey hover mb-4" onClick={ this.toggleWatermark }>Toggle watermark</div>
                <div className="rounded-lg border border-grey-light bg-grey-lighter p-4">
                  <div className="font-bold text-sm">Socialize</div>
                  <p className="text-xs my-2">Would you like to add a link to your Gallery in your message?</p>
                  <textarea
                    className="input h-32 mb-2"
                    placeholder={`Share message`}>
                  </textarea>
                  <div className="flex -mx-2">
                    <div className="flex-1 mx-2 bg-white rounded shadow py-1 text-center hover hover:text-facebook">
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
                  <a className="flex-1 hover hover:text-twitter" href={`https://twitter.com/intent/tweet?url=${shareUrl}/${this.props.asset.assetableId}/asset/${this.props.asset.id}&hashtags=gravitist`} >
                    <i className="fab fa-twitter "></i>
                  </a>
                  <FacebookProvider appId="1507022829407993">
                    <Feed
                      href="http://www.facebook.com"
                      name="Hello"
                      link={`${shareUrl}/${this.props.asset.assetableId}/asset/${this.props.asset.id}`}>
                      <button type="button"><i className="fab fa-facebook "></i></button>
                    </Feed>
                  </FacebookProvider>
                  <div className="flex-1 hover hover:text-facebook">
                    <div className="text-blue-darker border border-blue-darker py-1 px-4 rounded-full text-xs text-center hover">Copy link</div>
                  </div>
                </div>
              </div>
            </div> }
          </div>
        </div>
    )
  }
}

export default AssetWrapper
