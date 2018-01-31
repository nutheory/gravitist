// @flow
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PilotDashboard from './pilot/index'
import AgentDashboard from './agent/index'
import AdminDashboard from './admin/index'



const Dashboard = ( props: Object ) => {
  console.log("PROPS", props)
  return (
    <div>
      { props.user.type === 'pilot' ? <PilotDashboard {...props} /> : null }
      { props.user.type === 'agent' ? <AgentDashboard {...props} /> : null }
      { props.user.type === 'admin' ? <AdminDashboard {...props} /> : null }
    </div>
  )
}

export default Dashboard
