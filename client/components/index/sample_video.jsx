import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import sv from './styles/sample_video'

class SampleVideo extends Component{
  constructor(){
    super()
  }

  render(){
    return (
      <div className={css(sv.container)}>
        <NavLink to="/sample-video" className={css(sv.staticImage)} style={{ background: `url(${require('../../assets/images/sample@2x.jpg')}) no-repeat` }} />
      </div>
    )
  }
}

export default SampleVideo
