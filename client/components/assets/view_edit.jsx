// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { splitEvery, contains, indexOf, remove, concat } from 'ramda'
import { css } from 'aphrodite'
import { Link } from 'react-router-dom'
import { Player } from 'video-react'
import Config from '../../utils/config'
import AssetWrapper from './asset_wrapper'
import AssetsQuery from '../../queries/asset_collections'


type Props = {
  assetQuery: Function,
  orderId: Number,
  uuid: string
}

type State = {
}

class AssetViewEdit extends Component<Props, State> {

  handleImageEdit: Function

  constructor(props: Object){
    super(props)

    this.state ={
    }

    this.handleImageEdit = this.handleImageEdit.bind(this)
  }

  handleImageEdit(){
    this.props.assetQuery.refetch()
  }

  render(){
    const { loading, getAssets } = this.props.assetQuery
    if ( loading ) { return <div>Loading</div> }
    if ( getAssets.assets.length < 1 ) { return <div>Results empty.</div> }
    const optimized = getAssets.assets.filter(as => as.assetableName === 'video_og')[0]
    const assets = getAssets.assets.filter(as => as.type === 'image')
    return(
      <div>
        <div>
          <div className="my-8">
            <div className="font-bold text-xl my-2">Video</div>
            <div className="md:-mx-4">
              <div className="">
                <AssetWrapper asset={ optimized } orderId={ this.props.orderId } uuid={ this.props.uuid } />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="my-8">
            <div className="font-bold text-xl my-2">Photos</div>
            <div className="flex flex-wrap -mx-4">
              { assets.map((asset, i) => (
                <div className="w-full md:w-1/4" key={`col_${i}`}>
                  <AssetWrapper asset={ asset } orderId={ this.props.orderId } handleImageEdit={ this.handleImageEdit } uuid={ this.props.uuid } />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(AssetsQuery, {
  name: 'assetQuery',
  options: (props) => ({ variables: { input: {
    modelId: props.orderId,
    modelType: 'order',
    modelName: props.assetNames } } })
})(AssetViewEdit)
