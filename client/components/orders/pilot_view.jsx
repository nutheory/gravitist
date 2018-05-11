// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { graphql, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { find, propEq } from 'ramda'
import { dateTimeShort } from '../../utils/helpers'
import jwtDecode from 'jwt-decode'
import NoteList from '../notes/list'
import PilotBounty from '../dashboard/pilot/bounty'
import TransferReceipt from './transfer_receipt'
import DragDropUploader from '../assets/drag_drop_uploader'
import { Player } from 'video-react'
import OrderOptions from '../../utils/order_dropdowns'
import OrderQuery from '../../queries/get_order'
import MissionQuery from '../../queries/missions'
import OrdersQuery from '../../queries/order_collections'
import JoinPilot from '../../mutations/join_pilot'
import BailPilot from '../../mutations/bail_pilot'
import UploadedVideo from '../../mutations/uploaded_order'
import Plans from '../../utils/pricing_plans.json'

type Props = {
  joinLeaveCollab: Function,
  uploadedVideo: Function,
  updateCallback: Function,
  order: Object,
  bounty: string,
  distance: string,
  duration: string
}

type State = {
  hideIrrelevant: boolean,
  showUploadSuccess: boolean
}

class PilotView extends Component<Props, State> {

  returnUploadInstance: Function
  handleAcceptMission: Function
  handleBailMission: Function
  returnRefetchQueries: Function

  constructor(props: Object){
    super(props)

    this.state = {
      hideIrrelevant: false,
      showUploadSuccess: false
    }

    this.returnUploadInstance = this.returnUploadInstance.bind(this)
    this.handleAcceptMission = this.handleAcceptMission.bind(this)
    this.handleBailMission = this.handleBailMission.bind(this)
    this.returnRefetchQueries = this.returnRefetchQueries.bind(this)
  }

  returnUploadInstance({ hideIrrelevant, showUploadSuccess, keyUrl }){
    this.setState({ hideIrrelevant, showUploadSuccess }, async function(){
      if(showUploadSuccess){
        await this.props.uploadedVideo({ id: this.props.order.id, status: 'uploaded', uploadedAt: new Date(), rawUrl: keyUrl })
        this.props.updateCallback()
      }
    })
  }

  returnRefetchQueries(){
    return [{
      query: OrderQuery,
      variables: { input: {
        id: this.props.order.id,
        authorizedId:  this.props.order.agent.id } } }, {
      query: OrdersQuery,
      variables: { input: {
        options: {
          sortKey: 'createdAt',
          sortValue: 'ASC',
          sizeLimit: 20
        },
        criteria: { status: 'filming' },
        queryString: '' } } }, {
      query: MissionQuery,
      variables: { input: {
        sortKey: 'distanceFromLocation',
        sortValue: 'ASC',
        sizeLimit: 20 } } }]
  }

  async handleAcceptMission(joinPilot: Function, order: Object, e: SyntheticEvent<*>){
    const { data } = await joinPilot({
      variables: {
        input: {
          id: order.id,
          status: 'filming',
          pilotDistance: this.props.distance,
          pilotBounty: this.props.bounty
        }},
       refetchQueries: this.returnRefetchQueries()
    })
  }

  async handleBailMission(bailPilot: Function, order: Object, e: SyntheticEvent<*>){
    const { data } = await bailPilot({
      variables: {
        input: {
          id: order.id,
          authorizedId: order.agentId
        }},
        refetchQueries: this.returnRefetchQueries()
    })
  }

  render(){
    const order = this.props.order
    const plan = find(propEq('name', order.plan))(Plans)
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const isPilot = order && order.pilot && parseInt(order.pilot.id) === user.id
    const status = OrderOptions.statuses.filter(oos => oos.value === order.status)[0]
    const bounty = order.pilotBounty ? order.pilotBounty : this.props.bounty
    const distance = order.pilotDistance ? order.pilotDistance : this.props.distance
    const duration = this.props.duration
    return(
      <div>
        <div className="flex pb-4">
          <div className="flex justify-end items-end"><i className="fas fa-chevron-left"></i><Link to="/dashboard" className="inline-block pl-2" style={{ lineHeight: '1.1rem' }}>Back to dashboard</Link></div>
          <div className="flex-1 text-right text-xl font-bold">Mission - {order.uuid}</div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div id={`order_${ order.id }`} className="w-full">
            <div className="w-full flex">
              <div className="flex-1 pt-4">
                <p className="text-xl font-bold">{ order.address.address1 } { order.address.address2 ? `, ${ order.address.address2 }` : null }</p>
                <p className="text-sm">{ order.address.city }{ order.address.state ? `, ${ order.address.state }`: null } { order.address.zipCode }</p>
              </div>
              <div className="w-64 -mr-4">
                <PilotBounty bounty={ bounty } distance={ distance } />
              </div>
            </div>
          </div>
          { isPilot ?
            <div>
              <div className="w-full flex">
                <div className="flex-1">
                  <label className="block text-xs">Accepted</label>
                  <div className="">
                    <div className="">{ dateTimeShort(order.pilotAcceptedAt) }</div>
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <label className="block text-xs">Status</label>
                  <div className="font-bold">{ status.name }</div>
                </div>
              </div>
              { order.status === "filming" ?
                <div>
                  <div className="my-8 rounded-lg border border-grey-light bg-grey-lighter p-4">
                    <NoteList
                      modelId={ order.id }
                      model="order"
                      title="Add a note about this filming"
                      placeholderText="Special Instructions. ie. Gate codes, Area to film from"
                    />
                  </div>
                  { this.state.hideIrrelevant ? null :
                    <div className="">
                      <div className="font-bold text-sm mb-2">Instructions</div>
                      <p className="text-sm mb-2">In order to complete this mission and receive payment you must upload a single HD video file that
                        is between 10-15 minutes in length, and shows the homes pure beauty. We really encourage all pilots
                        to use creativity and display different types of shots and filming tricks that drones can do so well.
                        These include but are not limited to Aerial Pans, Fly Overs, and Reveals. </p>
                      <p className="text-sm mb-2">Once you upload the video we will review it within 24 hours and transfer a payment to your
                        connected stripe account.</p>
                      <p className="text-sm mb-2">Happy Filming!</p>
                  </div> }
                  <div className="">
                    <DragDropUploader
                      header="Upload filming"
                      fileTypeName="video"
                      padding={true}
                      source="PilotUploadVideo"
                      uploadMethod="S3"
                      fieldname="orders"
                      uploadToId={ order.id }
                      mimes="videos"
                      auto={false}
                      endpoint={`orders/${order.id}/${order.uuid}`}
                      returnUploadInstance={ this.returnUploadInstance }
                    />
                  </div>
                  { this.state.hideIrrelevant ? null :
                    <div className="flex py-2 border border-red-darker bg-red-lightest rounded mt-4">
                      <p className="text-xs px-4 flex items-center">WARNING: Bailing on a mission is basically stating that you can not complete it, and
                        will remove you from this mission and forfeit any bounty you may have wanted.</p>
                      <div className="w-1/2 px-4">
                        <Mutation mutation={BailPilot}>
                          {(bailPilot) => (
                            <button className="button-red" onClick={(e) => this.handleBailMission(bailPilot, order, e) }>
                              <span className="action-button-overlay"></span>Bail on this mission
                            </button>
                          )}
                        </Mutation>
                      </div>
                    </div> }
                </div>
              : order.status === "initial_processing" ?
                <div className="mt-8 rounded-lg border border-grey-light bg-grey-lighter p-4 text-sm">
                  <div className="font-bold mb-2">Upload Completed</div>
                  <p className="">Your upload has completed, we got some processing to do now. We will get back to you shortly.
                    In the meantime why dont you find another mission or check out some new shiny gear. (drone affiliate
                    link as extra revenue source)</p>
                </div>
              : order.status === "awaiting_review" || order.status === "final_processing" ?
                <div className="mt-8 rounded-lg border border-grey-light bg-grey-lighter p-4 text-sm">
                  <div className="font-bold mb-2">Your video is awaiting review</div>
                  <p>Please be patient and allow us 24 hours to process/review your upload and if all is well,
                     we will send your payout along with a email notifying you that payment was sent.</p>
                </div>
              : order.status === "approved_completed" ?
                <div className="">
                  <div className="my-6"><TransferReceipt order={ order } /></div>
                  <div className="mb-2 text-sm font-bold">Submitted video</div>
                  <Player>
                    <source src={order.assets[0].url} />
                  </Player>
                </div>
              : order.status === "rejected" ?
                <div className="">Rejected</div>
              : null }
            </div>
          : <div className="mt-8 mb-2">
            <div className="rounded-lg border border-grey-light bg-grey-lighter p-4">
                <p>By accepting this mission we you are stating that you will fulfill the task of filming
                  with in a 24 hour period. We allow you to accept multiple missions within a 24 hour period
                  but please dont accept more missions than you can complete within our 24 period and during
                  daylight hours (after dawn, and before dusk). Thank you.</p>
                <div className="pt-6">
                  <Mutation mutation={JoinPilot}>
                    {(joinPilot) => (
                      <button className="button-green" onClick={(e) => this.handleAcceptMission(joinPilot, order, e) }>
                        Accept mission for details
                      <span className="action-button-overlay"></span></button>
                    )}
                  </Mutation>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default graphql(UploadedVideo, {
  props: ({ ownProps, mutate }) => ({
    uploadedVideo: ({ id, status, uploadedAt, rawUrl }) => mutate({
      variables: { input: {
        id,
        authorizedId: ownProps.order.pilot.id,
        status,
        uploadedAt,
        rawUrl
      } }
    })
  })
})(PilotView)
