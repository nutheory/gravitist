// @flow
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Player } from 'video-react'
import GalleryImages from './image_gallery'
import { getEnv } from '../../../utils/helpers'
import ContactAgent from './contact_agent'
import ListingView from './listing'
import Config from '../../../utils/config'
import GalleryQuery from '../../../queries/get_gallery'


type Props = {
  uuid: Object
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
    console.log(this.props.uuid)
    return (
      <Query query={GalleryQuery} variables={{ input: { uuid: this.props.uuid } }}>
        {({ loading, error, data: { getGallery } }) => {
          if (loading){return <div>Loading...</div>}
          if (error){return <div>Error! {error.message}</div>}
          const env = getEnv(window.location.host)
          const assetUrl = `${Config.aws.baseUrl}${env}/orders/${getGallery.gallery.id}`
          return (
            <div className="container mx-auto">
              { getGallery.gallery.video ?
                <div>
                  <div className="flex flex-wrap md:-mx-4">
                    <div className="w-full md:w-2/3 lg:w-3/4 p-4">
                      <Player
                        className="rounded-lg shadow-lg"
                        src={ getGallery.gallery.video.url } />
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/4 p-4 flex flex-1">
                      <ListingView
                        listing={ getGallery.gallery.listing }
                        address={ getGallery.gallery.address } />
                    </div>
                  </div>
                  <div className="flex flex-wrap md:-mx-4">
                    <div className="w-full md:w-1/3 lg:w-1/4 p-4">
                      <ContactAgent
                        orderId={getGallery.gallery.id}
                        agent={getGallery.gallery.agent}
                        contacts={ getGallery.gallery.agent.contacts } />
                    </div>
                    <div className="w-full md:w-2/3 lg:w-3/4 p-4">
                      <GalleryImages
                        images={getGallery.gallery.photos}
                        assetUrl={assetUrl} />
                    </div>
                  </div>
                </div>
              : <div className="flex flex-wrap md:-mx-4">
                <div className="w-full md:w-1/3 lg:w-1/5 p-4 flex flex-1">
                  <ListingView
                    listing={ getGallery.gallery.listing }
                    address={ getGallery.gallery.address } />
                </div>
                <div className="w-full md:w-2/3 lg:w-3/5 p-4">
                  <GalleryImages
                    images={getGallery.gallery.photos}
                    assetUrl={assetUrl} />
                </div>
                <div className="w-full md:w-1/3 lg:w-1/5 p-4">
                  <ContactAgent
                    orderId={getGallery.gallery.id}
                    agent={getGallery.gallery.agent}
                    contacts={ getGallery.gallery.agent.contacts } />
                </div>
              </div> }
            </div>
          )
        }}
      </Query>
    )
  }
}
export default GalleryView
