import React, { Component } from 'react'
import Formsy from 'formsy-react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { FormsyText } from 'formsy-material-ui/lib'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import style from './styles/styling'

class AddressMapper extends Component {
  constructor(){
    super()
    this.state = {
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
        this.deconstructPlaceIntoState(place)
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

  deconstructPlaceIntoState(place){
    console.log(place)

    const address = place.address_components

    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()

  }


  render(){
    return(
      <div className={css(layout.fieldRow)}>
        <Formsy.Form>
          <div className={css(style.addressAutocompleteForm)}>
            <div className={css(style.addressAutocomplete)}>
              <h4 className={css(style.sectionTitle)}>Subject Address</h4>
              <FormsyText
                id="addressToFilm"
                validations={{
                  minLength: 2
                }}
                name={'location'}
              />
            </div>
          </div>
        </Formsy.Form>
        <div className={css(layout.fieldRow)}>
          <div id="mapContainer" className={css(style.mapContainer)}></div>
        </div>
      </div>
    )
  }
}

export default AddressMapper
