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

  handleInputChange: Function

  constructor(props: Object){
    super(props)

    this.state ={
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(){}

  render(){
    const { loading, getAssets } = this.props.assetQuery
    if ( loading ) { return <div>Loading</div> }
    if ( getAssets.assets.length < 1 ) { return <div>Results empty.</div> }
    const optimized = getAssets.assets.filter(as => as.assetableName === 'video_og')[0]
    const images = getAssets.assets.filter(as => as.type === 'image')
    const assets = images ? splitEvery(4, images) : null
    return(
      <div>
        <div>
          <div className="columns">
            <div className="column title is-4">Video</div>
          </div>
          <div className="columns">
            <div className="column">
              <AssetWrapper asset={ optimized } orderId={ this.props.orderId } />
            </div>
            <div className="column">
              <div className="title is-4">Your Aerial Video</div>
              <div >Link to Gallery Page</div>
              <a href={`${ window.location.origin }/gallery/${ this.props.uuid }`} target="_blank">
                {`${ window.location.origin }/gallery/${ this.props.uuid }`}
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="columns">
            <div className="column title is-4">Photos</div>
          </div>
          { assets ? assets.map((assetGroup, i) => (
            <div className="columns" key={`row_${i}`}>
              { assetGroup.map((asset, i) => (
                <div className={`column`} key={`col_${i}`}>
                  <AssetWrapper asset={ asset } orderId={ this.props.orderId } />
                </div>
              ))}
            </div>
          )) : <div className="columns"><div className="column title is-5">No Photos</div></div> }
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(AssetsQuery, {
    name: 'assetQuery',
    options: (props) => ({ variables: { input: {
      modelId: props.orderId,
      modelType: 'order',
      modelName: props.assetNames } } })
  }),
)(AssetViewEdit)
