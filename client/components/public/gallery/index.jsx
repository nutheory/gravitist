// @flow
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Player } from 'video-react'
import GalleryImages from './image_gallery'
import { getEnv } from '../../utils/helpers'
import ContactAgent from './contact_agent'
import Config from '../../../utils/config'
import GalleryQuery from '../../../queries/get_gallery'


type Props = {
  // galleryQuery: Object
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
    return (
      <Query query={GalleryQuery} variables={{ input: { uuid: this.props.uuid } }}>
        {({ loading, error, data: { getGallery } }) => {
          if (loading){return <div>Loading...</div>}
          if (error){return <div>Error! {error.message}</div>}
          const photos = getGallery.gallery.galleryAssets.filter(gal => gal.assetableName === 'photo')
          const video = getGallery.gallery.galleryAssets.filter(gal => gal.assetableName === 'video_og')[0]
          const env = getEnv(window.location.host)
          const assetUrl = `${Config.aws.baseUrl}${env}orders/${getGallery.gallery.id}`
          const agent = getGallery.gallery.agent
          const listing = getGallery.gallery.listing
          const address = getGallery.gallery.address
          const contacts = getGallery.gallery.agent.contacts
          return (
            <div className="container mx-auto">
              <div className="flex flex-wrap md:-mx-4">
                <div className="w-full md:w-2/3 lg:w-3/4 p-4">
                  <Player className="rounded-lg shadow-lg" src={ video.url } />
                </div>
                <div className="w-full md:w-1/3 lg:w-1/4 p-4 flex flex-1">
                  <div className="rounded-lg bg-grey-darkest shadow-lg border border-grey-darker p-4 flex h-full flex-col flex-1">
                    <div className="text-sm text-center ">LISTING DETAILS</div>
                    <div className="mt-4">
                      <div className="text-xl font-bold">{ address.address1 ? `${address.address1}` : null }</div>
                      <div className="text-lg">
                        { address.city ? `${address.city}  | ` : null }
                        { address.state ? `${address.state}  | ` : null }
                        { address.zipCode ? `${address.zipCode}` : null }
                      </div>
                    </div>
                    { listing ?
                      <div>
                        <div className="flex pt-6">
                          { listing.beds ?
                            <div className="text-center flex-1">
                              <div className="text-xs">Beds</div>
                              <div className="text-2xl font-bold">{listing.beds}</div>
                            </div>
                          : null }
                          { listing.baths ?
                            <div className="text-center flex-1">
                              <div className="text-xs">Baths</div>
                              <div className="text-2xl font-bold">{listing.baths}</div>
                            </div>
                          : null }
                          { listing.sqft ?
                            <div className="text-center flex-1">
                              <div className="text-xs">SqFt.</div>
                              <div className="text-2xl font-bold">{listing.sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                            </div>
                          : null }
                        </div>
                        <div className="flex pt-4">
                          { listing.price ?
                            <div className="flex-1">
                              <div className="text-xs">List price</div>
                              <div className="text-2xl font-bold">
                                <span className="text-sm align-top leading-normal">$ </span><span className="">{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                              </div>
                            </div>
                          : null }
                          { listing.mlsStatus ?
                            <div className="text-right">
                              <div className="text-xs">Status</div>
                              <div className="text-xl font-bold capitalize">{listing.mlsStatus}</div>
                            </div>
                          : null }
                        </div>
                        <div className="flex pt-4">
                          { listing.type ?
                            <div className="flex-1">
                              <div className="text-xs">Property type</div>
                              <div className="text-xl font-bold capitalize">{listing.type}</div>
                            </div>
                          : null }
                          { listing.mlsNumber ?
                            <div className="text-right">
                              <div className="text-xs">MLS number</div>
                              <div className="text-xl font-bold capitalize">{listing.mlsNumber}</div>
                            </div>
                          : null }
                        </div>
                        { listing.description ?
                          <div className="pt-4">
                            <div className="text-xs">Description</div>
                            <p className="">{listing.description}</p>
                          </div>
                        : null }
                        { listing.features.length > 0 ?
                          <div className="pt-4">
                            <div className="text-xs">Listing features</div>
                            <div className="">
                              { listing.features.map((feat, i) => (
                                <div key={`feat_${i}`} className="my-1 flex">
                                  <div className="text-sm text-right pr-6 w-2/5">{feat.label}</div>
                                  <div className="font-bold flex-1">{feat.value}</div>
                                </div>
                              )) }
                            </div>
                          </div>
                        : null }
                      </div>
                    : null }
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap md:-mx-4">
                <div className="w-full md:w-1/3 lg:w-1/4 p-4">
                  <ContactAgent orderId={getGallery.gallery.id} agent={agent} contacts={contacts} />
                </div>
                <div className="w-full md:w-2/3 lg:w-3/4 p-4">
                  <GalleryImages images={photos} assetUrl={assetUrl} />
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}
export default GalleryView
