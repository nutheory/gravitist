// @flow
import React, { Component } from 'react'
import { graphql, compose, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { test, contains } from 'ramda'
import FacebookProvider, { Feed } from 'react-facebook-sdk'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Player } from 'video-react'
import Config from '../../utils/config'
import { getEnv } from '../../utils/helpers'
import jwtDecode from 'jwt-decode'
import AssetsQuery from '../../queries/asset_collections'
import ToggleDefaultAsset from '../../mutations/toggle_default_asset'
// import CreateSocialMutation from '../../mutations/create_social'
const env = getEnv(window.location.host)
const assetUrl = `${Config.aws.baseUrl}${env}/orders/`
const shareUrl = `${Config.base_url[env]}/gallery`

type Props = {
  // handleImageEdit?: Function,
  // setDefaultPhoto?: Function,
  asset: Object,
  orderId?: Number,
  uuid?: string
}

type State = {
  clipboardValue: string,
  url: string,
  copied: boolean,
  watermarked: boolean
}

class AssetWrapper extends Component<Props, State> {

  toggleWatermark: Function

  constructor(props: Object){
    super(props)

    this.state ={
      clipboardValue: '',
      copied: false,
      url: `${
        props.asset.type === 'video' ?
          assetUrl + props.asset.assetableId + '/video_wm/' + props.asset.name
        : assetUrl + props.asset.assetableId + '/wm_thumb/' + props.asset.name }`,
      watermarked: true
    }

    this.toggleWatermark = this.toggleWatermark.bind(this)
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
              <div className="w-1/4 px-4 md:pr-8 md:pl-4 mt-4">
                <div className="font-bold mb-4">Your Listing Gallery</div>
                <Link className="btn-asset-white bg-blue-lightest" to={`/gallery/${ this.props.uuid ? this.props.uuid : '' }`} target="_blank">
                  View Gallery
                </Link>
                <FacebookProvider appId="1507022829407993">
                  <Feed
                    href="http://www.facebook.com"
                    name="Hello"
                    link={`${shareUrl}/gallery/${ this.props.uuid ? this.props.uuid : '' }`}>
                    <div className="btn-asset-white"><i className="fab fa-facebook text-facebook"></i> Share Gallery</div>
                  </Feed>
                </FacebookProvider>
                <a className="btn-asset-white" href={`https://twitter.com/intent/tweet?url=${shareUrl}/gallery/${ this.props.uuid ? this.props.uuid : '' }&hashtags=gravitist`} >
                  <i className="fab fa-twitter text-twitter"></i> Tweet Gallery
                </a>
                <CopyToClipboard
                  text={`${shareUrl}/gallery/${ this.props.uuid ? this.props.uuid : '' }`}
                  onCopy={ () => this.setState({copied: true}) }>
                  <div className="btn-asset-white"><i className="fas fa-link text-grey-light"></i> Copy Gallery Link { this.state.copied ? <i className="fas fa-check text-grey-light"></i> : null }</div>
                </CopyToClipboard>
                <div className="font-bold mt-8 mb-4">Share video only</div>
                <div className="btn-asset-white" onClick={ this.toggleWatermark }>Toggle watermark</div>
                <div className="flex -mx-2">
                  <div className="mx-2 flex-1">
                    <FacebookProvider appId="1507022829407993">
                      <Feed
                        href="http://www.facebook.com"
                        name="Hello"
                        link={`${shareUrl}/order/${this.props.asset.assetableId}/asset/${this.state.watermarked ? 'wm' : 'og'}/${this.props.asset.name}`}>
                        <div className="btn-asset-white"><i className="fab fa-facebook fa-2x text-facebook"></i></div>
                      </Feed>
                    </FacebookProvider>
                  </div>
                  <div className="mx-2 flex-1">
                    <a className="btn-asset-white" href={`https://twitter.com/intent/tweet?url=${shareUrl}/order/${this.props.asset.assetableId}/asset/${this.state.watermarked ? 'wm' : 'og'}/${this.props.asset.name}&hashtags=gravitist`} >
                      <i className="fab fa-twitter fa-2x text-twitter"></i>
                    </a>
                  </div>
                  <div className="mx-2 flex-1">
                    <CopyToClipboard
                      text={`${shareUrl}/order/${this.props.asset.assetableId}/asset/${this.state.watermarked ? 'wm' : 'og'}/${this.props.asset.name}`}
                      onCopy={ () => this.setState({copied: true}) }>
                      <div className="btn-asset-white"><i className="fas fa-link fa-2x text-grey-light"></i>{ this.state.copied ? <i className="fas fa-check text-grey-light"></i> : null }</div>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>
          : <div>
            <div className="hover" onClick={ this.toggleWatermark }>
              <img src={ this.state.url } alt={`photo`}  />
            </div>
              <div className="p-2">
                <div className="flex">
                  <FacebookProvider appId="1507022829407993">
                    <Feed
                      href="http://www.facebook.com"
                      name="Hello"
                      link={`${shareUrl}/order/${this.props.asset.assetableId}/asset/${this.props.asset.name}`}>
                      <div className="ml-2 mr-4">
                        <button type="button"><i className="fab fa-facebook fa-2x text-facebook"></i></button>
                      </div>
                    </Feed>
                  </FacebookProvider>
                  <a className="hover hover:text-twitter" href={`https://twitter.com/intent/tweet?url=${shareUrl}/order/${this.props.asset.assetableId}/asset/${this.props.asset.name}&hashtags=gravitist`} >
                    <i className="fab fa-twitter fa-2x text-twitter"></i>
                  </a>
                  <div className="mx-4">
                    <CopyToClipboard
                      text={`${shareUrl}/order/${this.props.asset.assetableId}/asset/${this.state.watermarked ? 'wm' : 'og'}/${this.props.asset.name}`}
                      onCopy={ () => this.setState({copied: true}) }>
                      <button><i className="fas fa-link fa-2x text-grey-light"></i></button>
                    </CopyToClipboard>
                  </div>
                  <div className="self-end">{ this.state.copied ? 'Copied.' : null }</div>
                </div>
              </div>
            </div> }
          </div>
        </div>
    )
  }
}

export default AssetWrapper
