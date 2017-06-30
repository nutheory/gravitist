import React, { Component } from 'react'
import Formsy from 'formsy-react'
import TextField from 'material-ui/TextField'
import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'
import { FormsyText } from 'formsy-material-ui/lib'
import { css } from 'aphrodite'
// import layout from './styles/layout'
import mapper from './styles/mapper'

class AddressMapper extends Component {
  constructor(){
    super()
    this.state = {
      fullAddress: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      lat: "",
      lng: ""
    }

    this.fetchAssociatedMap = this.fetchAssociatedMap.bind(this)
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
        this.fetchAssociatedMap({lat, lng})
      }
    })
  }

  fetchAssociatedMap(latLng){
    let mapContainer = document.getElementById('mapContainer')
    let mapOptions = {
      center: {lat: latLng.lat, lng: latLng.lng},
      zoom: 20,
      mapTypeId: 'satellite',
      scrollwheel: false
    }

    let map = new google.maps.Map(mapContainer, mapOptions)
  }

  normalizeGooglePlace(place){
    let normalized = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }

    _.each(place.address_components, (v, k) => {
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

  deconstructPlaceIntoState(np){

    this.setState({
      address1: `${np.street_number} ${np.street}`,
      address2: "",
      city: np.city,
      state: np.state,
      zip: np.zip,
      lat: np.lat,
      lng: np.lng
    }, () => {
      this.props.setTargetAddress(this.state)
    })

  }

  shouldComponentUpdate(nextProps, nextState){
    return false
  }

  render(){
    return(
      <div className={css(mapper.mapForm)}>
        <input type="textfield" className={css(mapper.locationField)} id="addressToFilm" />
        <div className={css(mapper.mapArea)}>
          <div id="mapContainer"  className={css(mapper.mapContainer)}></div>
        </div>
      </div>
    )
  }
}

export default AddressMapper
