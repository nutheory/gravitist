// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite'
import { find, propEq } from 'ramda'
import jwtDecode from 'jwt-decode'
import msn from '../styles/missions'
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
    console.log('mission', mission)
    const plan = find(propEq('name', mission.plan))(Plans)
    console.log('PLAN', plan)
    const distance = Math.round(parseFloat(mission.distanceFromLocation) * 10 ) / 10
    const address = this.props.mission.address
    const bounty = plan ? plan.bounty : 0
    console.log('bounty', mission.pilotBounty)
    return (
      <div className={`column`}>
        <div className={`${accepted ? css(msn.missionAccepted) : css(msn.mission)} columns`}>
          <div className={`column`}>
            <div className={`columns`}>
              <div className={`${css(msn.infoWrapper)} column is-narrow`}>
                <div className={`${css(msn.info)}`}>
                  <div className={`${css(msn.infoItem)}`}>
                    <div className={`${css(msn.headerValue, msn.bigText)}`}>
                      ${ mission.pilotBounty ? mission.pilotBounty : (Math.round(parseInt(bounty) + distance)).toString()}
                    </div>
                    <div className={`${css(msn.headerTitle)}`}>min. estimated<br />bounty</div>
                  </div>
                  <div className={`${css(msn.infoItem)}`}>
                    <div className={`${css(msn.headerValue, msn.bigText)}`}>
                      { mission.pilotDistance ? mission.pilotDistance : distance.toString()}
                    </div>
                    <div className={`${css(msn.headerTitle)}`}>miles est.<br />distance</div>
                  </div>
                </div>
              </div>
              <div className={`${css(msn.address)} column`}>
                  <div className={`${css(msn.addressOneTwo)}`}>
                    {mission.address.address1}{mission.address.address2 ? `, ${mission.address.address2}` : null }
                  </div>
                  <div className={`${css(msn.cityStateZip)}`}>
                    {mission.address.city}{mission.address.state ? `, ${mission.address.state}`: null } {mission.address.zipCode}
                  </div>
              </div>
              <div className={`${css(msn.actionInfo)} column is-narrow`}>
                <Link to={`/missions/${mission.id}${mission.agentId ? '/' + mission.agentId : ''}`}
                  className={`${css(cE.ctaButton)} ${readyToFly ? accepted ? css(cE.ctaPurple) : css(cE.ctaGreen) : css(cE.ctaDisabled)}`}>
                  <span className={css(cE.ctaButtonOverlay)}></span>{ readyToFly ? accepted ? 'View' :'Film location' : 'Disabled' }
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MissionCard
