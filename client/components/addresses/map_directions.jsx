// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import mdr from './styles/map_directions'

type Props = {
  htf: Object,
  location: Object,
  directionsVisible: boolean,
  returnMapInfo: Function
}

type State = {
  distance?: number,
  duration?: number,
  directions?: Array<string>,
  lat?: string,
  lng?: string
}

class MapDirections extends Component<Props, State> {

  initMap: Function
  calculateAndDisplayRoute: Function

  constructor(){
    super()
    this.state = {
      directions: []
    }

    this.initMap = this.initMap.bind(this)
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this)
  }

  componentDidMount(){
    this.initMap()
  }

  initMap() {
    const ths = this
    const markerArray = [];
    const directionsService = new google.maps.DirectionsService
    const map = new google.maps.Map(document.getElementById('mapArea'), {
      zoom: 13,
      center: {lat: ths.props.location.lat, lng: ths.props.location.lng}
    })

    const directionsDisplay = new google.maps.DirectionsRenderer({map: map})
    const stepDisplay = new google.maps.InfoWindow
    this.calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map)
  }

  calculateAndDisplayRoute(directionsDisplay: any, directionsService: any , markerArray: any, stepDisplay: any, map: any) {
    for (var i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(null)
    }
    const ths = this
    directionsService.route({
      origin: `${ths.props.location.lat},${ths.props.location.lng}`,
      destination: `${ths.props.htf.lat},${ths.props.htf.lng}`,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        const directions = []
        const distance = response.routes[0].legs[0].distance.value
        const duration = response.routes[0].legs[0].duration.value
        response.routes[0].legs[0].steps.map(st => directions.push(st.instructions))
        ths.setState({ distance, duration, directions }, () => {
          ths.props.returnMapInfo({
            distance: (Math.round( (parseInt(ths.state.distance) / 1609.34) * 10 ) / 10),
            duration: (Math.round( parseInt(ths.state.duration) / 60) ).toString().split('.')[0]
          })
        })
        directionsDisplay.setDirections(response)
      }
    })
  }

  render(){
    return(
      <div className={css(mdr.mapContainer)}>
        <div id='mapArea' className={css(mdr.mapArea)}></div>
        <ul id="drivingDirections" className={css(mdr.mapDirections)}  style={{display: `${this.props.directionsVisible ? 'block' : 'none'}`}}>
          <li className={`title is-5`}>Driving directions</li>
          { this.state.directions ? this.state.directions.map((dir, i) =>
            <li key={`direction_${i}`}
              className={css(mdr.mapDirectionItem)}
              dangerouslySetInnerHTML={{__html: `<i class="fa fa-map-pin ${css(mdr.mapDirectionIcon)}"></i> <div class="${css(mdr.mapDirectionText)}">${dir}</div>`}}></li>) : null }
        </ul>
      </div>
    )
  }
}

export default MapDirections
