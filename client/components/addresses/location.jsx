// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import AddressMapper from './address_mapper'
import cE from '../../styles/common_elements'
import loc from './styles/location'
const radiusOpts = [10, 20, 30, 40, 50]

type Props = {
  handleReturnedLocation: Function
}

type State = {
  isFinding: boolean,
  isGeolocatable: boolean,
  radiusOpen: boolean,
  workRadius?: number,
  properRadiusText?: string,
  lat?: string,
  lng?: string
}

class WorkArea extends Component<Props, State> {

  handleRadiusChange: Function
  toggleRadiusOpen: Function
  geolocateSuccess: Function
  geolocateError: Function
  handleMapperLocation: Function
  showAddressMapper: Function
  findLocation: Function

  constructor(){
    super()

    this.state ={
      radiusOpen: false,
      isGeolocatable: true,
      isFinding: false
    }

    this.toggleRadiusOpen = this.toggleRadiusOpen.bind(this)
    this.handleRadiusChange = this.handleRadiusChange.bind(this)
    this.geolocateSuccess = this.geolocateSuccess.bind(this)
    this.geolocateError = this.geolocateError.bind(this)
    this.handleMapperLocation = this.handleMapperLocation.bind(this)
    this.showAddressMapper = this.showAddressMapper.bind(this)
    this.findLocation = this.findLocation.bind(this)
  }

  componentDidMount(){
    if(!navigator.geolocation){ this.setState({ isGeolocatable: false }) }
  }

  handleMapperLocation(position: Object){
    this.setState({ lat: position.lat, lng: position.lng }, function(){
      this.props.handleReturnedLocation(this.state)
    })
  }

  showAddressMapper(){
    return <AddressMapper handleReturnedLocation={ this.handleMapperLocation } />
  }

  showGeolocatorButton(){
    return (
      <a className={`button ${css(loc.button)}`} onClick={ this.findLocation }>
        <span className="icon">
          <i className={`fa fa-${ this.state.lat ? ('check ' + css(loc.buttonSuccessText)) : 'location-arrow' }`}></i>
        </span>
        <span>{ this.state.lat ? 'Got it, thanks' : 'Get Location Information' }</span>
      </a>
    )
  }

  handleRadiusChange(e: SyntheticEvent<*>){
    if(e){
      this.setState({
        workRadius: e.currentTarget.getAttribute('radius'),
        properRadiusText: e.currentTarget.getAttribute('proper'),
        radiusOpen: !this.state.radiusOpen
      }, function(){
        this.props.handleReturnedLocation(this.state)
      })
    }
  }

  toggleRadiusOpen(){
    this.setState({ radiusOpen: !this.state.radiusOpen })
  }

  geolocateSuccess(position: Object){
    this.setState({ lat: position.coords.latitude, lng: position.coords.longitude }, function(){
      this.props.handleReturnedLocation(this.state)
    })
  }

  geolocateError(){
    this.setState({ isGeolocatable: false })
  }

  findLocation(){

    try{
      navigator.geolocation.getCurrentPosition(this.geolocateSuccess, this.geolocateError)
    } catch(e){
      this.geolocateError
    }
  }

  render(){
    return (
      <div className={`message is-info ${css(loc.posForSpinner)}`}>
        <div id="fetching-location-coords" className={`${css(loc.spinner)} ${ this.state.isFinding ? css(loc.spinnerShow) : '' }`}>
          <i className="fa fa-cog fa-spin fa-2x fa-fw" aria-hidden="true"></i>
        </div>
        <div className="message-body">
          <p className={css(loc.textBottomMargin)}>In order to send you local homes to film we need to gather your location information
            and the radius of the area you would like to work.</p>
          <div className="columns">
            <div className="column is-narrow">
              <div className={`dropdown ${ this.state.radiusOpen ? 'is-active' : '' }`}>
                <div className="dropdown-trigger">
                  <button
                    onClick={this.toggleRadiusOpen}
                    className="button is-medium"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu">
                    <span>{ this.state.properRadiusText ? this.state.properRadiusText : 'Work radius' }</span>
                    <span className="icon is-small">
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    { radiusOpts.map((rad, i) =>
                      <a
                        radius={rad}
                        proper={`${rad.toString()} miles`}
                        onClick={this.handleRadiusChange}
                        className={`dropdown-item ${css(loc.fixDropdownItemLinks)}`}
                        key={`radius_${rad.toString()}`}>
                        {`${rad.toString()} miles`}</a>
                    ) }
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              { this.state.isGeolocatable ? this.showGeolocatorButton() : this.showAddressMapper() }
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default WorkArea
