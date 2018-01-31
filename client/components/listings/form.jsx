// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import { pathOr, concat, isEmpty, remove, merge, update } from 'ramda'
import FeatureForm from './feature'
import lsf from './styles/form'
import jwtDecode from 'jwt-decode'
import ListingDropdowns from '../../utils/listing_dropdowns.js'
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
  price?: number | null,
  mlsNumber?: string | null,
  description?: string | null,
  type?: string | null,
  status?: string | null,
  features: Array<Object>
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
      type: props.listing ? props.listing.types : null,
      status: props.listing ? props.listing.status : null,
      features: props.listing ? props.listing.features : []
    }

    this.newFeature = this.newFeature.bind(this)
    this.updateFeature = this.updateFeature.bind(this)
    this.removeFeature = this.removeFeature.bind(this)
    this.submitListing = this.submitListing.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount(){
    console.log('listing', this.props.listing)
    // if(pathOr(false, ['listing', 'features'], this.props)){
    //   const feat = this.props.listing.features
    //   this.setState((prevState) => ({ features: concat(prevState.features, feat) }), function(){
    //   })
    // } else {
    //   this.newFeature()
    // }
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value }, function(){
      console.log('state', this.state)
    })
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
        listing: this.state
      })
    } else {
      this.props.createListing({ listing: merge(this.state, { orderId: this.props.order.id}) })
    }
  }

  render(){
    return(
      <div id="listing">
        <div className="title is-4">Listing details</div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  type="number"
                  step="1"
                  min="0"
                  className="input is-medium"
                  placeholder="Beds"
                  name="beds"
                  defaultValue={ this.state.beds }
                  onChange={ this.handleInputChange }
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-bed"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  type="number"
                  step="1"
                  min="0"
                  className="input is-medium"
                  placeholder="Baths"
                  name="baths"
                  defaultValue={ this.state.baths }
                  onChange={ this.handleInputChange }
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-bed"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  type="number"
                  step="1"
                  min="0"
                  className="input is-medium"
                  placeholder="Sqft"
                  name="sqft"
                  defaultValue={ this.state.sqft }
                  onChange={ this.handleInputChange }
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-clone"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  type="number"
                  step="1"
                  min="0"
                  className="input is-medium"
                  placeholder="Price"
                  name="price"
                  defaultValue={ this.state.price }
                  onChange={ this.handleInputChange }
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-usd"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  type="text"
                  className="input is-medium"
                  placeholder="MLS Number"
                  name="mlsNumber"
                  defaultValue={ this.state.mlsNumber }
                  onChange={ this.handleInputChange }
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-slack"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <p className="control">
                <span className="select is-fullwidth">
                  <select onChange={ this.handleInputChange } name="status" defaultValue={ this.state.status }>
                    <option>MLS Status</option>
                    { ListingDropdowns.mlsStatuses.map((stat, i) => (
                      <option
                        key={`status_${i}`}
                        value={ stat.value }
                      >{ stat.name }</option>
                    )) }
                  </select>
                </span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <p className="control">
                <span className="select is-fullwidth">
                  <select onChange={ this.handleInputChange } defaultValue={ this.state.type } name="type">
                    <option>Property Type</option>
                    { ListingDropdowns.propertyTypes.map((type, i) => (
                      <option
                        key={`prop_${i}`}
                        value={ type.value }
                      >{ type.name }</option>
                    )) }
                  </select>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className="textarea"
              name="description"
              placeholder="Description of listing"
              onChange={ this.handleInputChange }></textarea>
          </div>
        </div>
        <div className={`${css(lsf.featuresList)}`}>
          <div className="title is-5">Features</div>
          <ul id="featuresList">
            { this.state.features.map((feat, i) => (
              <li key={`feat_${i}`}>
                <FeatureForm
                  idx={i}
                  removeFeature={ this.removeFeature }
                  updateFeature={ this.updateFeature }
                  feature={feat}
                />
              </li>
            ))}
          </ul>
          <div className="columns">
            <div className="column">
              <a className="" onClick={this.newFeature}>Add another feature</a>
            </div>
            <div className="column">
              <a className="button is-success is-pulled-right" onClick={ this.submitListing }>Save listing info</a>
            </div>
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
