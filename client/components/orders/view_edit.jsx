// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import { splitEvery, pick, propOr } from 'ramda'
import moment from 'moment'
import ListingForm from '../listings/form'
import OrderViewEditForm from './form'
import Loading from '../misc/loader'
import jwtDecode from 'jwt-decode'
import DragDropUploader from '../assets/drag_drop_uploader'
import GetOrder from '../../queries/get_order'

type Props = {
  data: Object,
}

type State = {
  loading: boolean
}

class OrderViewEdit extends Component<Props, State>{
  constructor(){
    super()

    this.state = {
      loading: false
    }
  }

  render(){
    const { loading, getOrder } = this.props.data
    if(loading){return (<div></div>)}
    return(
      <div>
        { this.state.loading ? <Loading /> : null }
        <div className="columns is-centered">
          <div className="column is-four-fifths is-narrow">
            <div className="columns">
              <div className="column is-three-fifths">
                <div className="message">
                  <div className="message-body">
                    <OrderViewEditForm order={getOrder.order} />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="message is-link">
                  <div className="message-body">
                    <ListingForm listing={getOrder.order.listing} order={getOrder.order} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql( GetOrder, { options: ({ orderid }) => ({ variables: {
    input: { id: orderid, authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id } } }) }),
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
