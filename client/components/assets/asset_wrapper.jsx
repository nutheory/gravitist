// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { graphql, compose } from 'react-apollo'
import { test, contains } from 'ramda'
import { Player } from 'video-react'
import Config from '../../utils/config'
import Axios from 'axios'
import asw from './styles/asset_wrapper'
import jwtDecode from 'jwt-decode'
import ToggleDefaultAsset from '../../mutations/toggle_default_asset'
const env = window.location.host === 'homefilming.com' ? '' : 'development/'
const assetUrl = `${Config.aws.baseUrl}${env}orders/`

type Props = {
  setDefaultPhoto: Function,
  asset: Object,
  orderId: Number
}

type State = {
  url: string,
  watermarked: boolean,
  default: boolean,
  selectedAction: string,
  twitterMessage: string,
  facebookMessage: string
}

class AssetWrapper extends Component<Props, State> {

  shareTwitter: Function
  shareFacebook: Function
  sendMessage: Function
  copyLink: Function
  toggleWatermark: Function
  setAsDefault: Function

  constructor(props: Object){
    super(props)

    this.state ={
      url: `${
        props.asset.type === 'video' ?
          Config.aws.baseUrl + props.asset.awsId
        : assetUrl + props.asset.assetableId + '/wm_thumb/' + props.asset.name }`,
      watermarked: true,
      default: props.asset.default,
      twitterMessage: '',
      facebookMessage: '',
      selectedAction: ''
    }

    this.shareTwitter = this.shareTwitter.bind(this)
    this.shareFacebook = this.shareFacebook.bind(this)
    this.copyLink = this.copyLink.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.toggleWatermark = this.toggleWatermark.bind(this)
    this.setAsDefault = this.setAsDefault.bind(this)
  }

  shareTwitter(e: SyntheticEvent<*>){
    if(this.state.selectedAction === 'twitter'){
      this.setState({ selectedAction: '' })
    } else {
      this.setState({ selectedAction: 'twitter' })
    }
  }

  shareFacebook(e: SyntheticEvent<*>){
    if(this.state.selectedAction === 'facebook'){
      this.setState({ selectedAction: '' })
    } else {
      this.setState({ selectedAction: 'facebook' })
    }
  }

  async sendMessage(e: SyntheticEvent<*>){
    if(this.state.selectedAction === 'facebook'){

    } else if(this.state.selectedAction === 'twitter'){
      if(this.state.twitterMessage.length < 200){

        const tweet = await Axios.post('https://api.twitter.com/1.1/statuses/update.json', {
          status: `${this.state.url} ${this.state.twitterMessage}`
        })
        console.log('tweet', tweet)
      }
    }
  }

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

  setAsDefault(e: SyntheticEvent<*>){
    this.props.setDefaultPhoto({
      id: this.props.asset.id,
      authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
      modelId: this.props.orderId,
      modelType: 'order',
      modelName: 'photo'
    }).then(res => {
      this.setState({ default: true })
    })
  }

  render(){
    console.log('this.state.url', this.state.selectedAction)
    return(
      <div className={css(asw.assetWrapper)}>
        { this.state.selectedAction !== '' ?
          <div className={`${css(asw.formArea)}`}>
            { this.state.selectedAction.match(/^(twitter|facebook)$/) ?
              <div className={css(asw.tinyForm)}>
                <div className="field">
                  <div className="control">
                    <textarea
                      className={`textarea ${css(asw.formText)}`}
                      placeholder={`${ this.state.selectedAction.charAt(0).toUpperCase()+this.state.selectedAction.substring(1) } message`}>
                    </textarea>
                  </div>
                </div>
                <div>
                  <div>
                    <div onClick={ this.sendMessage } className={`button is-small ${css(asw[`${this.state.selectedAction}Button`])}`}>
                      <span className="icon is-small">
                        <i className={`fab fa-${this.state.selectedAction}`}></i>
                      </span>
                      <span>Send</span>
                    </div>
                  </div>
                </div>
              </div>
            : <div>hjgjhgj</div> }
          </div>
        : <div className={css(asw.asset)}>
          {this.props.asset.type === 'video' ?
            <Player src={ this.state.url } />
          : <img src={ this.state.url } alt={`photo`} /> }
          </div> }
        <div className={css(asw.sidebar)}>
          <div className={css(asw.icon, asw.twitter)}>
            <div onClick={ this.shareTwitter }><i className="fab fa-twitter"></i></div>
          </div>
          <div className={css(asw.icon, asw.facebook)}>
            <div onClick={ this.shareFacebook }><i className="fab fa-facebook"></i></div>
          </div>
          <div className={css(asw.icon, asw.link)}>
            <div onClick={ this.copyLink } >
              <div className={css(asw.linkForm)}>{ this.state.url }</div>
              <i className="fas fa-link"></i>
            </div>
          </div>
          <div className={css(asw.spacer)}></div>
          <div className={`${css(asw.icon, asw.watermark)} ${ this.state.watermarked ? css(asw.watermarked) : ''}`}>
            <div onClick={ this.toggleWatermark }>
              <i className="fa fa-tint"></i>
            </div>
          </div>
          <div className={css(asw.icon, asw.default)}>
            <div onClick={ this.setAsDefault }>
              { this.state.default ? <i className={`fa fa-star ${css(asw.isDefault)}`}></i> : <i className="far fa-star"></i> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(ToggleDefaultAsset, {
    props: ({ ownProps, mutate }) => ({
      setDefaultPhoto: (input) => mutate({
        variables: { input }
  }) }) }),
)(AssetWrapper)
