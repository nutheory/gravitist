import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import style from './styles/styling'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

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
    console.log('MapBOOM')
    let mapContainer = document.getElementById('mapContainer')
    let mapOptions = {
      center: {lat: latLng.lat, lng: latLng.lng},
      zoom: 20,
      mapTypeId: 'satellite',
      scrollwheel: false
    }
    let map = new google.maps.Map(mapContainer, mapOptions)
    console.log('Map',map)
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
        {/* <ValidatorForm> */}
          <div className={css(style.addressAutocompleteForm)}>
            <div className={css(style.addressAutocomplete)}>
              <h4 className={css(style.sectionTitle)}>The home you would like to film</h4>
              {/* <TextValidator
                id="addressToFilm"
                validations={{
                  minLength: 2
                }}
                // validationError="hi"
                name={'location'}
                // hintText="Enter the address of the home you would like to film"
                // floatingLabelText="Enter the address of the home you would like to film"
              /> */}
            </div>
            <div className={css(style.addressAutocompleteSubmit)}>
              {/* <Button
                type="submit"
                label="Signup"
                backgroundColor="#58B8E5"
                labelColor="#fff"
              /> */}
            </div>
          </div>
        {/* </ValidatorForm> */}
        <div className={css(layout.fieldRow)}>
          <div id="mapContainer" className={css(style.mapContainer)}></div>
        </div>
      </div>
    )
  }
}

export default AddressMapper
