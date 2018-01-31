// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite'
import { find, propEq } from 'ramda'
import jwtDecode from 'jwt-decode'
import UserBadge from '../../users/badge'
import NoteList from '../../notes/list'
import DragDropUploader from '../../assets/drag_drop_uploader'
import OrderQuery from '../../../queries/get_order'
import JoinOrLeaveCollaboration from '../../../mutations/join_leave_collaboration'
import UploadedVideo from '../../../mutations/uploaded_order'
import MapDirections from '../../addresses/map_directions'
import msn from '../styles/missions'
import Plans from '../../../utils/pricing_plans.json'
import cE from '../../../styles/common_elements'

type Props = {
  joinLeaveCollab: Function,
  uploadedVideo: Function,
  order: Object
}

type State = {
  duration?: number,
  pilotDistance?: number,
  pilotBounty?: number,
  mapDirectionsVisible: boolean,
  hideBailOption: boolean,
  showUploadSuccess: boolean
}

class MissionView extends Component<Props, State> {

  handleMapLoaded: Function
  returnUploadInstance: Function
  handleAcceptMission: Function
  handleBailMission: Function

  constructor(props){
    super(props)

    this.state = {
      mapDirectionsVisible: false,
      hideBailOption: false,
      showUploadSuccess: false
    }

    this.handleMapLoaded = this.handleMapLoaded.bind(this)
    this.returnUploadInstance = this.returnUploadInstance.bind(this)
    this.handleAcceptMission = this.handleAcceptMission.bind(this)
    this.handleBailMission = this.handleBailMission.bind(this)
  }

  handleMapLoaded({ distance, duration }){
    const { order } = this.props.order.result
    const plan = find(propEq('name', order.plan))(Plans)
    console.log('distance', distance)
    this.setState({
      duration,
      pilotDistance: distance,
      pilotBounty: Math.round(parseInt(plan ? plan.bounty : 0) + distance),
      mapDirectionsVisible: order.pilot ? true : false })
  }

  returnUploadInstance({ hideBailOption, showUploadSuccess, keyUrl }){
    const { order } = this.props.order.result
    this.setState({ hideBailOption, showUploadSuccess }, function(){
      if(showUploadSuccess === true){
        this.props.uploadedVideo({ id: order.id, status: 'uploaded', uploadedAt: new Date(), rawUrl: keyUrl })
      }
    })
  }

  handleAcceptMission(e: SyntheticInputEvent<HTMLInputElement>){
    const { order } = this.props.order.result
    this.props.joinLeaveCollab({
      id: order.id,
      status: 'filming',
      pilotDistance: this.state.pilotDistance,
      pilotBounty: this.state.pilotBounty })
  }

  handleBailMission(e: SyntheticInputEvent<HTMLInputElement>){
    const { order } = this.props.order.result
    this.props.joinLeaveCollab({
      id: order.id,
      status: 'recruiting',
      pilotDistance: null,
      pilotBounty: null,
      pilotId: null,
      pilotAcceptedAt: null
    })
  }

  render(){
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const { result, loading, error } = this.props.order
    if (loading) {
      return <p>Loading...</p>
    } else if (error) {
      return <p>Error!</p>
    } else {
      const isPilot = result.order && result.order.pilot && parseInt(result.order.pilot.id) === user.id
      return (
        <div className={`${css(msn.viewContainer)} columns is-centered`}>
          <div className={`column is-two-thirds`}>
            <div>
              <div className={`column`}>
                <div className={`${css(msn.missionHeader)} columns`}>
                  <div className={`${css(msn.addressHeader)} column`}>
                    <div className={`${css(msn.addressOneTwoHeader)}`}>
                      {result.order.address.address1}{result.order.address.address2 ? `, ${result.order.address.address2}` : null }
                    </div>
                    <div className={`${css(msn.cityStateZip)}`}>
                      {result.order.address.city}{result.order.address.state ? `, ${result.order.address.state}`: null } {result.order.address.zipCode}
                    </div>
                  </div>
                  <div className={`${css(msn.infoItemHeader)} column is-narrow`}>
                    <div className={`${css(msn.value)}`}>${this.state.pilotBounty}</div>
                    <div className={`${css(msn.label)}`}>bounty</div>
                  </div>
                  <div className={`${css(msn.infoItemHeader)} column is-narrow`}>
                    <div className={`${css(msn.value)}`}>{this.state.pilotDistance}</div>
                    <div className={`${css(msn.label)}`}>distance</div>
                  </div>
                  <div className={`${css(msn.infoItemHeader)} column is-narrow`}>
                    <div className={`${css(msn.value)}`}>{this.state.duration}</div>
                    <div className={`${css(msn.label)}`}>drive time</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={`columns`}>
                <div className={`${css(msn.mapContainer)} column `}>
                  <div className={`title is-5`}>Location</div>
                  <MapDirections
                    htf={result.order.address}
                    location={user.address}
                    directionsVisible={ isPilot }
                    returnMapInfo={ this.handleMapLoaded } />
                </div>
                <div className={`column`}>
                  <div className={`title is-5`}>Details</div>
                  { isPilot ?
                    <div className={`${css(msn.pilotOnlyWrapper)}`}>
                      <div className={`${css(msn.detailSection)}`}>
                        <UserBadge user={result.order.agent} flavor="blue" link={true} />
                      </div>
                      <div className={`${css(msn.detailSection, cE.areaBase, cE.yellowObj)}`}>
                        <div className={`title is-6`}>Instructions</div>
                        <p>In order to complete this mission and receive payment you must upload a single HD video file that
                        is between 10-15 minutes in length, and shows the home pure beauty. We really encourage all pilots
                        to use creativity and display different types of shots and filming tricks that drones can do so well.
                        These include but are not limited to Aerial Pans, Fly Overs, and Reveals. </p><br /><p>Once you upload the video we
                        will review it within 24 hours and transfer a payment to your connected stripe account.</p><br />
                        <p>Happy Filming!</p>
                      </div>
                      <div className={`${css(msn.detailSection)}`}>
                        <div className={`title is-6`}>Notes / Special Instructions</div>
                        <NoteList
                          notes={ result.order.notes }
                          modelId={ result.order.id }
                          model="order"
                          placeholderText="Special Instructions. ie. Gate codes, Area to film from"
                        />
                      </div>
                      <div className={`${css(msn.detailSection)}`}>
                        <DragDropUploader
                          header="Upload filming"
                          fileTypeName="video"
                          source="PilotUploadVideo"
                          uploadMethod="S3"
                          fieldname="orders"
                          uploadToId={ result.order.id }
                          mimes="videos"
                          auto={false}
                          endpoint={`orders/${result.order.id}/`}
                          returnUploadInstance={ this.returnUploadInstance }
                        />
                      </div>
                      { this.state.hideBailOption ? null :
                        <div className={`message is-danger`}>
                          <div className={`message-body`}>
                            <p>WARNING: Bailing on a mission is basically stating that you can not complete it, and
                              will remove you from this mission and forfeit any bounty you may have wanted.</p><br />
                            <div className={`${css(msn.actionInfo)}`}>
                              <a className={`${css(cE.ctaButton, cE.ctaRed)}`} onClick={ this.handleBailMission }>
                                <span className={css(cE.ctaButtonOverlay)}></span>Bail on this mission
                              </a>
                            </div>
                          </div>
                        </div> }
                    </div>
                  : <div className={`message is-info`}>
                      <div className={`message-body`}>
                        <p>By accepting a mission we you are stating that you will fulfill the task of filming
                        with in a 24 hour period. We allow you to accept multiple missions within a 24 hour period
                        but please dont accept more missions than you can complete within our 24 period and during
                        daylight hours (after dawn, and before dusk). Thank you.</p><br />
                        <div className={`${css(msn.actionInfo)}`}>
                          <a className={`${css(cE.ctaButton, cE.ctaGreen)}`} onClick={ this.handleAcceptMission }>
                            <span className={css(cE.ctaButtonOverlay)}></span>Accept mission for details
                          </a>
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default compose(
  graphql(OrderQuery, {
    options: (props) => ({variables: { input: {
      id: props.missionid,
      authorizedId:  props.authid } } }),
    props: ({ data: { getOrder, loading, error } }) => ({
      order: {
        error,
        loading,
        result: getOrder
      }
    })
  }),
  graphql(JoinOrLeaveCollaboration, {
    props: ({ ownProps, mutate }) => ({
      joinLeaveCollab: ({ id, status, pilotDistance, pilotBounty, pilotId, pilotAcceptedAt }) => mutate({
        variables: { input: {
          id,
          status,
          pilotDistance,
          pilotBounty,
          pilotId,
          pilotAcceptedAt
        } },
        refetchQueries: [{
          query: OrderQuery,
          variables: { input: {
            id: ownProps.missionid,
            authorizedId:  ownProps.authid } } }] })
    })
  }),
  graphql(UploadedVideo, {
    props: ({ ownProps, mutate }) => ({
      uploadedVideo: ({ id, status, uploadedAt, rawUrl }) => mutate({
        variables: { input: {
          id,
          authorizedId: ownProps.order.result.order.pilot.id,
          status,
          uploadedAt,
          rawUrl
        } },
        refetchQueries: [{
          query: OrderQuery,
          variables: { input: {
            id: ownProps.missionid,
            authorizedId: ownProps.order.result.order.pilot.id } } }]
      })
    })
  })
)(MissionView)
