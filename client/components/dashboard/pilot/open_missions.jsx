// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import { where, equals, not } from 'ramda'
import jwtDecode from 'jwt-decode'
import MissionCard from './mission_card'
import OrderList from '../order_list'
import MissionQuery from '../../../queries/missions'

type Props = {
  data: Object,
  cssSizing?: string
}

type State = {}

class MissionList extends Component<Props, State> {
  constructor(){
    super()

    this.state = {

    }
  }

  render(){
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const { loading, getMissions } = this.props.data
    if (loading) { return <div></div> }
    const open = getMissions
    return (
      <div className="flex flex-wrap mb-6 md:-mx-4">
        { open.map((mission, i) => (
          <MissionCard key={`mission_${i}`} mission={mission} user={user} cssSizing={ this.props.cssSizing } />
        ))}
      </div>
      // cssSizing={ this.props.cssSizing }
      // <div className="columns">
      //   <div className="column">
      //   { this.props.view === "history" ?
      //     <div className={css(lst.listContainer)}>
      //       <div className="title">History </div>
      //       <div className={css(lst.deck)}>
      //         { pastOrders.length > 0 ? pastOrders.map((mission, i) => (
      //           <MissionCard key={`mission_${i}`} mission={mission} user={user} accepted={false} />
      //         )) : <div className="title is-5">You have no history. Get out and fly Whiskey Delta.</div> }
      //       </div>
      //     </div>
      //   : null }
      //   { this.props.view === "dashboard" ?
      //     <div>
      //       <div className={css(lst.listContainer)}>
      //         { currentOrders.length > 0 ? <div className="title">Current missions</div> : null }
      //         <div className={css(lst.deck)}>
      //           { currentOrders.length > 0 ? currentOrders.map((mission, i) => (
      //             <MissionCard key={`mission_${i}`} mission={mission} user={user} accepted={true} />
      //           )) : null }
      //         </div>
      //       </div>
      //
      //       <div className={css(lst.listContainer)}>
      //         <div className="title">Open missions </div>
      //         <div className={css(lst.deck)}>
      //           { open.length > 0 ? open.map((mission, i) => (
      //             <MissionCard key={`mission_${i}`} mission={mission} user={user} accepted={false} />
      //           )) : <div className="title is-5">There are no open missions in your area.</div> }
      //         </div>
      //       </div>
      //     </div>
      //   : null }
      //   </div>
      // </div>
    )
  }
}

export default graphql(MissionQuery, {
  options: (props) => ({ variables: { input: {
    sortKey: 'distanceFromLocation',
    sortValue: 'ASC',
    sizeLimit: 20 } } })
})(MissionList)
