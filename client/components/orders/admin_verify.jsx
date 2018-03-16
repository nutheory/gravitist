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
    const assets = getAssets.assets.filter(as => as.type === 'image')
    return(
      <div>
        <div className="reviewcontainer">
          <div className="">
            <div className="">Review Videos</div>
          </div>
          <div className="flex flex-wrap md:-mx-4">
            <div className="w-full md:w-1/2 p-4 rounded-lg">
              <Player>
                <source src={ optimized[0].url } />
              </Player>
            </div>
            <div className="w-full md:w-1/2 p-4 rounded-lg">
              <Player>
                <source src={ watermarked[0].url } />
              </Player>
            </div>
          </div>
        </div>
        <div className="my-8">
          <div className="">
            <div className="">Select 20 Acceptable Photos</div>
          </div>
          { assets.length > 0 ?
            <div className="flex flex-wrap md:-mx-4">
              { assets.map((asset, i) =>  (
                <div key={`col_${i}`}
                  onClick={ this.toggleAcceptedImage }
                  className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 relative hover:cursor-pointer"
                  awsid={ asset.awsId } >
                  <div className="relative">
                    <img src={asset.url} className="rounded-lg border border-grey border-solid" />
                    <div className={`img-overlay ${ contains( asset.awsId, this.state.selectedImages ) ? 'opacity-100' : 'opacity-0' }`}>
                      <span className="far fa-check-circle fa-2x"></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          : null }
          <div className="w-full flex justify-end">
            <div className="inline-block">
              <a className="button-green px-8 py-3" onClick={ this.approveOrder }>
                <span className="action-button-overlay"></span>{ this.approveOrderText() }
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
