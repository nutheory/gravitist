// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite'
import { find, propEq } from 'ramda'
import jwtDecode from 'jwt-decode'
// import msn from '../styles/missions'
import lst from '../styles/lists'
import crd from '../styles/cards'
import cE from '../../../styles/common_elements'
import Plans from '../../../utils/pricing_plans.json'

type Props = {
  mission: Object,
  user: Object,
  accepted: boolean
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
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    const readyToFly = user.isVerified && user.termsAccepted && user.accountId
    const mission = this.props.mission
    const accepted = this.props.accepted
    const plan = find(propEq('name', mission.plan))(Plans)
    const distance = Math.round(parseFloat(mission.distanceFromLocation) * 10 ) / 10
    const address = this.props.mission.address
    // console.log('pb', plan.bounty)
    console.log('dist', mission.distanceFromLocation)
    const bounty = mission.pilotBounty ? mission.pilotBounty :
      (Math.round(parseInt(plan ? plan.bounty : 0 ) + distance)).toString()
    return (
      <div className={css(lst.column)}>
        <Link to={`/missions/${mission.id}${mission.agentId ? '/' + mission.agentId : ''}`}>
          <div className={`card ${css(crd.card)}`}>
            <div className={`${css(crd.cardContent)}`}>
              <div className={`columns`}>
                <div className={`${css(crd.addressIcon)} column is-narrow`}><i className="fa fa-home fa-3x" /></div>
                <div className={`${css(crd.addressText)} column ${css(crd.removeLeftPadding)}`}>
                  <div className={`title is-5 ${css(crd.address)}`}>{ mission.address.address1 }</div>
                  <div className={`${css(crd.smallUppercase)}`}>{`${mission.address.city}, ${mission.address.state} ${mission.address.zipCode}`}</div>
                </div>
              </div>
              <div className={`${css(crd.row)}`}>
                <div className={`${css(crd.blueArea)} column`}>
                  <div className={`${css(crd.highlightValue)}`}>
                    ${ mission.pilotBounty ? mission.pilotBounty : (Math.round(parseInt(bounty) + distance)).toString()}
                  </div>
                  <div className={`${css(crd.highlightText)}`}>min. est.<br />bounty</div>
                </div>
                <div className={`${css(crd.blueArea)} column`}>
                  <div className={`${css(crd.highlightValue)}`}>
                    { mission.pilotDistance ? mission.pilotDistance : distance.toString() }
                  </div>
                  <div className={`${css(crd.highlightText)}`}>miles est.<br />distance</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default MissionCard
