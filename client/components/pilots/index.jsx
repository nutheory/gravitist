import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from '../../styles/common_layout'
import Hero from './hero'
import HowItWorks from './how_it_works'
import Banner from './banner'
import Photos from './photos'
import YoureInCharge from './youre_in_charge'
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
