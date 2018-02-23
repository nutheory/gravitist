// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { graphql, compose } from 'react-apollo'
import { find, propEq } from 'ramda'
import Moment from 'moment'
import jwtDecode from 'jwt-decode'
import NoteList from '../notes/list'
import TransferReceipt from './transfer_receipt'
import DragDropUploader from '../assets/drag_drop_uploader'
import { Player } from 'video-react'
import OrderQuery from '../../queries/get_order'
import MissionQuery from '../../queries/missions'
import OrdersQuery from '../../queries/order_collections'
import JoinOrLeaveCollaboration from '../../mutations/join_leave_collaboration'
import UploadedVideo from '../../mutations/uploaded_order'
import views from './styles/views'
import cE from '../../styles/common_elements'
import Plans from '../../utils/pricing_plans.json'

type Props = {
  joinLeaveCollab: Function,
  uploadedVideo: Function,
  order: Object,
  bounty: string,
  distance: string,
  duration: string
}

type State = {
  hideBailOption: boolean,
  showUploadSuccess: boolean
}

class PilotView extends Component<Props, State> {

  returnUploadInstance: Function
  handleAcceptMission: Function
  handleBailMission: Function

  constructor(props: Object){
    super(props)

    this.state = {
      hideBailOption: false,
      showUploadSuccess: false
    }

    this.returnUploadInstance = this.returnUploadInstance.bind(this)
    this.handleAcceptMission = this.handleAcceptMission.bind(this)
    this.handleBailMission = this.handleBailMission.bind(this)
  }

  returnUploadInstance({ hideBailOption, showUploadSuccess, keyUrl }){
    this.setState({ hideBailOption, showUploadSuccess }, function(){
      if(showUploadSuccess === true){
        this.props.uploadedVideo({ id: this.props.order.id, status: 'uploaded', uploadedAt: new Date(), rawUrl: keyUrl })
      }
    })
  }

  handleAcceptMission(e: SyntheticInputEvent<HTMLInputElement>){
    console.log(new Date())
    this.props.joinLeaveCollab({
      id: this.props.order.id,
      status: 'filming',
      pilotDistance: this.props.distance,
      pilotBounty: this.props.bounty })
  }

  handleBailMission(e: SyntheticInputEvent<HTMLInputElement>){
    // console.log(typeof)
    this.props.joinLeaveCollab({
      id: this.props.order.id,
      status: 'recruiting',
      pilotDistance: null,
      pilotBounty: null,
      pilotId: null
    })
  }

  render(){
    const order = this.props.order
    const plan = find(propEq('name', order.plan))(Plans)
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const isPilot = order && order.pilot && parseInt(order.pilot.id) === user.id
    const bounty = order.pilotBounty ? order.pilotBounty : this.props.bounty
    const distance = order.pilotDistance ? order.pilotDistance : this.props.distance
    const duration = this.props.duration
    return(
      <div>
        <h1 className={`${css(views.pageTitle)} title is-4`}>{ order.status === 'approved' ? 'Mission Accomplished' : 'Mission in progress' }</h1>

        <div className={`columns`}>
          <div className={`${css(views.addressHeader)} column`}>
            <div className={`${css(views.addressOneTwoHeader)}`}>
              { order.address.address1 } { order.address.address2 ? `, ${ order.address.address2 }` : null }
            </div>
            <div className={`${css(views.cityStateZip)}`}>
              { order.address.city }{ order.address.state ? `, ${ order.address.state }`: null } { order.address.zipCode }
            </div>
          </div>
          { isPilot ?
            <div className="column is-narrow">
              <div className={css(views.smallTitle)}>Accepted</div>
              <div className={`${css(views.dateHeader)}`}>{ Moment(Date.parse(order.pilotAcceptedAt)).format('MMM Do YYYY') }</div>
            </div>
          : null }
        </div>

        <div className="columns">
          <div className="column">
            <div className={css(views.blueArea)}>
              <div className={css(views.pilotValue)}>${ bounty }</div>
              <div className={css(views.pilotText)}>min. estimated<br />bounty</div>
            </div>
          </div>
          <div className="column">
            <div className={css(views.blueArea)}>
              <div className={css(views.pilotValue)}>{ distance }</div>
              <div className={css(views.pilotText)}>miles est.<br />distance</div>
            </div>
          </div>
          <div className="column">
            <div className={css(views.blueArea)}>
              <div className={css(views.pilotValue)}>{ duration }</div>
              <div className={css(views.pilotText)}>est. drive<br />time</div>
            </div>
          </div>
        </div>
        { isPilot ?
          <div>
            { order.status === 'filming' ?
              <div>
                <div>
                  <div className={`title is-5 ${css(views.notesHeader)} `}>Notes on filming</div>
                  <div>
                    <NoteList
                      notes={ order.notes }
                      modelId={ order.id }
                      model="order"
                      placeholderText="Special Instructions. ie. Gate codes, Area to film from"
                    />
                  </div>
                </div>
                <div className={`${css(views.detailSection, cE.areaBase, cE.yellowObj)}`}>
                  <div className={`title is-6`}>Instructions</div>
                  <p>In order to complete this mission and receive payment you must upload a single HD video file that
                  is between 10-15 minutes in length, and shows the homes pure beauty. We really encourage all pilots
                  to use creativity and display different types of shots and filming tricks that drones can do so well.
                  These include but are not limited to Aerial Pans, Fly Overs, and Reveals. </p><br /><p>Once you upload the video we
                  will review it within 24 hours and transfer a payment to your connected stripe account.</p><br />
                  <p>Happy Filming!</p>
                </div>
                <div className={`${css(views.detailSection)}`}>
                  <DragDropUploader
                    header="Upload filming"
                    fileTypeName="video"
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
                { this.state.hideBailOption ? null :
                  <div className={`message is-danger`}>
                    <div className={`message-body`}>
                      <p>WARNING: Bailing on a mission is basically stating that you can not complete it, and
                        will remove you from this mission and forfeit any bounty you may have wanted.</p><br />
                      <div className={`${css(views.actionInfo)}`}>
                        <a className={`${css(cE.ctaButton, cE.ctaRed)}`} onClick={ this.handleBailMission }>
                          <span className={css(cE.ctaButtonOverlay)}></span>Bail on this mission
                        </a>
                      </div>
                    </div>
                  </div> }
              </div>
            : <div>
              { order.status === 'approved' || order.status === 'completed' ?
                <div>
                  { isPilot && order.status === 'approved' ?
                    <TransferReceipt props={order} />
                  : <div className="columns">
                    <div className="column">
                      <div className={`message is-warning`}>
                        <div className={`message-body`}>
                          <div className="title is-5">Your video is being processed and reviewed</div>
                          <p>Please be patient and allow us 24 hours to process/review your upload and if all is well,
                           we will send your payout along with a email notifying you that payment was sent.</p>
                        </div>
                      </div>
                    </div>
                  </div> }
                  <div className="columns">
                    <div className="column">
                      <div className="title is-5">Submitted Video</div>
                      <Player>
                        <source src={order.assets[0].url} />
                      </Player>
                    </div>
                  </div>
                </div>
               : <div className="columns">
                <div className="column">
                   <div className={`message is-success`}>
                     <div className={`message-body`}>
                       Your upload has completed, we got some processing to do now. We will get back to you shortly.
                       In the meantime why dont you find another mission or check out some new shiny gear. (drone affiliate
                       link as extra revenue source)
                     </div>
                  </div>
                </div>
              </div> }
            </div> }
          </div>
        : <div className={`message is-info`}>
            <div className={`message-body`}>
              <p>By accepting a mission we you are stating that you will fulfill the task of filming
              with in a 24 hour period. We allow you to accept multiple missions within a 24 hour period
              but please dont accept more missions than you can complete within our 24 period and during
              daylight hours (after dawn, and before dusk). Thank you.</p><br />
              <div className={`${css(views.actionInfo)}`}>
                <a className={`${css(cE.ctaButton, cE.ctaGreen)}`} onClick={ this.handleAcceptMission }>
                  <span className={css(cE.ctaButtonOverlay)}></span>Accept mission for details
                </a>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default compose(
  graphql(JoinOrLeaveCollaboration, {
    props: ({ ownProps, mutate }) => ({
      joinLeaveCollab: (input) => {
        console.log('ownProps',ownProps)
        return mutate({
        variables: { input },
        refetchQueries: [{
          query: OrderQuery,
          variables: { input: {
            id: ownProps.order.id,
            authorizedId:  ownProps.order.agent.id } } }, {
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
            sizeLimit: 20 } } }
        ] }) }
    })
  }),
  graphql(UploadedVideo, {
    props: ({ ownProps, mutate }) => ({
      uploadedVideo: ({ id, status, uploadedAt, rawUrl }) => mutate({
        variables: { input: {
          id,
          authorizedId: ownProps.order.pilot.id,
          status,
          uploadedAt,
          rawUrl
        } },
        refetchQueries: [{
          query: OrderQuery,
          variables: { input: {
            id: ownProps.order.id,
            authorizedId: ownProps.order.pilot.id } } }]
      })
    })
  })
)(PilotView)
