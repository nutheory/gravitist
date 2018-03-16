// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import { splitEvery, pick, propOr, find, propEq } from 'ramda'
import moment from 'moment'
import ListingForm from '../listings/form'
import OrderAdminView from './admin_view'
import OrderAgentView from './agent_view'
import OrderPilotView from './pilot_view'
import AgentResults from './agent_results'
import AssetViewEdit from '../assets/view_edit'
import AdminOrderVerify from './admin_verify'
import MapDirections from '../addresses/map_directions'
import Loading from '../misc/loader'
import jwtDecode from 'jwt-decode'
import DragDropUploader from '../assets/drag_drop_uploader'
import GetOrder from '../../queries/get_order'
import Plans from '../../utils/pricing_plans.json'

type Props = {
  data: Object,
}

type State = {
  mapDirectionsVisible: boolean,
  duration?: number,
  pilotDistance?: number,
  pilotBounty?: number,
  isProcessing?: boolean
}

class OrderViewEdit extends Component<Props, State>{

  handleMapLoaded: Function
  userTypeContent: Function
  userTypeSidebar: Function
  updateCallback: Function

  constructor(){
    super()

    this.state = {
      mapDirectionsVisible: false
    }

    this.handleMapLoaded = this.handleMapLoaded.bind(this)
    this.userTypeContent = this.userTypeContent.bind(this)
    this.userTypeSidebar = this.userTypeSidebar.bind(this)
    this.updateCallback = this.updateCallback.bind(this)
  }

  handleMapLoaded({ distance, duration }){
    const { order } = this.props.data.getOrder
    const plan = find(propEq('name', order.plan))(Plans)
    this.setState({
      duration,
      pilotDistance: distance,
      pilotBounty: Math.round(parseInt(plan ? plan.bounty : 0) + distance),
      mapDirectionsVisible: order.pilot ? true : false })
  }

  updateCallback(res){
    this.props.data.startPolling(5000)
  }

  userTypeContent({ order, user }){
    if(user.type === 'admin'){
      return <OrderAdminView order={order} />
    } else if(user.type === 'pilot') {
      return <OrderPilotView
        order={ order }
        updateCallback={ this.updateCallback }
        duration={ this.state.duration }
        distance={ this.state.pilotDistance }
        bounty={ this.state.pilotBounty }  />
    } else {
      return <OrderAgentView order={order} />
    }
  }

  userTypeSidebar({ order, user }){
    if(user.type === 'pilot') {
      return <MapDirections
        htf={ order.address }
        location={ user.address }
        directionsVisible={ order.pilot ? true : false }
        returnMapInfo={ this.handleMapLoaded } />
    } else {
      return <ListingForm listing={ order.listing } order={ order } />
    }
  }
  userTypeResult({ order, user }){
    if(user.type === 'admin'){
      if(order.status === 'awaiting_review'){
        return <AdminOrderVerify
          orderId={ order.id }
          assetNames={['images', 'video_wm', 'video_og']}
          user={ user }
          updateCallback={ this.updateCallback } />
      } else if(order.status === 'final_processing'){
        return (<div>Final proccessing</div>)
      } else if(order.status === 'approved_completed'){
        return <AssetViewEdit
          orderId={ order.id }
          uuid={ order.uuid }
          assetNames={['photo', 'video_og']}
          user={ user } />
      }
    } else if(user.type === 'pilot') {
      return null
    } else {
      if(order.status === 'approved_completed'){
        return <AssetViewEdit
          orderId={ order.id }
          uuid={ order.uuid }
          assetNames={['photo', 'video_og']}
          user={ user } />
      }
    }
  }

  render(){
    const { loading, getOrder } = this.props.data
    const currentUser = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    if(loading){return (<div>Loading...</div>)}
    console.log('pollingCheck', getOrder)
    if(currentUser.type === "admin" && getOrder.order.status === "approved_completed" ||
      currentUser.type === "pilot" && getOrder.order.status === "awaiting_review"){
      this.props.data.stopPolling()
    }
    return(
      <div>
        { this.state.loading ? <Loading /> : null }
        <div className="container py-8">
          <div className="flex flex-wrap md:-mx-4">
            <div className="w-full md:w-3/5">
              <div className="p-4">
                { this.userTypeContent({ order: getOrder.order, user: currentUser }) }
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="p-4">
                { this.userTypeSidebar({ order: getOrder.order, user: currentUser }) }
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="boogie">
            { this.userTypeResult({ order: getOrder.order, user: currentUser }) }
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql( GetOrder, { options: ({ orderid }) => ({ variables: {
    input: {
      id: orderid,
      authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id } } }) }),
)(OrderViewEdit)
