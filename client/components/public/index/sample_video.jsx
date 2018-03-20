// @flow
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'

class SampleVideo extends Component<void, void>{
  constructor(){
    super()
  }

  render(){
    return (
      <div className="">
        <NavLink to="/sample-video" className="" style={{ background: `url(${require('../../../assets/images/sample@2x.jpg')}) no-repeat` }} />
      </div>
    )
  }
}

export default SampleVideo
