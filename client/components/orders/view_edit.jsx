// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import { splitEvery, pick, propOr, find, propEq } from 'ramda'
import moment from 'moment'
import ListingForm from '../listings/form'
import OrderAdminForm from './admin_form'
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
    console.log('RES', res)
    // this.props.data.startPolling(5000).then(
    //
    // )
  }

  userTypeContent({ order, user }){
    if(user.type === 'admin'){
      return <OrderAdminForm order={order} />
    } else if(user.type === 'pilot') {
      return <OrderPilotView
        order={order}
        duration={ this.state.duration }
        distance={ this.state.pilotDistance }
        bounty={ this.state.pilotBounty }  />
    } else {
      return <OrderAgentView order={order} />
    }
  }

  userTypeSidebar({ order, user }){
    if(user.type === 'admin'){
      return <ListingForm listing={ order.listing } order={ order } />
    } else if(user.type === 'pilot') {
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
    return(
      <div>
        { this.state.loading ? <Loading /> : null }
        <div className="message">
          <div className="message-body">
            <div className="columns">
              <div className="column is-three-fifths">
                { this.userTypeContent({ order: getOrder.order, user: currentUser }) }
              </div>
              <div className="column">
                <div className="message is-link">
                  <div className="message-body">
                    { this.userTypeSidebar({ order: getOrder.order, user: currentUser }) }
                  </div>
                </div>
              </div>
            </div>
            <div>
              { this.userTypeResult({ order: getOrder.order, user: currentUser }) }
            </div>
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
  // graphql( VerifyUser, {
  //   props: ({ ownProps, mutate }) => ({
  //     submitVerify: (id, isVerified) => mutate({
  //       variables: { input: { id, authorizedId: id, user: { isVerified, refreshToken: true } } },
  //       refetchQueries: [
  //         { query: GetUsers,
  //           variables: { input: { options: {
  //             sortKey: ownProps.sortBy || 'createdAt',
  //             sortValue: ownProps.sortDirection  || 'DESC',
  //             sizeLimit: ownProps.sizeLimit || 100
  //           }, criteria: {} } } }]
  //     }) }) }),
  // graphql( UpdateUser, {
  //   props: ({ ownProps, mutate }) => ({
  //     submitUser: (input) => mutate({ variables: { input: input } }) }) })
)(OrderViewEdit)
