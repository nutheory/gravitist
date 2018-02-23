// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { splitEvery, contains, indexOf, remove, concat } from 'ramda'
import { css } from 'aphrodite'
import { Player } from 'video-react'
import AssetsQuery from '../../queries/asset_collections'
import ApproveOrder from '../../mutations/approve_order'
import RejectOrder from '../../mutations/reject_order'
import frm from './styles/form'
import cE from '../../styles/common_elements'

type Props = {
  updateCallback: Function,
  approveOrder: Function,
  rejectOrder: Function,
  orderId: Number,
  assetNames: Array<String>,
  user: Object,
  data: Object
}

type State = {
  selectedImages: Array<String>
}

class AdminOrderVerify extends Component<Props, State> {

  approveOrderText: Function
  approveOrder: Function
  toggleAcceptedImage: Function

  constructor(props: Object){
    super(props)

    this.state ={
      selectedImages: []
    }

    this.approveOrderText = this.approveOrderText.bind(this)
    this.approveOrder = this.approveOrder.bind(this)
    this.toggleAcceptedImage = this.toggleAcceptedImage.bind(this)
  }

  toggleAcceptedImage(e: SyntheticEvent<*>){
    const awsId = e.currentTarget.getAttribute('awsid')
    if( contains(awsId, this.state.selectedImages) ){
      const item = indexOf(awsId, this.state.selectedImages)
      this.setState((prevState) => ({ selectedImages: remove(item, 1, prevState.selectedImages) }))
    } else {
      this.setState((prevState) => ({ selectedImages: concat(prevState.selectedImages, [awsId]) }))
    }
  }

  approveOrderText(){
    if(this.state.selectedImages.length > 20){
      return `${this.state.selectedImages.length - 20} too many photos`
    } else if(this.state.selectedImages.length < 20){
      return `Need ${20 - this.state.selectedImages.length} more photos`
    } else {
      return `Accept Video and Photos`
    }
  }

  approveOrder(){
    if(this.state.selectedImages.length === 20){
      this.props.approveOrder({
        id: this.props.orderId,
        authorizedId: this.props.orderId,
        order: { photos: this.state.selectedImages }
      }).then(res => {
        this.props.updateCallback(res)
      })
    }
  }

  render(){
    const { loading, getAssets } = this.props.data
    if ( loading ) { return <div>Loading</div> }
    if ( getAssets.assets.length < 1 ) { return <div>Results empty.</div> }
    const watermarked = getAssets.assets.filter(as => as.assetableName === 'video_wm')
    const optimized = getAssets.assets.filter(as => as.assetableName === 'video_og')
    const images = getAssets.assets.filter(as => as.type === 'image')
    const assets = images ? splitEvery(4, images) : null
    return(
      <div>
        <div className="columns">
          <div className="column title is-4">Review Videos</div>
        </div>
        <div className="columns">
          <div className="column">
            <Player>
              <source src={ optimized[0].url } />
            </Player>
          </div>
          <div className="column">
            <Player>
              <source src={ watermarked[0].url } />
            </Player>
          </div>
        </div>
        <div className="columns">
          <div className="column title is-4">Select 20 Acceptable Photos</div>
        </div>
        { assets ? assets.map((assetGroup, i) => (
          <div className="columns" key={`row_${i}`}>
            { assetGroup.map((asset, i) => (
              <div className={`${css(frm.imageItem)} column`} key={`col_${i}`}>
                <img src={asset.url} />
                <div className={`
                  ${ css(frm.imageActions) }
                  ${ contains(asset.awsId, this.state.selectedImages) ? css(frm.imageSelected) : '' }`}
                  onClick={ this.toggleAcceptedImage }
                  awsid={ asset.awsId }>
                  <span className="icon is-small">
                    <i className={`${css(frm.check)} fas fa-check`}></i>
                  </span>
                </div>
              </div>
            )
          )}
        </div>
        )) : <div className="columns">
          <div className="column title is-5">No Photos</div>
        </div> }
        <div className="columns">
          <div className="column is-4 is-offset-8">
            <div className={css(frm.reviewButton)}>
              <a className={`${css(cE.ctaButton, cE.ctaGreen)}`} onClick={ this.approveOrder }>
                <span className={css(cE.ctaButtonOverlay)}></span>{ this.approveOrderText() }
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(AssetsQuery, {
    options: (props) => ({ variables: { input: {
      modelId: props.orderId,
      modelType: 'order',
      modelName: props.assetNames } } })
  }),
  graphql(ApproveOrder, {
    props: ({ ownProps, mutate }) => ({
      approveOrder: (input) => mutate({
        variables: { input }
  }) }) }),
  graphql(RejectOrder, {
    props: ({ ownProps, mutate }) => ({
      rejectOrder: (input) => mutate({
        variables: { input }
  }) }) })
)(AdminOrderVerify)
