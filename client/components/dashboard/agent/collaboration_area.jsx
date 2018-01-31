// @flow
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { css } from 'aphrodite'
import cl from '../styles/collaboration'
import moment from 'moment'
import { graphql } from 'react-apollo'
import OrderQuery from '../../../queries/get_order'
import jwtDecode from 'jwt-decode'

type Props = {
  order: Object
}

type State = {
  order: Object
}

class CollaborationArea extends Component<Props, State>{
  constructor(){
    super()
    this.state = {
      order: {}
    }
  }

  componentDidMount(){
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    console.log('USER', user)
  }

  // runOrderQuery(){
  //   const { loading, order } = this.props.getOrder({
  //     variables: {
  //       input: {
  //         id: props.order,
  //         authorizedId: user.id
  //       }
  //     }
  //   })
  // }

  // ,
  // options: (props) => {
  //   const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
  //   props.order.id ? return props.order.getOrder = props.order :
  //   return { variables: { input: { id: props.order, authorizedId: user.id } } }
  // }
  //   console.log('match', this.props)
  // }

  render(){
    const { result, loading, error } = this.props.order
    if (loading) {
      return <p>Loading...</p>
    } else if (error) {
      return <p>Error!</p>
    } else {
      const details = result.order
      return (
        <div className={css(cl.container)}>
          <article>
            <h1 className="title">Order placed on {moment(details.createdAt).format('MMMM Do YYYY, h:mma')}</h1>
            <p className={`${css(cl.headerTags)}`}>
              <span className={`tag is-primary ${css(cl.tagRight)}`}>Plan</span>
              <span className={`tag is-light ${css(cl.tagRight)}`}>{details.plan}</span>
              <span className={`tag is-primary ${css(cl.tagRight)}`}>Receipt</span>
              <span className={`tag is-light ${css(cl.tagRight)}`}>{details.receiptId}</span>
            </p>
            <p className={`${css(cl.headerTags)}`}>
              <span className={`tag is-primary ${css(cl.tagRight)}`}>Address</span>
              <span className={`tag is-light ${css(cl.tagRight)}`}>{details.address.address1}</span>
              <span className={`tag is-light ${css(cl.tagRight)}`}>{details.address.city}</span>
              <span className={`tag is-light ${css(cl.tagRight)}`}>{details.address.zipCode}</span>
            </p>
            <p className={`${css(cl.headerTags)}`}>
              <span className={`tag is-warning ${css(cl.tagRight)}`}>Status</span>
              <span className={`tag is-light ${css(cl.tagRight)}`}>{details.status}</span>
            </p>
            <h2 className="subtitle">Videos</h2>
            <ul className="columns is-multiline">
              {details.assets.map(ph => {
                return <li key={ph.id} className={`column is-one-quarter`}><img src={ph.url} className={css(cl.imgTweak)} /></li>
              })}
              <li className="DashboardContainer">
                {/* <Upload /> */}
              </li>
            </ul>
            <h2 className="subtitle">Photos</h2>
            <ul className="columns is-multiline">
              {details.assets.map(ph => {
                return <li key={ph.id} className={`column is-one-quarter`}><img src={ph.url} className={css(cl.imgTweak)} /></li>
              })}
              <li className="DashboardContainer">
                {/* <Upload /> */}
              </li>
            </ul>
          </article>
        </div>
      )
    }
  }
}

export default graphql(OrderQuery, {
  options: (props) => ({variables: { input: {
    id: props.orderId,
    authorizedId: jwtDecode(localStorage.getItem('hf_auth_header_token')).id } }
  }),
  props: ({ ownProps,  data: { getOrder, loading, error } }) => ({
    order: {
      error,
      loading,
      result: getOrder
    }
  })
})(CollaborationArea)
