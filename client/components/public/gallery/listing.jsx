// @flow
import React from 'react'

const ListingView = (props: Object) => {
  const address = props.address
  const listing = props.listing
  return (
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
  )
}

export default ListingView
