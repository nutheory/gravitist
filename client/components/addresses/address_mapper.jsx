// @flow
import React, { Component } from 'react'
import Whitelist from '../../utils/zipcode_whitelist.json'

type Props = {
  handleReturnedLocation: Function
}

type State = {
  addressVerified: boolean,
  addressSupprted: boolean,
  fullAddress?: string,
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  zip?: string,
  lat?: string,
  lng?: string
}

class AddressMapper extends Component<Props, State> {

  deconstructPlaceIntoState: Function

  constructor(){
    super()
    this.state = {
      addressVerified: false,
      addressSupprted: true
    }

    this.deconstructPlaceIntoState = this.deconstructPlaceIntoState.bind(this)
  }

  componentDidMount(){
    let placeInput = document.getElementById('addressToFilm')
    let placeOptions = {
      componentRestrictions: {
        country: 'us',
      },
    }
    let autocomplete = new google.maps.places.Autocomplete(placeInput, placeOptions)

    google.maps.event.addListener(autocomplete, 'place_changed',  () => {
      let place = autocomplete.getPlace()
      if(place){
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()

        this.normalizeGooglePlace(place)
      }
    })
  }

  normalizeGooglePlace(place: Object){
    let normalized: Object = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }

    place.address_components.forEach((v, k) => {
      switch(v.types[0]){
        case "route": normalized.street = v.long_name; break;
        case "locality": normalized.city = v.long_name; break;
        case "country": normalized.country = v.long_name; break;
        case "street_number": normalized.street_number = v.long_name; break;
        case "postal_code": normalized.zip = v.long_name; break;
        case "administrative_area_level_1": normalized.state = v.short_name; break;
      }
    })

    this.deconstructPlaceIntoState(normalized)
  }

  deconstructPlaceIntoState(np: Object){
    const matches = Whitelist.filter(listitem => listitem.zipcode === np.zip )
    if(matches.length > 0){
      this.setState({
        address1: `${np.street_number} ${np.street}`,
        address2: "",
        city: np.city,
        state: np.state,
        zip: np.zip,
        lat: np.lat,
        lng: np.lng
      }, async () => {
        this.setState({ addressVerified: true, addressSupprted: true })
        this.props.handleReturnedLocation(this.state)
      })
    } else {
      this.setState({ addressSupprted: false })
    }
  }

  render(){
    return(
      <div>
        <div className="relative">
          <input type="textfield" className="input pl-8" id="addressToFilm" />
          <span className="input-icon pin-l">
            <i className="fa fa-home"></i>
          </span>
        </div>
        <div className={`error-area hide-error ${ this.state.addressSupprted ? '' : 'show-error'}`}>
          Unfortunatley the area you selected is not supported yet. Please be patient and check back soon.
        </div>
      </div>
    )
  }
}

export default AddressMapper
