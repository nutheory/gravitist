import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { css } from 'aphrodite'
import styles from './styles/collaboration'
import 'bulma'
import moment from 'moment'
import { graphql } from 'react-apollo'
import OrderQuery from '../../queries/agent_order'
import Upload from './uploads'


class CollaborationArea extends Component{
  constructor(){
    super()

  }

  // componentDidMount(){
  //   console.log('match', this.props)
  // }

  render(){
    const { loading, agentOrder } = this.props.data
    if (loading === true) {return <div></div>}
    return (
      <div>
        <article>
          <h1 className="title">Order placed on {moment(agentOrder.createdAt).format('MMMM Do YYYY, h:mma')}</h1>
          <p className={`${css(styles.headerTags)}`}>
            <span className={`tag is-primary ${css(styles.tagRight)}`}>Plan</span>
            <span className={`tag is-light ${css(styles.tagRight)}`}>{agentOrder.plan}</span>
            <span className={`tag is-primary ${css(styles.tagRight)}`}>Receipt</span>
            <span className={`tag is-light ${css(styles.tagRight)}`}>{agentOrder.receiptId}</span>
          </p>
          <p className={`${css(styles.headerTags)}`}>
            <span className={`tag is-primary ${css(styles.tagRight)}`}>Address</span>
            <span className={`tag is-light ${css(styles.tagRight)}`}>{agentOrder.address.address1}</span>
            <span className={`tag is-light ${css(styles.tagRight)}`}>{agentOrder.address.city}</span>
            <span className={`tag is-light ${css(styles.tagRight)}`}>{agentOrder.address.zip}</span>
          </p>
          <p className={`${css(styles.headerTags)}`}>
            <span className={`tag is-warning ${css(styles.tagRight)}`}>Status</span>
            <span className={`tag is-light ${css(styles.tagRight)}`}>{agentOrder.status}</span>
          </p>
          <h2 className="subtitle">Videos</h2>
          <ul>
            {/* map videos */}
            <li>

            </li>
          </ul>
          <h2 className="subtitle">Photos</h2>
          <ul>
            {/* map photos */}
            <li>
              <Upload />
            </li>
          </ul>
        </article>
      </div>
    )
  }
}

export default graphql(OrderQuery, {
  options: (props) => { return { variables: { id: props.match.params.orderId } } }
})(CollaborationArea)
