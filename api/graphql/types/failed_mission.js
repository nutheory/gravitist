const FailedMission = `

  type FailedMission {
    pilot: User
    order: Order
    rejectedByUser: User
    typeOfFailure: String
    reason: String
    createdAt: String
  }

  input GetFailedMissionsInput {
    pilotId: ID
  }

  type FailedMissionPayload {
    failedMissions: [FailedMission]
  }

`

module.exports = FailedMission
