// @flow
import React, { Component } from 'react'
import AddressMapper from './address_mapper'
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
      <a className={` action-button button-blue hover:cursor-pointer`} onClick={ this.findLocation }>
        <span className="icon">
          <i className={`inline-block mr-3 fas fa-${ this.state.lat ? 'check text-green-dark' : 'location-arrow' }`}></i>
        </span>
        <span>{ this.state.lat ? 'Got it, thanks' : 'Get Location Information' }</span>
        <span className=" action-button-overlay"></span>
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
    this.setState({ isFinding: false, lat: position.coords.latitude, lng: position.coords.longitude }, function(){
      this.props.handleReturnedLocation(this.state)
    })
  }

  geolocateError(){
    this.setState({ isFinding: false, isGeolocatable: false })
  }

  findLocation(){
    this.setState({ isFinding: true }, function(){
      try{
        navigator.geolocation.getCurrentPosition(this.geolocateSuccess, this.geolocateError)
      } catch(e){
        this.geolocateError
      }
    })
  }

  render(){
    return (
      <div className={`relative rounded-lg border border-grey-light bg-grey-lighter p-4`}>
        <div id="fetching-location-coords" className={`spinner ${ this.state.isFinding ? 'opacity-100' : '' }`}>
          <i className="fa fa-cog fa-spin fa-2x fa-fw" aria-hidden="true"></i>
        </div>

        <p className="text-sm">In order to send you local homes to film we need to gather your location information
          and the radius of the area you would like to work.</p>
        <div className="flex mt-4">
          <div className="mr-4">
            <div className={`dropdown relative ${ this.state.radiusOpen ? 'is-active' : '' }`}>
              <div className="dropdown-trigger hover:cursor-pointer" onClick={this.toggleRadiusOpen}>
                <button
                  className="select-faker"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu">
                  <span>{ this.state.properRadiusText ? this.state.properRadiusText : 'Work radius' }</span>
                  <span className="inline-block ml-6">
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className={`dropdown-menu ${ this.state.radiusOpen ? 'block' : 'hidden' }`} id="dropdown-menu" role="menu">
                <div className="p-2 flex flex-wrap bg-white border border-grey rounded">
                  { radiusOpts.map((rad, i) =>
                    <a
                      radius={rad}
                      proper={`${rad.toString()} miles`}
                      onClick={this.handleRadiusChange}
                      className="w-full block px-2 py-1 hover:cursor-pointer"
                      key={`radius_${rad.toString()}`}>
                      {`${rad.toString()} miles`}</a>
                  ) }
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            { this.state.isGeolocatable ? this.showGeolocatorButton() : this.showAddressMapper() }
          </div>
        </div>
      </div>
    )
  }

}

export default WorkArea
