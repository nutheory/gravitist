import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import sv from './styles/sampleVideo'
import sampleVideo from '../../assets/sampleVideo.m4v'
import sampleImage from '../../assets/images/sample@2x.jpg'

class SampleVideo extends Component{
  constructor(){
    super()
  }

  render(){
    return (
      <div className={css(sv.container)}>
        <NavLink to="/sample-video" className={css(sv.staticImage)} style={{ background: `url(/${sampleImage}) no-repeat` }} />
      </div>
    )
  }
}

export default SampleVideo
