// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { pathOr, concat, isEmpty, remove, merge, update, omit } from 'ramda'
import FeatureForm from './feature'
import jwtDecode from 'jwt-decode'
import ListingDropdowns from '../../utils/listing_dropdowns.js'
import { cleansePrice } from '../../utils/helpers'
import CreateListing from '../../mutations/create_listing'
import UpdateListing from '../../mutations/update_listing'

type Props = {
  listing?: Object,
  order: Object,
  createListing: Function,
  updateListing: Function
}

type State = {
  beds?: number | null,
  baths?: number | null,
  sqft?: number | null,
  price?: string | null,
  mlsNumber?: string | null,
  description?: string | null,
  type?: string | null,
  mlsStatus?: string | null,
  features: Array<Object>,
  updated: boolean
}

class ListingForm extends Component<Props, State> {

  newFeature: Function
  updateFeature: Function
  removeFeature: Function
  submitListing: Function
  handleInputChange: Function

  constructor(props){
    super(props)

    this.state = {
      beds: props.listing ? props.listing.beds : null,
      baths: props.listing ? props.listing.baths : null,
      sqft: props.listing ? props.listing.sqft : null ,
      price: props.listing ? props.listing.price : null,
      mlsNumber: props.listing ? props.listing.mlsNumber : null,
      description: props.listing ? props.listing.description : null,
      type: props.listing ? props.listing.type : null,
      mlsStatus: props.listing ? props.listing.mlsStatus : null,
      features: props.listing ? props.listing.features : [],
      updated: false
    }

    this.newFeature = this.newFeature.bind(this)
    this.updateFeature = this.updateFeature.bind(this)
    this.removeFeature = this.removeFeature.bind(this)
    this.submitListing = this.submitListing.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount(){
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.name === "price" ? cleansePrice(e.currentTarget.value) : e.currentTarget.value })
  }

  checkFeaturesValidated(){

  }

  newFeature(){
    const nFeature = { id: `new-${Math.floor(Math.random() * 999999)}`, label: "", value: "" }
    this.setState((prevState) => ({ features: this.state.features.concat(nFeature) }))
  }

  updateFeature(upd: Object){
    this.setState((prevState) => ({ features: update(upd.idx, upd, prevState.features) }))
  }

  removeFeature(idx: number){
    this.setState(prevState => ({ features: remove(idx, 1, prevState.features) }))
  }

  submitListing(){
      if(this.props.listing){
        this.props.updateListing({
          id: this.props.listing.id,
          authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id,
          listing: omit(['updated'], this.state)
        }).then(res => this.setState({ updated: true }))
      } else {
        const state = omit(['updated'], this.state)
        this.props.createListing({
          listing: merge(state, { orderId: this.props.order.id})
        }).then(res => this.setState({ updated: true }))
      }
  }

  render(){
    return(
      <div id="listing" className="bg-white rounded shadow p-4">
        <h3 className="font-bold">Listing details</h3>
        <p className="text-sm py-2">These added details will be displayed on your gallery page.</p>
        <div className="flex -mx-2 my-4">
          <div className="px-2 w-1/4">
            <div className="text-xs">Beds</div>
            <input
              type="number"
              step="1"
              min="0"
              className="input"
              placeholder="Beds"
              name="beds"
              defaultValue={ this.state.beds }
              onChange={ this.handleInputChange }
            />
          </div>
          <div className="px-2 w-1/4">
            <div className="text-xs">Baths</div>
            <input
              type="number"
              step="0.5"
              min="0"
              className="input"
              placeholder="Baths"
              name="baths"
              defaultValue={ this.state.baths }
              onChange={ this.handleInputChange }
            />
          </div>
          <div className="px-2 flex-1">
            <div className="text-xs">Sqft</div>
            <input
              type="number"
              step="1"
              min="0"
              className="input"
              placeholder="Sqft"
              name="sqft"
              defaultValue={ this.state.sqft }
              onChange={ this.handleInputChange }
            />
          </div>
        </div>
        <div className="flex -mx-2 my-4">
          <div className="mx-2 flex-1">
            <div className="text-xs">Price</div>
            <input
              type="text"
              step="1"
              min="0"
              className="input"
              placeholder="Price"
              name="price"
              defaultValue={ this.state.price }
              onChange={ this.handleInputChange }
            />
          </div>
          <div className="mx-2 flex-1">
            <div className="text-xs">MLS Number</div>
            <input
              type="text"
              className="input"
              placeholder="MLS Number"
              name="mlsNumber"
              defaultValue={ this.state.mlsNumber }
              onChange={ this.handleInputChange }
            />
          </div>
        </div>
        <div className="flex -mx-2 my-4">
          <div className="mx-2 flex-1">
            <div className="text-xs">Property type</div>
            <div className="inline-block relative w-full">
              <select className="" onChange={ this.handleInputChange } defaultValue={ this.state.type } name="type">
                <option>Property Type</option>
                { ListingDropdowns.propertyTypes.map((type, i) => (
                  <option key={`prop_${i}`} value={ type.value }>{ type.name }</option>
                )) }
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="mx-2 flex-1">
            <div className="text-xs">MLS Status</div>
            <div className="inline-block relative">
              <select onChange={ this.handleInputChange } name="mlsStatus" defaultValue={ this.state.mlsStatus }>
                <option>MLS Status</option>
                { ListingDropdowns.mlsStatuses.map((stat, i) => (
                  <option key={`status_${i}`} value={ stat.value }>{ stat.name }</option>
                )) }
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full my-4">
          <div className="text-xs">Description</div>
          <textarea
            className="input"
            name="description"
            defaultValue={ this.state.description }
            placeholder="Description of listing"
            onChange={ this.handleInputChange }></textarea>
        </div>
        <div className="w-full my-4">
          <div className="text-sm font-bold">Features</div>
          <ul id="featuresList">
            { this.state.features.map((feat, i) => (
              <li key={`feat_${i}`}>
                <FeatureForm
                  idx={i}
                  removeFeature={ this.removeFeature }
                  updateFeature={ this.updateFeature }
                  feature={feat} />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <div className="flex-1">
            <a className="" onClick={this.newFeature}>Add feature</a>
          </div>
          <div className="inline-block text-right">
            <button className=" action-button button-green" onClick={ this.submitListing }>
              { this.state.updated ? 'Saved.' : 'Save listing info' }
            <span className=" action-button-overlay"></span></button>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(CreateListing, {
    props: ({ ownProps, mutate }) => ({
      createListing: (input) => mutate({
        variables: { input }
      }) }) }),
  graphql(UpdateListing, {
    props: ({ ownProps, mutate }) => ({
      updateListing: (input) => mutate({
        variables: { input }
      }) }) })
)(ListingForm)
