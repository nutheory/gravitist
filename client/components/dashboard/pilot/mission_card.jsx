// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { find, propEq } from 'ramda'
import { css } from 'aphrodite'
import PilotBounty from './bounty'
import Plans from '../../../utils/pricing_plans.json'

type Props = {
  mission: Object,
  user: Object,
  cssSizing?: string
}

type State = {

}

class MissionCard extends Component<Props, State> {

  handleAcceptClick: Function

  constructor(){
    super()

    this.handleAcceptClick = this.handleAcceptClick.bind(this)
  }

  handleAcceptClick(e: SyntheticInputEvent<HTMLInputElement>){

  }

  render(){
    const cssSizing = this.props.cssSizing || "w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    const mission = this.props.mission
    const readyToFly = this.props.user.isVerified && this.props.user.accountId
    const plan = find(propEq('name', mission.plan))(Plans)
    const distance = mission.pilotDistance || Math.round(parseFloat(mission.distanceFromLocation) * 10 ) / 10
    const bounty = mission.pilotBounty ? mission.pilotBounty :
      (Math.round(parseInt(plan ? plan.bounty : 0 ))).toString()
    return (
      <div className={`${ cssSizing } px-4 pb-6`}>
        <div className="bg-white rounded shadow px-4 py-4">
          <PilotBounty bounty={ bounty } distance={ distance } />
          <div className="py-8">
            <div className="text-center font-medium">{ mission.address.address1 }</div>
            <div className="text-center text-sm">{`${mission.address.city}, ${mission.address.state} ${mission.address.zipCode}`}</div>
          </div>

          <div className="flex-1 text-xs text-right">
            <Link
              className="inline-block text-blue-darker border border-blue-darker py-1 px-6 rounded-full"
              to={`/missions/${mission.id}${mission.agentId ? '/' + mission.agentId : ''}`}>View</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default MissionCard
