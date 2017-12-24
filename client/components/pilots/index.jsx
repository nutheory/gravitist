// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import cL from '../../styles/common_layout'
import Hero from './hero'
import HowItWorks from './how_it_works'
import Banner from './banner'
import Photos from './photos'
import YoureInCharge from './youre_in_charge'

const Pilots = () => {
  return(
    <div className={css(cL.centerMainContent)}>
      <div>
        <Hero />
        <HowItWorks />
        <Photos />
        <YoureInCharge />
      </div>
    </div>
  )
}

export default Pilots
