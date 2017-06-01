import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from '../../../styles/commonLayout'
import Hero from './hero'
import HowItWorks from './howItWorks'
import Banner from './banner'
import Photos from './photos'
import YoureInCharge from './youreInCharge'
import Stories from './stories'

class Pilots extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div className={css(styles.centerMainContent)}>
        <Hero />
        <HowItWorks />
        <Banner />
        <Photos />
        <YoureInCharge />
        <Stories />
      </div>
    )
  }
}

export default Pilots
