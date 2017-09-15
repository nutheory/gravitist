import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import MissionCard from './mission_card'
import MissionQuery from '../../queries/missions'

class MissionList extends Component {
  constructor(){
    super()

    this.state = {
      fiter: "open"
    }
  }

  render(){
    const {loading, missions} = this.props.missionList
    const missionGroups = _.chunk(missions, 3)
    if (loading === true) {return <div></div>}
    return (
      <div>
        { missionGroups.map((missionGroup, i) => (
          <div className="columns" key={`missionGroup_${i}`}>
            {missionGroup.map((mission, i) => (
              <MissionCard key={`mission_${i}`} mission={mission} />
            )) }
          </div>
        )) }
      </div>

    )
  }
}

export default graphql(MissionQuery, { name: 'missionList' })(MissionList)
