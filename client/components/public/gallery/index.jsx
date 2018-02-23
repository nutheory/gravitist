// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { graphql, compose } from 'react-apollo'
import { Player } from 'video-react'
import Config from '../../../utils/config'
import { Link } from 'react-router-dom'
import GalleryQuery from '../../../queries/get_gallery'
import gly from './styles/gallery'


type Props = {
  galleryQuery: Object
}

type State = {

}

class GalleryView extends Component<Props, State> {

  constructor(props: Object){
    super(props)

    this.state ={

    }
  }

  render(){
    const { loading, getGallery } = this.props.galleryQuery
    if(loading){ return(
      <div>loading...

      </div>
    )}
    const photos = getGallery.gallery.galleryAssets.filter(gal => gal.assetableName === 'photo')
    const video = getGallery.gallery.galleryAssets.filter(gal => gal.assetableName === 'video_og')[0]
    const env = window.location.host === 'homefilming.com' ? '' : 'development/'
    const assetUrl = `${Config.aws.baseUrl}${env}orders/${getGallery.gallery.id}`
    const agent = getGallery.gallery.agent
    const listing = getGallery.gallery.listing
    const address = getGallery.gallery.address
    const contacts = getGallery.gallery.agent.contacts
    console.log('contacts',contacts)
    return(
      <div>
        <div className={css(gly.listingContainer)}>
          <div className={css(gly.videoLeft)}>
            <Player src={ video.url } />
          </div>
          <div className={css(gly.dataRight)}>
            { address.address1 ? `${address.address1}` : null }<br/>
            { address.city ? `${address.city}  | ` : null }
            { address.state ? `${address.state}  | ` : null }
            { address.zipCode ? `${address.zipCode}` : null }<br/>
            { listing.beds ? `${listing.beds}` : null }<br/>
            { listing.baths ? `${listing.baths}` : null }<br/>
            { listing.price ? `${listing.price}` : null }<br/>
            { listing.sqft ? `${listing.sqft}` : null }<br/>
            { listing.type ? `${listing.type}` : null }<br/>
            { listing.mlsStatus ? `${listing.mlsStatus}` : null }<br/>
            { listing.mlsNumber ? `${listing.mlsNumber}` : null }<br/>
            { listing.description ? `${listing.description}` : null }<br/>
            { agent.avatar.url ? `${agent.avatar.url}` : null }<br/>
            { agent.name ? `${agent.name}` : null }<br/>
            { agent.bio ? `${agent.bio}` : null }<br/>
            { contacts.map((cnt,i) => (
              <div key={`contact_${i}`}>{cnt.type} :: {cnt.content}</div>
            )) }
          </div>
        </div>

        <div className="">
          { photos.map((ph, i) => (
              <img key={`photo_${i}`} src={ `${assetUrl}/photo_thumb/${ph.name}` } />
          ))}
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(GalleryQuery, {
    name: 'galleryQuery',
    options: (props) => ({ variables: { input: {
      uuid: props.match.params.uuid } } }) }),
)(GalleryView)
